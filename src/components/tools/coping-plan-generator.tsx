'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FlaskConical, Lightbulb, Sparkles, Loader2, Pin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function CopingPlanGenerator() {
  const [scenario, setScenario] = useState("");
  const [description, setDescription] = useState("");
  const [plan, setPlan] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!scenario || !description) {
        toast({ title: "Please select a scenario and describe it.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    // Simulate AI generation
    await new Promise(res => setTimeout(res, 1500));
    setPlan([
        "Notice the feeling in your body without judgment.",
        "Take three slow breaths, making the exhale longer than the inhale.",
        "State one true thing: 'I am safe in this room right now.'",
        "If possible, step away from the situation for 5 minutes.",
        "Text a safe friend: 'Thinking of you,' without needing a reply."
    ]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
        <Card className="bg-card/50">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <FlaskConical size={28} />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-xl">Coping Plan Generator (Early Access)</CardTitle>
                        <CardDescription>Collaborate with AI to sketch out practical coping plans you can refine with your therapist or support team.</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg">1. Choose a Scenario</CardTitle>
        </CardHeader>
        <CardContent>
            <Select onValueChange={setScenario} value={scenario}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a common trigger..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="conflict">Conflict with partner</SelectItem>
                    <SelectItem value="waiting">Waiting for a text</SelectItem>
                    <SelectItem value="abandoned">Feeling abandoned or ignored</SelectItem>
                    <SelectItem value="crash">Post-argument crash</SelectItem>
                </SelectContent>
            </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg">2. Describe What Usually Happens</CardTitle>
          <CardDescription>In this situation, what do you usually think, feel, and do?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., 'My heart starts pounding, I think they hate me, and I want to run away...'"
          />
        </CardContent>
      </Card>

      <div className="text-center">
          <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 animate-spin" /> Generating...</> : <><Sparkles className="mr-2" /> Generate Coping Steps</>}
          </Button>
      </div>

      {plan && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">3. Your Generated Plan</CardTitle>
            <CardDescription>These are suggestions. Keep, edit, or delete them to fit you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {plan.map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-input rounded-md">
                    <Lightbulb className="w-5 h-5 text-secondary flex-shrink-0" />
                    <p className="text-sm">{step}</p>
                </div>
            ))}
             <div className="flex justify-end pt-4">
                <Button variant="outline">
                    <Pin className="mr-2" /> Pin to Crisis Toolkit
                </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert variant="destructive">
        <FlaskConical className="h-4 w-4" />
        <AlertTitle>Early Access Disclaimer</AlertTitle>
        <AlertDescription>
          This feature is experimental and not a replacement for clinical advice. Always adapt the plan with someone who knows your history when you can.
        </AlertDescription>
      </Alert>
    </div>
  );
}
