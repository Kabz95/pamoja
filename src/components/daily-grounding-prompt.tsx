
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Lightbulb } from 'lucide-react';

const prompts = [
  "What helped you get through today?",
  "Describe one small moment of peace you found.",
  "What is something you're looking forward to, no matter how small?",
  "Name one thing you did for yourself today.",
  "What's a sound, smell, or texture that felt comforting?"
];

// A simple hash function to get a consistent prompt for the day
const getDailyPromptIndex = () => {
  const date = new Date();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return dayOfYear % prompts.length;
};


export default function DailyGroundingPrompt() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  
  useEffect(() => {
    setPrompt(prompts[getDailyPromptIndex()]);
  }, []);

  const handleSave = () => {
    if (!response) {
      toast({
        title: "Please write a short response.",
        variant: "destructive",
      });
      return;
    }
    console.log({ prompt, response });
    toast({
      title: "Saved",
      description: "Thank you for sharing with yourself.",
    });
    setResponse('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
        <h3 className="font-headline text-lg font-semibold text-primary mb-2 flex items-center gap-2 justify-center">
          <Lightbulb /> Daily Grounding Prompt
        </h3>
        <blockquote className="text-foreground/90 italic">
          {prompt}
        </blockquote>
      </div>

      <Textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Your thoughts here... No pressure, no judgment."
        rows={4}
        className="bg-input/50"
      />
      
      <Button onClick={handleSave} className="w-full sm:w-auto sm:self-end">
        Save for Myself
      </Button>
    </div>
  );
}
