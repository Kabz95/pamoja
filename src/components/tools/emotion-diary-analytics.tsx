'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Cloud, CheckCircle, Share } from "lucide-react";
import { Button } from "../ui/button";

export default function EmotionDiaryAnalytics() {
  return (
    <div className="space-y-6">
        <Card className="bg-card/50">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <BarChart size={28} />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-xl">Emotion Diary Analytics</CardTitle>
                        <CardDescription>Soft data, not harsh judgement. This tool turns your diary and mood dial into gentle “weather reports” about your emotional climate over time.</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center gap-2"><BarChart className="text-secondary" /> Mood Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Mood chart coming soon</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Example: "This week had more mid-range days (3–6), with a few spikes."</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center gap-2"><Cloud className="text-secondary" /> Emotion Themes</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary-foreground rounded-full text-lg">overwhelmed</span>
                <span className="px-2 py-1 bg-primary/10 text-primary-foreground rounded-full text-sm">tired</span>
                <span className="px-2 py-1 bg-primary/10 text-primary-foreground rounded-full text-md">hopeful</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">Example: "You’ve been using the word ‘drained’ often; this might be a sign to look at rest and burnout."</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center gap-2"><CheckCircle className="text-secondary" /> Coping Moments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Even on hard days, you used coping strategies <strong className="text-foreground">X</strong> times.</p>
          <p className="text-xs text-muted-foreground mt-2 text-center">(This will track when you use tools like the crisis kit or audio library)</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center gap-2"><Share className="text-secondary" /> Shareable Summary</CardTitle>
          <CardDescription>A gentle summary you can share with your therapist.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="p-4 bg-input rounded-lg text-sm text-muted-foreground italic">
                "In the past two weeks, my mood ranged from 2–8, with most days around 4–6. I often felt [emotions]. I coped by [strategies], especially on these days: […]."
            </div>
            <Button variant="outline" className="w-full mt-4">Generate & Copy Summary</Button>
        </CardContent>
      </Card>
    </div>
  );
}
