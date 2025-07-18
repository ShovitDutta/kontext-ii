import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph } from "@langchain/langgraph";
import { promises as fs } from "fs";
import { config } from "dotenv";
import fetch from "node-fetch";
import NewsAPI from "newsapi";
config({ path: ".env" });
const geminiApiKey_A = process.env.geminiApiKey_A;
const geminiApiKey_B = process.env.geminiApiKey_B;
const geminiApiKey_C = process.env.geminiApiKey_C;
const newsapi = new NewsAPI(process.env.newsApiKey);
const CATEGORIES = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
const FILENAME = "kontext.json";
const CONTENT_CACHE_MINUTES = 5;
function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
}
function getTodaysDateString() {
    return new Date().toISOString().split("T")[0];
}
function getInitialDataStructure() {
    const data = { fetch_log: [], articles: {} };
    CATEGORIES.forEach((cat) => {
        data.articles[cat] = [];
    });
    return data;
}
async function loadData() {
    try {
        await fs.access(FILENAME);
        const fileContent = await fs.readFile(FILENAME, "utf-8");
        const data = JSON.parse(fileContent);
        if (!data.fetch_log) data.fetch_log = [];
        if (!data.articles) data.articles = {};
        CATEGORIES.forEach((cat) => {
            if (!Array.isArray(data.articles[cat])) data.articles[cat] = [];
        });
        return data;
    } catch (error) {
        if (error.code === "ENOENT") return getInitialDataStructure();
        console.error("Error reading file, starting fresh to avoid corruption:", error);
        return getInitialDataStructure();
    }
}
async function saveData(data) {
    try {
        await fs.writeFile(FILENAME, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing to file:", error);
    }
}
async function fetchAndSaveBlogPosts() {
    console.log("Checking for blog updates...");
    const data = await loadData();
    const fetchKey = `${getTodaysDateString()}-${getTimeOfDay()}`;
    if (data.fetch_log.includes(fetchKey)) {
        console.log("Blog posts are up to date.");
        return;
    }
    console.log(`Fetching blog posts for ${fetchKey}...`);
    for (const category of CATEGORIES) {
        try {
            const response = await newsapi.v2.topHeadlines({ category: category, country: "us", pageSize: 25, language: "en" });
            if (response.status === "ok") {
                const existingUrls = new Set(data.articles[category].map((a) => a.url));
                const newArticles = response.articles.filter((article) => !existingUrls.has(article.url));
                if (newArticles.length > 0) {
                    console.log(`Found ${newArticles.length} new articles for ${category}.`);
                    newArticles.forEach((a) => (a.content = { short: [], medium: [], long: [] }));
                    data.articles[category].push(...newArticles);
                }
            }
        } catch (error) {
            console.error(`Error fetching for ${category}:`, error);
        }
    }
    data.fetch_log.push(fetchKey);
    await saveData(data);
    console.log("Blog post update check complete.");
}
async function getHTML(url) {
    try {
        const res = await fetch(url);
        return await res.text();
    } catch {
        return null;
    }
}
function promptBuilder(category, length) {
    const emojiContext = category + ", investigation, warning, etc.";
    if (length === "short") {
        return (
            "- You are a professional " +
            category +
            " blog writer creating sharp, fast updates.\n" +
            "- **Strictly using only the text provided below**, rewrite it as a **punchy, single-paragraph blog brief** readable in **under 45 seconds**.\n" +
            "- Do not add any information not present in the original text.\n" +
            "- Tone: **Professional yet conversational**.\n" +
            "- Focus only on the **core fact, mystery, or investigative lead**.\n" +
            "- Begin with a bold, emoji-style headline. **Choose an emoji that fits the story context** (" +
            emojiContext +
            ").\n\n" +
            "- **FORMAT:**\n" +
            "**[Emoji] [Headline summarizing the core blog post]**\n" +
            "[One concise paragraph — clear, factual, direct.]\n\n" +
            "- **ARTICLE::**\n"
        );
    }
    if (length === "medium") {
        return (
            "- You are a professional " +
            category +
            " blog writer producing clear, scannable posts.\n" +
            "- **Strictly using only the text provided below**, rewrite it as a **~250-word concise blog post**.\n" +
            "- Do not add any information not present in the original text.\n" +
            "- Tone: **Professional, informative, neutral**.\n" +
            "- Structure the post with **three clear H2 subheadings (##)**.\n" +
            "- For each subheading, **choose an emoji appropriate to the topic** (" +
            emojiContext +
            ").\n\n" +
            "- Include a **bullet-point list of key takeaways**.\n\n" +
            "- **FORMAT:**\n" +
            "## [Emoji] [Core Blog Summary]\n" +
            "Opening paragraph.\n\n" +
            "## [Emoji] [Investigative Detail]\n" +
            "1-2 short paragraphs.\n\n" +
            "## [Emoji] [Context]\n" +
            "1-2 paragraphs.\n\n" +
            "**Key Takeaways:**\n" +
            "- Bullet point\n" +
            "- Bullet point\n\n" +
            "- **ARTICLE::**\n"
        );
    }
    if (length === "long") {
        return (
            "- You are a professional " +
            category +
            " feature writer crafting detailed, investigative posts.\n" +
            "- **Strictly using only the text provided below**, rewrite it as a **~600-word deep-dive blog post**.\n" +
            "- Do not add any information not present in the original text.\n" +
            "- Tone: **Professional, clear, authoritative**.\n\n" +
            "- Structure:\n" +
            "- Open with a strong lede.\n" +
            "- Use **three descriptive H2 subheadings (##)**.\n" +
            "- For each subheading, **choose an emoji that matches the topic (" +
            emojiContext +
            ").**\n" +
            "- Include **one expert pull-quote**.\n" +
            "- End with a **'Bottom Line'** summarizing relevance.\n\n" +
            "- **FORMAT:**\n" +
            "## [Emoji] [Headline]\n" +
            "Introductory paragraph.\n\n" +
            "## [Emoji] [Core Issue]\n" +
            "2-3 paragraphs.\n\n" +
            "## [Emoji] [Background]\n" +
            "2-3 paragraphs.\n\n" +
            "> [Expert pull-quote.]\n\n" +
            "## Bottom Line\n" +
            "One short paragraph on why this matters.\n\n" +
            "- **ARTICLE::**\n"
        );
    }
}
async function processContent(article, category, length, input) {
    const contentMap = { short: "Blog Brief", medium: "Blog Post", long: "Deep Dive" };
    const contentName = contentMap[length];
    const contentHistory = article.content[length];
    const latestContent = contentHistory.length > 0 ? contentHistory[contentHistory.length - 1] : null;
    const cacheExpiry = new Date(new Date() - CONTENT_CACHE_MINUTES * 60 * 1000);
    if (latestContent && new Date(latestContent.timestamp) > cacheExpiry) {
        console.log(`\n✅ Displaying cached ${contentName} (${length}):`);
        console.log(latestContent.content);
        return latestContent.content;
    }
    console.log(`\n🔄 Generating new ${contentName} (${length})...`);
    const modelMap = { short: geminiApiKey_C, medium: geminiApiKey_B, long: geminiApiKey_A };
    const llm = new ChatGoogleGenerativeAI({ apiKey: modelMap[length], model: "gemini-2.5-flash-preview-05-20" });
    const graphState = { article: { value: null }, category: { value: null }, length: { value: null }, content: { value: null } };
    const graph = new StateGraph({ channels: graphState });
    graph.addNode("promptBuilder", async (state) => ({ ...state, content: promptBuilder(state.category, state.length) + state.article }));
    graph.addNode("llm", async (state) => ({ ...state, content: await llm.stream(state.content) }));
    graph.setEntryPoint("promptBuilder");
    graph.addEdge("promptBuilder", "llm");
    const compiledGraph = graph.compile();
    let fullContent = "";
    try {
        const stream = await compiledGraph.stream({ ...input, category, length });
        for await (const chunk of stream) {
            if (chunk.llm && chunk.llm.content) {
                for await (const contentChunk of chunk.llm.content) {
                    const newContent = contentChunk.content;
                    fullContent += newContent;
                    process.stdout.write(newContent);
                }
            }
        }
        console.log();
        contentHistory.push({ content: fullContent, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error(`Failed to get ${contentName} from Gemini:`, error.message);
    }
    return fullContent;
}
async function handleArticleSelection(sessionData, category, articleIndex) {
    const articles = sessionData.articles[category];
    if (!articles || articleIndex < 0 || articleIndex >= articles.length) {
        console.log("Invalid article selection or no articles in this category.");
        return;
    }
    const article = articles[articleIndex];
    console.log(`\nProcessing Article: ${article.title}`);
    if (!article.content) article.content = { short: [], medium: [], long: [] };
    ["long", "medium", "short"].forEach((len) => {
        if (!Array.isArray(article.content[len])) article.content[len] = [];
    });
    console.log("\nGenerating content...");
    const html = await getHTML(article.url);
    if (!html) {
        console.log("Failed to retrieve article content.");
        return;
    }
    const longContent = await processContent(article, category, "long", { article: html });
    const mediumContent = await processContent(article, category, "medium", { article: longContent });
    await processContent(article, category, "short", { article: mediumContent });
    await saveData(sessionData);
    console.log("\nAll content generated and saved.");
}
async function testCore() {
    console.log("--- Starting Test Core ---");
    await fetchAndSaveBlogPosts();
    const sessionData = await loadData();
    const categoryIndex = 0;
    const articleIndex = 0;
    const category = CATEGORIES[categoryIndex];
    console.log(`\nSelected Category: ${category}`);
    console.log(`Selected Article Index: ${articleIndex}`);
    await handleArticleSelection(sessionData, category, articleIndex);
    console.log("\n--- Test Core Complete ---");
}
(async () => {
    await testCore();
})();
