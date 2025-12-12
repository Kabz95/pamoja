
'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { BookOpen, Mic, PlayCircle, Loader2, Sparkles, CheckCircle, BrainCircuit } from "lucide-react";
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

// --- Data Modeling ---

type LessonId = "emotions" | "splitting" | "selfSoothe" | "triggers";

type ScenarioOption = {
  id: string;
  label: string;
  explanation: string;
  isHelpful: boolean;
};

type LessonConfig = {
  id: LessonId;
  title: string;
  summary: string;
  tryThis: string;
  reflectionPrompt: string;
  scenario: {
    description: string;
    options: ScenarioOption[];
  };
  audioUrl?: string; // Optional for now
};

const LESSONS: LessonConfig[] = [
  {
    id: "emotions",
    title: "Emotions Aren't Good or Bad",
    summary: "Emotions are just information. Anger might tell you a boundary was crossed. Sadness might tell you something was lost. The goal isn't to stop feeling, but to understand what your feelings are telling you without judgment.",
    tryThis: "Notice one emotion in your body right now. Where do you feel it? Is it in your chest, your stomach, your hands? Just notice it without needing to change it.",
    reflectionPrompt: "What's one feeling you've been told is 'wrong' or 'too much'?",
    scenario: {
      description: "Your friend cancels plans last minute. You feel a wave of intense disappointment and anger. What's a regulating response?",
      options: [
        { id: 's1-a', label: "Text them: 'You always do this, I can't rely on you!'", explanation: "This reaction is understandable, but it can push friends away. It externalizes the feeling instead of tending to your own hurt first.", isHelpful: false },
        { id: 's1-b', label: "Acknowledge the feeling: 'Wow, this hurts. I feel really let down.'", explanation: "This is a great first step. Naming the emotion without judgment calms the nervous system and makes the feeling feel less overwhelming.", isHelpful: true },
        { id: 's1-c', label: "Ignore it and pretend you don't care.", explanation: "Suppressing feelings often makes them stronger later. Allowing yourself to feel is a form of self-care.", isHelpful: false },
      ]
    }
  },
  {
    id: "splitting",
    title: "What is Splitting?",
    summary: "Splitting is a defense mechanism where the brain sorts things into all-good or all-bad categories because nuance feels too dangerous. You might see someone as a saviour one moment and a monster the next. It's a way your brain tries to protect you from uncertainty.",
    tryThis: "Think of one person or situation you have very strong feelings about. Can you find one small, neutral or 'gray' fact about them? e.g., 'They are my enemy, but they do like dogs.'",
    reflectionPrompt: "When was the last time something felt like it was either 'perfect' or a 'total disaster'?",
    scenario: {
      description: "You have a great first date. You start imagining your wedding. Then, they take too long to text back and you're convinced they hate you. What's a way to find the middle ground?",
      options: [
        { id: 's2-a', label: "Decide they are a terrible person and block them.", explanation: "This is the 'all-bad' side of splitting. It protects you from potential rejection but also cuts off a possible connection.", isHelpful: false },
        { id: 's2-b', label: "Hold two truths: 'I had a really nice time, AND I feel anxious about their silence.'", explanation: "Excellent! This is dialectical thinking. It acknowledges both the positive reality and your current uncomfortable feeling without letting either one erase the other.", isHelpful: true },
        { id: 's2-c', label: "Text them 10 times to make sure they're not ignoring you.", explanation: "This is an anxiety-driven response that can feel overwhelming to the other person. It's an attempt to soothe your fear but can sometimes create the outcome you're afraid of.", isHelpful: false },
      ]
    }
  },
  {
    id: "selfSoothe",
    title: "How to Self-Soothe",
    summary: "Self-soothing is about actively comforting yourself in a healthy way. It's not about ignoring problems, but about calming your nervous system so you can face them. It's like being your own gentle parent.",
    tryThis: "Place a hand over your heart, close your eyes, and take one slow breath. Feel the warmth of your hand. That's it. You just self-soothed.",
    reflectionPrompt: "What is one small thing that genuinely makes you feel even 1% calmer?",
    scenario: {
      description: "You're feeling overwhelmed and on the verge of a panic attack. Which self-soothing technique could you try right now?",
      options: [
        { id: 's3-a', label: "Scroll on social media to distract yourself.", explanation: "While distraction can help, social media can sometimes be overstimulating and lead to comparisons, making you feel worse. It's a gamble.", isHelpful: false },
        { id: 's3-b', label: "Find the coldest water you can and splash it on your face.", explanation: "This is a great distress tolerance skill! It activates the 'dive reflex,' which instantly slows your heart rate and calms your system. It's very effective.", isHelpful: true },
        { id: 's3-c', label: "Ruminate on all the things that are going wrong.", explanation: "This is the opposite of soothing; it's like adding fuel to the fire of anxiety. It's a common pattern, but the goal is to gently redirect your focus.", isHelpful: false },
      ]
    }
  },
  {
    id: "triggers",
    title: "Understanding Triggers",
    summary: "A trigger is anything that sets off an intense emotional reaction because it reminds you of a past trauma—even if you don't make the connection consciously. Identifying your triggers is the first step to managing them. It is never your fault that you have them.",
    tryThis: "Gently think about the last time you felt a sudden, big emotion. What was happening right before? Who were you with? What did you hear or see? No judgment, just quiet curiosity.",
    reflectionPrompt: "What's a situation or type of comment that often makes you feel defensive or small?",
    scenario: {
      description: "You're at work and your boss gives you some feedback in a neutral tone. You suddenly feel like you're in huge trouble and might be fired. What's happening?",
      options: [
        { id: 's4-a', label: "This is an emotional flashback. The feeling is real, but the danger is likely not.", explanation: "Exactly. Recognizing that the intensity of your feeling belongs to the past is a huge step. This is likely a trigger related to past experiences with authority or criticism.", isHelpful: true },
        { id: 's4-b', label: "My boss is definitely about to fire me.", explanation: "This might be what the fear feels like, but it's a conclusion based on past feelings, not present evidence. This is a cognitive distortion fueled by the trigger.", isHelpful: false },
        { id: 's4-c', label: "I am too sensitive and can't handle feedback.", explanation: "This is self-invalidation. It's not about being 'too sensitive'; it's about having a nervous system that has been taught to be on high alert for danger. That's a sign of survival, not a flaw.", isHelpful: false },
      ]
    }
  }
];

// --- Mock AI Function ---
async function getPamojaReflectionSupport(userText: string, lessonId: LessonId): Promise<string> {
  console.log("Getting AI reflection for:", { userText, lessonId });
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  
  const responses: Record<LessonId, string> = {
    emotions: "Thank you for sharing that. It takes courage to name a feeling that has been judged. Remember, your feelings are messengers, not monsters. They are all allowed to be here.",
    splitting: "That makes so much sense. The black-and-white world can feel safer than the gray one. Noticing that pattern is a huge step toward finding balance. You're doing the work.",
    selfSoothe: "It's wonderful that you know what brings you a little bit of calm. That's a powerful tool you can always carry with you. Thank you for letting that be part of your world.",
    triggers: "Thank you for being brave enough to look at that. Triggers are like echoes from the past. Just because they are loud doesn't mean the danger is still here. You are safe now."
  };

  return responses[lessonId] || "Thank you for sharing. It's brave to reflect on this.";
}


// --- Helper Components ---

const InsightToast = ({ message }: { message: string }) => (
    <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-primary" />
        <span>{message}</span>
    </div>
);

// --- Main Interactive Lesson Component ---

function InteractiveLesson({ lesson }: { lesson: LessonConfig }) {
  const [reflection, setReflection] = useState('');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioOption | null>(null);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Insight Milestones State
  const [milestones, setMilestones] = useState({
    reflected: false,
    practiced: false,
    talked: false,
  });

  const showMilestoneToast = (message: string) => {
    toast({
      description: <InsightToast message={message} />,
    });
  };

  const handleReflectionSubmit = () => {
    if (reflection.trim().length < 2) {
      toast({ title: "Share as little or as much as you can — even one word is enough.", variant: 'destructive' });
      return;
    }
    console.log(`Reflection for ${lesson.id}: ${reflection}`);
    if (!milestones.reflected) {
        showMilestoneToast("You practiced self-reflection just now. That's a healing act.");
        setMilestones(prev => ({ ...prev, reflected: true }));
    }
    toast({ title: "Thank you for sharing with yourself." });
  };

  const handleScenarioSelect = (option: ScenarioOption) => {
    setSelectedScenario(option);
    if (!milestones.practiced) {
        showMilestoneToast("You practiced noticing a pattern. That's how change begins.");
        setMilestones(prev => ({ ...prev, practiced: true }));
    }
  };
  
  const handleAiSubmit = async () => {
    if (aiInput.trim().length < 3) {
      toast({ title: "Please share a little more for Pamoja to respond.", variant: 'destructive' });
      return;
    }
    setIsAiLoading(true);
    setAiResponse('');
    const response = await getPamojaReflectionSupport(aiInput, lesson.id);
    setAiResponse(response);
    setIsAiLoading(false);
    if (!milestones.talked) {
        showMilestoneToast("You reached out for support. That's a sign of strength.");
        setMilestones(prev => ({ ...prev, talked: true }));
    }
  };
  
  const allMilestonesCompleted = milestones.reflected && milestones.practiced && milestones.talked;

  return (
    <div className="space-y-6 text-foreground/90">
      {/* 1. The Lesson */}
      <p className="text-muted-foreground">{lesson.summary}</p>
      
      {/* 2. Audio Player (Scaffold) */}
      <Card className="bg-card/50">
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-secondary"/>
                <span className="text-sm text-muted-foreground">Prefer listening?</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast({ title: "Audio feature coming soon!" })} disabled={!lesson.audioUrl}>
                <PlayCircle className="mr-2 h-4 w-4"/>
                Play Audio
            </Button>
        </CardContent>
      </Card>

      {/* 3. "Try This" Micro-Exercise */}
      <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg">
        <h4 className="font-headline font-semibold text-primary mb-2">Try This</h4>
        <p className="text-sm">{lesson.tryThis}</p>
      </div>

      {/* 4. "Reflect" Section */}
      <div className="space-y-3">
        <h4 className="font-headline font-semibold">Reflect</h4>
        <label htmlFor={`reflect-${lesson.id}`} className="text-sm text-muted-foreground block">{lesson.reflectionPrompt}</label>
        <Textarea 
            id={`reflect-${lesson.id}`}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Your thoughts here... No pressure."
            className="bg-input/50"
            rows={3}
        />
        <Button onClick={handleReflectionSubmit} size="sm">Save Reflection</Button>
      </div>
      
      {/* 5. "Practice with a Scenario" Section */}
      <div className="space-y-4">
        <h4 className="font-headline font-semibold">Practice With a Scenario</h4>
        <p className="text-sm text-muted-foreground italic">"{lesson.scenario.description}"</p>
        <div className="flex flex-col gap-2">
            {lesson.scenario.options.map(option => (
                <div key={option.id}>
                    <Button 
                        variant={selectedScenario?.id === option.id ? 'secondary' : 'outline'}
                        className="w-full text-left justify-start h-auto py-2"
                        onClick={() => handleScenarioSelect(option)}
                    >
                        {option.label}
                    </Button>
                    {selectedScenario?.id === option.id && (
                        <div className={cn(
                            "mt-2 p-3 text-xs rounded-lg border",
                            option.isHelpful ? "bg-primary/10 border-primary/20 text-primary-foreground" : "bg-destructive/10 border-destructive/20 text-destructive-foreground"
                        )}>
                            {option.explanation}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* 6. "Talk with Pamoja" AI Section */}
      <div className="space-y-3">
        <h4 className="font-headline font-semibold flex items-center gap-2">
            <Sparkles className="text-secondary"/> Talk with Pamoja
        </h4>
        <label htmlFor={`ai-${lesson.id}`} className="text-sm text-muted-foreground block">Share one sentence about how this lesson feels for you.</label>
        <div className="flex gap-2">
            <Textarea 
                id={`ai-${lesson.id}`}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="e.g., 'This makes me realize I'm always in all-or-nothing thinking...'"
                className="bg-input/50"
                rows={1}
            />
            <Button onClick={handleAiSubmit} disabled={isAiLoading}>
                {isAiLoading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-4 h-4" />}
            </Button>
        </div>
        {isAiLoading && (
            <div className="text-sm text-muted-foreground flex items-center gap-2 p-3">
                <Loader2 className="animate-spin h-4 w-4" />
                Pamoja is thinking...
            </div>
        )}
        {aiResponse && (
            <div className="mt-2 p-3 text-sm rounded-lg bg-primary/10 border border-primary/20">
                <blockquote className="italic text-foreground/90">"{aiResponse}"</blockquote>
            </div>
        )}
      </div>

      {/* 7. Milestone Completion */}
      {allMilestonesCompleted && (
        <div className="mt-6 p-4 text-center rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center gap-3">
            <BrainCircuit className="w-6 h-6 text-primary" />
            <div>
                <h5 className="font-headline text-primary">You've completed this mini-practice.</h5>
                <p className="text-xs text-muted-foreground mt-1">You can always come back. Healing is repetition, not perfection.</p>
            </div>
        </div>
      )}
    </div>
  );
}


export default function PsychoeducationMinis() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-center">
        Tiny lessons about emotions, attachment, and self-soothing. Each one includes a small practice to help you build skills.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {LESSONS.map((lesson) => (
          <AccordionItem value={lesson.id} key={lesson.id}>
            <AccordionTrigger>
              <div className="flex items-center text-lg">
                <BookOpen className="mr-3 h-5 w-5 text-secondary"/> 
                {lesson.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-card/30 p-4 rounded-b-lg">
              <InteractiveLesson lesson={lesson} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
