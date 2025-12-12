
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const stages = [
  { duration: 4000, text: 'Breathe in...', scale: 'scale-150' },
  { duration: 4000, text: 'Hold your breath', scale: 'scale-150' },
  { duration: 6000, text: 'Breathe out slowly...', scale: 'scale-100' },
];

export function BreathingExercise() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStageIndex((prevIndex) => (prevIndex + 1) % stages.length);
    }, stages[stageIndex].duration);

    return () => clearTimeout(timer);
  }, [stageIndex]);
  
  const currentStage = stages[stageIndex];
  
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 rounded-lg gap-8 min-h-[300px]">
      <div 
        className={cn(
          "w-32 h-32 bg-primary rounded-full transition-transform duration-3000 ease-in-out flex items-center justify-center",
          currentStage.scale
        )}
      >
        <div className="w-24 h-24 bg-primary/50 rounded-full"/>
      </div>
      <p className="text-2xl font-headline text-center text-foreground transition-opacity duration-500">
        {currentStage.text}
      </p>
    </div>
  );
}
