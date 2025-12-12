'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Headphones, Heart, Mic, Music, Waves, Wind } from "lucide-react";

export default function AudioLibrary() {
  const tracks = [
    { title: "Grounding Whisper: Noticing the Room", category: "Grounding", icon: Wind },
    { title: "Self-Compassion Letter: For After a Mistake", category: "Compassion", icon: Heart },
    { title: "Breathing Companion: 4-4-6 Breath", category: "Breathing", icon: Waves },
    { title: "Sleep Track: Gentle Body Scan", category: "Sleep", icon: Music },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card/50">
          <CardHeader>
              <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Mic size={28} />
                  </div>
                  <div>
                      <CardTitle className="font-headline text-xl">Soft-Voice Audio Library</CardTitle>
                      <CardDescription>A growing library of soft-spoken tracks designed to sit gently beside you: grounding, compassion, and breathing support for a sensitive nervous system.</CardDescription>
                  </div>
              </div>
          </CardHeader>
      </Card>
      
      <Card>
          <CardHeader>
              <CardTitle className="font-headline text-lg">How to Use This Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p><strong className="text-foreground">1. Pick what you need right now:</strong> If you feel wired and shaky, try a grounding track. If you feel ashamed, try a compassion letter. If you feel numb, try a body-scan track.</p>
              <p><strong className="text-foreground">2. Use headphones if you can:</strong> It’s not required, but often feels more contained and safe.</p>
              <p><strong className="text-foreground">3. Don’t fight the track:</strong> Let the sentences pass by like traffic. Take what lands, leave the rest.</p>
              <p><strong className="text-foreground">4. Stop at any time:</strong> You are in charge. If something doesn’t feel good, pause or switch to a different track.</p>
          </CardContent>
      </Card>

      <div className="space-y-4">
          <h3 className="font-headline text-lg text-center">Available Tracks</h3>
          {tracks.map(track => (
              <Card key={track.title}>
                  <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <track.icon className="w-5 h-5 text-secondary" />
                          <div>
                              <p className="font-semibold">{track.title}</p>
                              <p className="text-xs text-muted-foreground">{track.category}</p>
                          </div>
                      </div>
                      <Button variant="outline" size="sm">Play</Button>
                  </CardContent>
              </Card>
          ))}
      </div>

       <Alert>
        <Headphones className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          These tracks are support, not a substitute for crisis services or medical care. If you’re in immediate danger, please reach out to local emergency or crisis supports first.
        </AlertDescription>
      </Alert>
    </div>
  );
}
