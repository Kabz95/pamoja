
"use server";

import { reframeThought, ReframeThoughtInput } from "@/ai/flows/thought-reframing";

export async function getReframedThought(thought: string): Promise<{ reframedThought?: string; error?: string }> {
  if (!thought || thought.length < 10) {
    return { error: "Please enter a thought with at least 10 characters." };
  }
  
  try {
    const input: ReframeThoughtInput = { negativeThought: thought };
    const result = await reframeThought(input);
    return { reframedThought: result.reframedThought };
  } catch (error) {
    console.error(error);
    return { error: "An AI error occurred. Please try again." };
  }
}
