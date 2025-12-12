
import { notFound } from "next/navigation";
import ToolPageClient from "./tool-page-client";

export type ToolId =
  | "grounding-prompt"
  | "emotion-diary"
  | "crisis-toolkit"
  | "safety-plan"
  | "soft-voice-audio-library"
  | "weekly-self-trust-check-in"
  | "relationship-repair-studio"
  | "emotion-diary-analytics"
  | "coping-plan-generator"
  | "psychoeducation-minis";

export type ToolConfig = {
  id: ToolId;
  title: string;
  subtitle: string;
  bodyIntro: string;
};

export const tools: ToolConfig[] = [
  {
    id: "grounding-prompt",
    title: "Daily Grounding Prompt",
    subtitle:
      "One gentle, optional check-in per day to help you pause and notice what you’re feeling.",
    bodyIntro:
      "This tool offers a simple question or reflection to gently bring you back into the present moment.",
  },
  {
    id: "emotion-diary",
    title: "Emotion Diary & Mood Dial",
    subtitle:
      "Log what you’re feeling in your own words and use a 1–10 dial to track intensity over time.",
    bodyIntro:
      "This is your space to say what’s real, then name your emotions and their intensity without judgement.",
  },
  {
    id: "crisis-toolkit",
    title: "Crisis Toolkit",
    subtitle:
      "Fast access to grounding exercises, breathing audio, and your personalized crisis plan.",
    bodyIntro:
      "When everything spikes at once, this toolkit gathers your supports into one place you can reach quickly.",
  },
  {
    id: "safety-plan",
    title: "Safety Plan Studio",
    subtitle:
      "Capture warning signs, coping strategies, and support contacts in one organized plan.",
    bodyIntro:
      "This tool helps you build and update a safety plan you can use and share with people you trust.",
  },
  {
    id: "soft-voice-audio-library",
    title: "Soft-Voice Audio Library",
    subtitle:
      "Gentle tracks for grounding, compassion, and breathing support, designed for a sensitive nervous system.",
    bodyIntro:
      "This space holds a growing library of soft-spoken tracks meant to sit beside you, not push you.",
  },
  {
    id: "weekly-self-trust-check-in",
    title: "Weekly Self-Trust Check-In",
    subtitle:
      "A weekly reflection to notice small acts of self-respect and celebrate progressive wins.",
    bodyIntro:
      "Self-trust is built from tiny moments of effort and care. This tool gathers those moments in one place.",
  },
  {
    id: "relationship-repair-studio",
    title: "Relationship Repair Studio",
    subtitle:
      "Draft scripts for hard conversations, set boundaries, and prepare to repair after conflict.",
    bodyIntro:
      "This studio is a low-pressure place to explore what you wish you could say, even if you never send it.",
  },
  {
    id: "emotion-diary-analytics",
    title: "Emotion Diary Analytics",
    subtitle:
      "Gentle trends and patterns from your diary so you and your therapist can see shifts over time.",
    bodyIntro:
      "Think of this as emotional weather reports, not grades. It shows patterns in what you’ve already shared.",
  },
  {
    id: "coping-plan-generator",
    title: "Coping Plan Generator (Early Access)",
    subtitle:
      "Experiment with AI-supported coping plans you can share with your care team.",
    bodyIntro:
      "This tool helps you sketch coping plans for specific situations, then refine them with supports.",
  },
  {
    id: "psychoeducation-minis",
    title: "Psychoeducation Minis",
    subtitle: "Tiny lessons for a sensitive nervous system.",
    bodyIntro: "Learn about emotions, attachment, and self-soothing in small, manageable bites."
  }
];

export async function generateStaticParams() {
  // Needed because you’re using output: "export" – we list all tool IDs here.
  return tools.map((tool) => ({
    toolId: tool.id,
  }));
}

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const tool = tools.find((t) => t.id === params.toolId);

  if (!tool) {
    notFound();
  }

  return <ToolPageClient tool={tool!} />;
}
