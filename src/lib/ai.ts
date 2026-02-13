import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN!);

export async function summarizeNoteWithAI(content: string) {
  try {
    const output = await client.textGeneration({
      model: "FreedomIntelligence/AceGPT-v2-8B-Chat",
      inputs: `
      Summarize the following text into 3-5 clear bullet points:
      ${content}`,
      parameters: {
        temperature: 0.3,
        max_new_tokens: 200,
      },
    });


    return output.generated_text;
  } catch (error) {
    console.error("HF AI Error:", error);
    throw new Error("Failed to summarize note");
  }
}
