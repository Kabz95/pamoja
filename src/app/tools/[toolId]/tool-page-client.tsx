
"use client";

import { ToolConfig } from "./page";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import DailyGroundingPrompt from "@/components/daily-grounding-prompt";
import EmotionDiary from "@/components/emotion-diary";
import CrisisToolkit from "@/components/crisis-toolkit";
import PsychoeducationMinis from "@/components/psychoeducation-minis";
import AudioLibrary from "@/components/tools/audio-library";
import WeeklySelfTrustCheckIn from "@/components/tools/weekly-self-trust-check-in";
import RelationshipRepairStudio from "@/components/tools/relationship-repair-studio";
import EmotionDiaryAnalytics from "@/components/tools/emotion-diary-analytics";
import CopingPlanGenerator from "@/components/tools/coping-plan-generator";
import { Button } from "@/components/ui/button";

const SafetyPlanStudio = () => (
  <Card className="p-6 bg-card/50">
    <h2 className="text-2xl font-headline mb-4">Safety Plan Studio</h2>
    <p className="text-muted-foreground mb-4">The Safety Plan has been integrated into the Crisis Toolkit for faster access during intense moments. You can build and review it there.</p>
    <Button asChild>
      <Link href="/tools/crisis-toolkit">Open Crisis Toolkit</Link>
    </Button>
  </Card>
);

function renderToolComponent(id: ToolConfig["id"]) {
    switch (id) {
        case "grounding-prompt":
            return <DailyGroundingPrompt />;
        case "emotion-diary":
            return <EmotionDiary />;
        case "crisis-toolkit":
            return <CrisisToolkit />;
        case "safety-plan":
            return <SafetyPlanStudio />;
        case "soft-voice-audio-library":
            return <AudioLibrary />;
        case "weekly-self-trust-check-in":
            return <WeeklySelfTrustCheckIn />;
        case "relationship-repair-studio":
            return <RelationshipRepairStudio />;
        case "emotion-diary-analytics":
            return <EmotionDiaryAnalytics />;
        case "coping-plan-generator":
            return <CopingPlanGenerator />;
        case "psychoeducation-minis":
            return <PsychoeducationMinis />;
        default:
            return (
                <p>
                This tool is still being set up. You can go back to the main
                tools screen and use any of the available tools.
                </p>
            );
    }
}


export default function ToolPageClient({ tool }: { tool: ToolConfig }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-semibold text-foreground">
                    {tool.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                    {tool.subtitle}
                </p>
            </header>

            <Card className="bg-card/80 border-border">
                <CardHeader>
                    <CardTitle className="text-foreground text-xl">
                    What this tool is for
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                    {tool.bodyIntro}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-sm sm:text-base text-foreground/90">
                    {renderToolComponent(tool.id)}
                </CardContent>
            </Card>

            <div className="mt-6 flex justify-between gap-4 text-sm text-muted-foreground">
                <Link href="/tools" className="underline underline-offset-4 hover:text-primary">
                    ← Back to tools
                </Link>
                <span>Take what helps. Leave the rest.</span>
            </div>
        </div>
    </div>
  );
}
