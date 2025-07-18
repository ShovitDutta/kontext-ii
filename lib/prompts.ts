export function promptBuilder(category: string, length: 'short' | 'medium' | 'long' | 'explained') {
    const emojiContext = `${category}, investigation, warning, etc.`;

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
    if (length === "explained") {
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
    // Fallback for 'long' or any other value
    return `Generate a detailed blog post about the following article:\n\n`;
}