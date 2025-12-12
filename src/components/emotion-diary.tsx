
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lightbulb, RotateCw } from "lucide-react";

type EmotionDiaryProps = {
  userId?: string; // Kept optional to maintain compatibility
  onClose?: () => void;
  onOpenCrisisToolkit?: () => void;
};

const PROMPTS = [
  "What happened just before this feeling?",
  "Where do you feel it in your body?",
  "What do you wish someone would say to you right now?",
  "What are you afraid might happen next?",
  "If this feeling had a color, what would it be?",
  "What does this feeling need from you?"
];

const TAGS = [
  "Conflict", "Lonely", "Abandoned", "Triggered",
  "Overwhelmed", "Good news", "Supported", "Tired"
];

const getMoodLabel = (intensity: number): { text: string; emoji: string } => {
  if (intensity <= 2) return { text: "shattered, panicky", emoji: "😢" };
  if (intensity <= 4) return { text: "heavy, numb", emoji: "😔" };
  if (intensity <= 6) return { text: "mixed, overwhelmed", emoji: "😶‍🌫️" };
  if (intensity <= 8) return { text: "hopeful, lighter", emoji: "🙂" };
  return { text: "joyful, expansive", emoji: "😄" };
};


export function EmotionDiary({ userId, onClose, onOpenCrisisToolkit }: EmotionDiaryProps) {
  const [intensity, setIntensity] = useState(5);
  const [description, setDescription] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [bodyState, setBodyState] = useState<"tense" | "neutral" | "relaxed" | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    // Pick a random prompt on initial mount
    setCurrentPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  }, []);

  const handleNewPrompt = () => {
    let newPrompt = currentPrompt;
    while (newPrompt === currentPrompt) {
      newPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    }
    setCurrentPrompt(newPrompt);
  };
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleBodyStateSelect = (state: "tense" | "neutral" | "relaxed") => {
    setBodyState(prevState => prevState === state ? null : state);
  };
  
  const handleOpenCrisisToolkit = () => {
    if (onOpenCrisisToolkit) {
      onOpenCrisisToolkit();
    } else {
      console.log("Open Crisis Toolkit (wire this to real navigation later)");
    }
  };

  const handleSave = () => {
    if (description === "" && selectedTags.length === 0) {
        setSaveMessage("You can share as little or as much as you want — even a few words are okay.");
    } else {
        setSaveMessage(null); // Clear gentle note if user added content
    }

    // Saving logic (logging to console for now)
    console.log("Emotion entry saved", {
      userId: userId || "anonymous",
      intensity,
      description,
      selectedTags,
      bodyState,
      promptUsed: currentPrompt,
      createdAt: new Date().toISOString(), // Simulate timestamp
    });

    // Gentle feedback
    setSaveMessage("Entry saved. You showed up for yourself just now.");
    setDescription("");
    setSelectedTags([]);
    setBodyState(null);

    // Clear the message after a few seconds
    setTimeout(() => {
      setSaveMessage(null);
    }, 4000);
  };

  const mood = getMoodLabel(intensity);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-headline text-center font-semibold text-foreground">
        Emotion Diary & Mood Dial
      </h2>

      {/* Intensity Slider */}
      <div className="space-y-3">
        <label className="text-sm text-muted-foreground text-center block">
          How are you feeling right now?
        </label>
        <p className="text-center">
          <span className="text-muted-foreground">Intensity: </span>
          <span className="font-semibold text-foreground">{intensity}</span>
          <span className="ml-2 text-foreground/90 font-medium">
             {mood.text} {mood.emoji}
          </span>
        </p>

        <div className="relative pt-2">
            <input
              type="range"
              min={1}
              max={10}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
             <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Distraught (1)</span>
                <span>Ecstatic (10)</span>
            </div>
        </div>
      </div>
      
      {/* Tags */}
      <div className="space-y-3">
        <label className="text-sm text-muted-foreground">What's present? (optional)</label>
        <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => (
                <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                        "px-3 py-1 text-sm rounded-full border transition-colors",
                        selectedTags.includes(tag) 
                            ? "bg-primary/80 border-primary text-primary-foreground" 
                            : "bg-input/50 border-border hover:bg-accent"
                    )}
                >
                    {tag}
                </button>
            ))}
        </div>
      </div>

       {/* Body Check-in */}
      <div className="space-y-3">
        <label className="text-sm text-muted-foreground">Body check-in (optional)</label>
        <div className="flex items-center gap-2">
           {(["Tense", "Neutral", "Relaxed"] as const).map(state => (
                <button
                    key={state}
                    onClick={() => handleBodyStateSelect(state.toLowerCase() as "tense" | "neutral" | "relaxed")}
                    className={cn(
                        "px-3 py-1 text-sm rounded-full border transition-colors",
                        bodyState === state.toLowerCase()
                             ? "bg-primary/80 border-primary text-primary-foreground" 
                             : "bg-input/50 border-border hover:bg-accent"
                    )}
                >
                    {state}
                </button>
            ))}
        </div>
      </div>


      {/* Description Textarea */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm text-muted-foreground">
          Describe what you feel and why…
        </label>
        <div className="relative">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-input bg-input/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="You can share as little or as much as you want."
          />
           <div className="absolute bottom-2 left-3 text-xs text-muted-foreground/70 flex items-center gap-2">
                <Lightbulb className="w-3 h-3" />
                <span>{currentPrompt}</span>
                <button onClick={handleNewPrompt} className="p-1 rounded-full hover:bg-accent -mr-2">
                    <RotateCw className="w-3 h-3"/>
                    <span className="sr-only">New prompt</span>
                </button>
            </div>
        </div>
      </div>
      
      {/* Crisis Banner */}
      {intensity <= 2 && (
          <div className="p-3 text-center rounded-lg border border-destructive/50 bg-destructive/10 text-sm text-destructive-foreground/90 space-y-3">
              <p>This looks really intense. If you’d like extra support, you can open the Crisis Toolkit.</p>
              <Button variant="destructive" size="sm" onClick={handleOpenCrisisToolkit}>
                Open Crisis Toolkit
              </Button>
          </div>
      )}

      {/* Save Button */}
      <Button
        type="button"
        onClick={handleSave}
        className="w-full"
      >
        Save Entry
      </Button>

      {/* Save feedback */}
      {saveMessage && (
        <div className="text-center text-sm text-muted-foreground p-2 rounded-lg bg-primary/10">
          <p>{saveMessage}</p>
        </div>
      )}
    </div>
  );
}

export default EmotionDiary;

    