
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  NotebookPen,
  LineChart,
  Shield,
  HeartHandshake,
  Music,
  ClipboardCheck,
  MessageSquareHeart,
  FlaskConical,
  BrainCircuit,
} from "lucide-react";

type ToolId =
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

type Tool = {
  id: ToolId;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isPremium: boolean;
};

const tools: Tool[] = [
  // ─── Free tools (core support) ───────────────────────────
  {
    id: "grounding-prompt",
    title: "Daily Grounding Prompt",
    description:
      "One gentle, optional check-in per day to help you pause and notice what you’re feeling.",
    icon: NotebookPen,
    isPremium: false,
  },
  {
    id: "emotion-diary",
    title: "Emotion Diary & Mood Dial",
    description:
      "Log what you’re feeling in your own words and use a 1–10 dial to track intensity.",
    icon: LineChart,
    isPremium: false,
  },
  {
    id: "crisis-toolkit",
    title: "Crisis Toolkit",
    description:
      "Fast access to grounding exercises, breathing audio, and your personalized crisis plan.",
    icon: Shield,
    isPremium: false,
  },
  {
    id: "safety-plan",
    title: "Safety Plan Studio",
    description:
      "Capture warning signs, coping strategies, and support contacts in one organized place.",
    icon: HeartHandshake,
    isPremium: false,
  },
  {
    id: "psychoeducation-minis",
    title: "Psychoeducation Minis",
    description: "Tiny lessons for a sensitive nervous system.",
    icon: BrainCircuit,
    isPremium: false,
  },
  // ─── Premium tools (pamoja+) ─────────────────────────────
  {
    id: "soft-voice-audio-library",
    title: "Soft-Voice Audio Library",
    description:
      "A growing library of soft-voice tracks for grounding, compassion, and breathing support.",
    icon: Music,
    isPremium: true,
  },
  {
    id: "weekly-self-trust-check-in",
    title: "Weekly Self-Trust Check-In",
    description:
      "Guided reflection to notice and celebrate small acts of self-respect and care.",
    icon: ClipboardCheck,
    isPremium: true,
  },
  {
    id: "relationship-repair-studio",
    title: "Relationship Repair Studio",
    description:
      "Draft scripts for hard conversations, set boundaries, and prepare to repair after conflict.",
    icon: MessageSquareHeart,
    isPremium: true,
  },
  {
    id: "emotion-diary-analytics",
    title: "Emotion Diary Analytics",
    description:
      "Gentle trends and patterns from your diary so you and your therapist can see shifts over time.",
    icon: FlaskConical,
    isPremium: true,
  },
  {
    id: "coping-plan-generator",
    title: "Coping Plan Generator (Early Access)",
    description:
      "Experiment with AI-supported coping plans you can share with your care team.",
    icon: FlaskConical,
    isPremium: true,
  },
];

export default function ToolsPage() {
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  
  const { data: userProfile } = useDoc(userProfileRef);

  // Adjust this line to match however you're storing premium status
  const isPremiumMember = !!userProfile?.isPremium;

  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleToolClick = (tool: Tool) => {
    if (tool.isPremium && !isPremiumMember) {
      setSelectedTool(tool);
      setUpgradeOpen(true);
      return;
    }

    // Free tools or premium member: go straight to the tool page
    router.push(`/tools/${tool.id}`);
  };

  const handleGoToProfile = () => {
    setUpgradeOpen(false);
    router.push("/profile"); // or wherever your "Get pamoja+" button lives
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-black via-purple-950 to-black">
      <main className="max-w-3xl mx-auto px-4 pt-10 pb-16">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-purple-50">
            Your Toolkit
          </h1>
          <p className="mt-2 text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto">
            Core tools are always free. Some deeper, resource-intensive tools
            are part of the pamoja+ bundle.
          </p>
          {isPremiumMember && (
            <p className="mt-2 text-xs sm:text-sm text-emerald-300/90">
              You&apos;re a pamoja+ member. All tools are unlocked for you.
            </p>
          )}
        </header>

        {/* Tool list */}
        <section className="space-y-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const showPremiumBadge = tool.isPremium;
            const badgeLabel = isPremiumMember
              ? tool.isPremium
                ? "Unlocked"
                : "Included"
              : tool.isPremium
              ? "pamoja+"
              : "Free";

            return (
              <Card
                key={tool.id}
                className="bg-purple-950/70 border border-purple-600/40 hover:border-purple-300/70 transition-colors cursor-pointer"
                onClick={() => handleToolClick(tool)}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-purple-900 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-purple-200" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-lg text-purple-50">
                        {tool.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          showPremiumBadge
                            ? isPremiumMember
                              ? "border-emerald-400/80 text-emerald-300 text-[11px]"
                              : "border-purple-300/80 text-purple-100 text-[11px]"
                            : "border-purple-500/70 text-purple-100 text-[11px]"
                        }
                      >
                        {badgeLabel}
                      </Badge>
                    </div>
                    <CardDescription className="text-purple-200/80 mt-1">
                      {tool.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </section>

        {/* Footer text */}
        <section className="mt-10 text-center text-sm text-purple-200/80">
          <p>You don&apos;t have to earn these tools. They&apos;re here for you, as you are.</p>
        </section>

        {/* Upgrade card for non-premium users */}
        {!isPremiumMember && (
          <section className="mt-6">
            <Card className="bg-purple-950/80 border border-purple-500/80">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-purple-50 text-lg">
                  Want deeper support?
                </CardTitle>
                <CardDescription className="text-purple-200/85">
                  pamoja+ unlocks the audio library, self-trust check-ins,
                  relationship repair studio, analytics, and the coping plan
                  generator.
                </CardDescription>
              </CardHeader>
            </Card>
          </section>
        )}

        {/* Upgrade dialog when clicking a premium tool as non-member */}
        <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
          <DialogContent className="bg-purple-950 border border-purple-600 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-purple-50">
                {selectedTool?.title}
              </DialogTitle>
              <DialogDescription className="text-purple-200/85">
                This tool is part of the{" "}
                <span className="font-semibold text-purple-100">
                  pamoja+
                </span>{" "}
                bundle. Core tools like the Crisis Toolkit and Emotion Diary are
                always free. pamoja+ adds deeper support for ongoing recovery
                work.
              </DialogDescription>
            </DialogHeader>
            <div className="text-sm text-purple-200/85 space-y-2">
              <p>{selectedTool?.description}</p>
              <p>
                You can upgrade from your profile page whenever you feel ready.
              </p>
            </div>
            <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
              <Button
                variant="outline"
                className="border-purple-600 text-purple-100"
                onClick={() => setUpgradeOpen(false)}
              >
                Not now
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-500 text-purple-50"
                onClick={handleGoToProfile}
              >
                Go to Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
