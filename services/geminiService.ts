import { GoogleGenAI } from "@google/genai";

// This service now includes actual calls to the Gemini API.
// NOTE: The API key is sourced from environment variables and is assumed to be available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const geminiService = {
  summarizeText: async (text: string): Promise<string> => {
    try {
      // FIX: Use ai.models.generateContent for summarization.
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Summarize the following text in two sentences: ${text}`,
      });
      return `AI Summary: ${response.text}`;
    } catch (error) {
        console.error("Error summarizing text:", error);
        return "Error: Could not generate summary.";
    }
  },

  generateStoryboardImage: async (prompt: string): Promise<string> => {
    try {
        // FIX: Use ai.models.generateImages to generate an image.
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error("Error generating image:", error);
        // Fallback to a placeholder on error
        return `https://via.placeholder.com/400x225.png?text=Error+Generating+Image`;
    }
  },

  improveScript: async (text: string): Promise<string> => {
    try {
        // FIX: Use ai.models.generateContent to get script improvement suggestions.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `You are a script doctor. Given the following script line, suggest an improvement or an alternative. Return only the improved script line, followed by your suggestion in parentheses. For example: 'The room was messy. (AI Suggestion: Consider describing specific details like scattered papers and an overturned coffee cup to enhance the visual.)'\n\nOriginal line: "${text}"`,
            config: {
                temperature: 0.7,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error improving script:", error);
        return `${text} (Error: Could not get AI suggestion.)`;
    }
  },

  transcribeAudio: async (fileName: string): Promise<string> => {
    // This remains a mock as we don't have file upload/audio processing capabilities here.
    await sleep(4000);
    return `Transcription for ${fileName}:\n\n[00:00:01] Interviewer: So, can you walk me through the events of that day?\n[00:00:05] Subject: It started like any other, but there was an unusual tension in the air, a kind of static electricity that made the hairs on your arm stand up...`;
  },
};
