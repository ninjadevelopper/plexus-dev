
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables
// Always use the named parameter and process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDiscussionSummary = async (content: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following discussion thread in 3 concise bullet points: \n\n ${content}`,
      config: {
        // When maxOutputTokens is set, a thinkingBudget must also be provided for Gemini 3 models to ensure response capacity.
        maxOutputTokens: 200,
        thinkingConfig: { thinkingBudget: 100 },
        temperature: 0.7,
      }
    });
    // Access response.text property directly (not a method).
    return response.text || "No summary available.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Could not generate summary at this time.";
  }
};

export const getSmartRecommendations = async (interests: string[]): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these user interests: ${interests.join(', ')}, suggest 3 creative project topics or discussion themes they might enjoy.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    // Use .trim() on response.text for safer JSON parsing.
    const text = response.text?.trim() || '[]';
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return ["Tech Innovation", "Community Building", "Digital Art"];
  }
};
