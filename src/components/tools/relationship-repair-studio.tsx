'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HeartHandshake, VenetianMask } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RelationshipRepairStudio() {
  const [perspective, setPerspective] = useState("");
  const [understanding, setUnderstanding] = useState("");
  const [needs, setNeeds] = useState("");

  const script = `When [event] happened, I felt [emotion] because [meaning]. What I’d like next time is [request/boundary].`;

  return (
    <div className="space-y-6">
      <Card className="bg-card/50">
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <HeartHandshake size={28} />
                </div>
                <div>
                    <CardTitle className="font-headline text-xl">Relationship Repair Studio</CardTitle>
                    <CardDescription>A space to draft what you wish you could say, set boundaries, and prepare to repair after conflict—without pressure to send anything.</CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      
      <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">1. What happened (your perspective)?</CardTitle>
                <CardDescription>Write what happened in your own words. You don’t have to be ‘fair’ yet—just honest.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea value={perspective} onChange={e => setPerspective(e.target.value)} placeholder="My honest perspective is..." />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">2. What you wish they understood?</CardTitle>
                <CardDescription>If they could truly understand one thing about how you felt, what would it be?</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea value={understanding} onChange={e => setUnderstanding(e.target.value)} placeholder="I wish they knew that I felt..." />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">3. Needs & Boundaries</CardTitle>
                <CardDescription>In future, what do you need from this person during conflict?</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea value={needs} onChange={e => setNeeds(e.target.value)} placeholder="I need..." />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">4. Draft a Repair Script</CardTitle>
                <CardDescription>Use this template to practice. You don't have to send it.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-4 bg-primary/10 rounded-lg text-muted-foreground italic">
                    <p>{script}</p>
                </div>
            </CardContent>
        </Card>
      </div>

       <Alert>
        <VenetianMask className="h-4 w-4" />
        <AlertTitle>Gentle Reminder</AlertTitle>
        <AlertDescription>
          You don’t owe anyone instant repair. This studio is for your clarity first; sharing is always your choice. You can also decide to have this conversation now, later, or not at all.
        </AlertDescription>
      </Alert>
    </div>
  );
}
