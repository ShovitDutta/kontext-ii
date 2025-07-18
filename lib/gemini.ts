import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export async function generateBlogContent(
  newsTitle: string,
  newsDescription: string,
  type: "SHORT" | "MEDIUM" | "EXPLAINED"
) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompts = {
    SHORT: `Write a concise 2-3 paragraph blog post about this tech news. Keep it under 200 words and focus on the key points: Title: ${newsTitle} Description: ${newsDescription}`,
    MEDIUM: `Write a comprehensive 4-5 paragraph blog post about this tech news. Include context, implications, and analysis. Keep it around 400-500 words: Title: ${newsTitle} Description: ${newsDescription}`,
    EXPLAINED: `Write a detailed, educational blog post explaining this tech news in simple terms. Include background, technical details explained simply, and future implications. Around 600-800 words: Title: ${newsTitle} Description: ${newsDescription}`,
  };
  try {
    const result = await model.generateContent(prompts[type]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate blog content");
  }
}
