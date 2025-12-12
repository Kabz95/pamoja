'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BreathingExercise } from "@/components/breathing-exercise";
import { PersonStanding, ShieldCheck, Phone, AlertTriangle, Star, CheckCircle, Wind, Footprints, Heart, Brain, Zap, Text, Milestone, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from './ui/textarea';


const struggles = [
    { id: 'panicking', label: 'I’m panicking', icon: Wind, tab: 'breathing' },
    { id: 'numb', label: 'I feel numb', icon: Brain, tab: 'grounding' },
    { id: 'disappear', label: 'I want to disappear', icon: Heart, tab: 'safety-plan' },
    { id: 'ashamed', label: 'I feel ashamed', icon: ThumbsDown, tab: 'grounding' },
    { id: 'angry', label: 'I’m angry & overwhelmed', icon: Zap, tab: 'breathing' },
];

const groundingSteps = [
    { num: 5, label: "things you can see", prompt: "Look around you. Name five things. No judgment. e.g., 'the blue lamp', 'a crack on the wall'..." },
    { num: 4, label: "things you can touch", prompt: "Notice the sensation. The texture of your clothes, the coolness of a glass..." },
    { num: 3, label: "things you can hear", prompt: "Listen for sounds, near or far. A car passing, the hum of a fridge, your own breath..." },
    { num: 2, label: "things you can smell", prompt: "What scents are in the air? If none, imagine two smells that feel safe to you..." },
    { num: 1, label: "thing you can taste", prompt: "Notice the taste in your mouth, or take a sip of water and notice the sensation." },
];

const FiveFourThreeTwoOneStepper = () => {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep(s => Math.min(s + 1, groundingSteps.length));
    };

    const handleBack = () => {
        setStep(s => Math.max(s - 1, 0));
    };

    const handleReset = () => {
        setStep(0);
    };

    if (step === groundingSteps.length) {
        return (
            <div className="text-center p-6 bg-primary/10 rounded-lg space-y-4">
                <p className="font-headline text-lg text-primary">You made it through the steps.</p>
                <p className="text-muted-foreground">That’s not small. Take one slow breath and notice if the feeling shifted even 1%.</p>
                <Button onClick={handleReset} variant="outline">Start Over</Button>
            </div>
        );
    }
    
    const currentStep = groundingSteps[step];

    return (
        <div className="p-4 border rounded-lg space-y-4">
            <h4 className="font-headline text-xl text-center">
                <span className="text-primary font-bold">{currentStep.num}</span> {currentStep.label}
            </h4>
            <p className="text-sm text-muted-foreground text-center">{currentStep.prompt}</p>
            <Textarea 
                placeholder="You can write them here if it helps..." 
                className="bg-input/50"
                rows={2}
            />
            <div className="flex justify-between items-center">
                <Button onClick={handleBack} variant="ghost" disabled={step === 0}>Back</Button>
                <p className="text-xs text-muted-foreground">{step + 1} / {groundingSteps.length}</p>
                <Button onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
};


export default function CrisisToolkit() {
  const [activeStruggle, setActiveStruggle] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('breathing');

  const handleStruggleSelect = (struggle: typeof struggles[0]) => {
    setActiveStruggle(struggle.id);
    setActiveTab(struggle.tab);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
          <h3 className="text-lg font-headline text-foreground">If things feel unbearable right now, you’re not weak. You’re hurting.</h3>
      </div>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-shimmer">This is not an emergency service</AlertTitle>
        <AlertDescription>
          If you’re in immediate danger or thinking about ending your life, please call your local emergency line or a crisis service in your area. You deserve live, human support.
        </AlertDescription>
      </Alert>

      <div className="p-4 rounded-lg bg-card/50 border">
        <h4 className="text-sm text-muted-foreground text-center mb-3">How are you struggling right now?</h4>
        <div className="flex flex-wrap gap-2 justify-center">
            {struggles.map((struggle) => (
                <Button 
                    key={struggle.id} 
                    variant={activeStruggle === struggle.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => handleStruggleSelect(struggle)}
                    className="h-auto py-1.5"
                >
                    <struggle.icon className="w-4 h-4 mr-2" />
                    {struggle.label}
                </Button>
            ))}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-input/30">
          <TabsTrigger value="breathing"><Wind className="w-4 h-4 mr-2 sm:hidden"/> Breathing</TabsTrigger>
          <TabsTrigger value="grounding"><Footprints className="w-4 h-4 mr-2 sm:hidden"/> Grounding</TabsTrigger>
          <TabsTrigger value="safety-plan"><ShieldCheck className="w-4 h-4 mr-2 sm:hidden"/> Safety Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="breathing" className="p-2">
            <p className="text-sm text-center text-muted-foreground mb-4">If your body feels like an alarm right now, let’s try to slow it down a tiny bit. You can stop at any time.</p>
            <BreathingExercise />
            <div className="mt-6 p-4 text-center border-t border-dashed">
                <p className="text-sm text-muted-foreground">Breathing feels bad for some people. If that’s you, you can just place your feet on the floor, feel their weight, and press your hands together. That counts as grounding, too.</p>
            </div>
        </TabsContent>

        <TabsContent value="grounding" className="p-2 space-y-4">
            <FiveFourThreeTwoOneStepper />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="affirmations">
                <AccordionTrigger>Soft Reminders</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 p-2">
                  <p>"This feeling is temporary."</p>
                  <p>"I am doing the best I can with what I have."</p>
                  <p>"I can get through this."</p>
                  <p>"Being in crisis doesn’t make me a bad or unworthy person."</p>
                  <p>"My feelings are intense because my nervous system is sensitive, not because I am 'too much'."</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </TabsContent>
        
        <TabsContent value="safety-plan" className="p-2">
          <div className="p-4 text-sm text-center text-muted-foreground">
             A safety plan is a personalized note to yourself to help you get through the hardest moments. This is your personal support plan; it’s not a substitute for professional or emergency help.
          </div>
          <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Milestone className="mr-2 h-5 w-5 text-secondary"/> Reasons I Want to Stay
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p className="text-xs">Future moments I don’t want to miss (even if I don’t feel them right now).</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Example: My pet needs me.</li>
                  <li>Example: I want to see the next season of my favorite show.</li>
                  <li>Example: I promised to call my friend tomorrow.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Text className="mr-2 h-5 w-5 text-secondary"/> Words I Want to Hear
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                 <p className="text-xs">Reminders for when I'm here again.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>"You’ve survived this intensity before."</li>
                    <li>"Being in pain doesn’t make you unlovable."</li>
                    <li>"You are not only this moment."</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-secondary"/> People & Places
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                 <p className="text-xs">Who I can call or where I can go to feel less alone.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Friend's Name: [Friend's Phone Number]</li>
                  <li>Family Member: [Family Member's Phone Number]</li>
                  <li>Go to a local park or library.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
      <div className="w-full mt-4 text-center text-muted-foreground text-sm">
        <p>You are allowed to stay. This moment will not last forever.</p>
      </div>
    </div>
  );
}
