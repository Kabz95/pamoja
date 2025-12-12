'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, NotebookPen } from "lucide-react";

const steps = [
    "Think of one moment this week where you showed up for yourself, even a tiny bit.",
    "What did you do, say, or choose in that moment?",
    "Why could this count as self-respect, self-care, or bravery?",
    "As you remember that, what do you notice in your body right now—tension, warmth, breath?",
];

export default function WeeklySelfTrustCheckIn() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(steps.length).fill(''));
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (answers[currentStep].trim() === '') {
        toast({ title: "Please share a few words before continuing.", variant: 'destructive' });
        return;
    }
    if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
    } else {
        setIsCompleted(true);
        toast({ title: "Check-in complete. You gathered evidence of your strength this week." });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };
  
  const handleReset = () => {
      setCurrentStep(0);
      setAnswers(Array(steps.length).fill(''));
      setIsCompleted(false);
  }

  return (
    <div className="space-y-6">
        <Card className="bg-card/50">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <NotebookPen size={28} />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-xl">Weekly Self-Trust Check-In</CardTitle>
                        <CardDescription>A weekly reflection space to notice the small, quiet ways you kept going, respected your limits, or tried something different. It’s about evidence, not perfection.</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        
        {!isCompleted ? (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Step {currentStep + 1} of {steps.length}</CardTitle>
                    <CardDescription>{steps[currentStep]}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        value={answers[currentStep]}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        placeholder="Your gentle reflection..."
                        rows={4}
                    />
                    <div className="flex justify-between mt-4">
                        <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
                        <Button onClick={handleNext}>
                            {currentStep === steps.length - 1 ? 'Finish Check-In' : 'Next'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ) : (
            <Card className="text-center p-6">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <CardTitle className="font-headline text-xl">You did it.</CardTitle>
                    <CardDescription>You took a moment to gather evidence of your self-trust. That’s a powerful act.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground p-4 bg-primary/10 rounded-lg">
                        "This week I showed self-trust by <strong className="text-foreground">{answers[1]}</strong>, even though it was hard. This mattered because it was an act of <strong className="text-foreground">{answers[2]}</strong>."
                    </p>
                    <Button onClick={handleReset}>Start a New Check-In</Button>
                     <p className="text-xs text-muted-foreground mt-4">At the end of the month, you can choose to generate a gentle summary of your self-trust moments to share with a therapist or support person.</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
