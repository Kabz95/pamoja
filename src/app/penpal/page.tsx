
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Users, UserPlus } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PenPalPage() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center text-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Users className="w-16 h-16 text-primary" />
            </div>
            <CardTitle className="font-headline">Connect with Others</CardTitle>
            <CardDescription>
              The Pen Pal program is a gentle way to connect with others on a similar journey. Sign in to find a pen pal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/auth">Sign In or Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Placeholder data for pen pals - in a real app, this would come from Firestore
  const penpals = PlaceHolderImages.slice(0, 2); 
  const potentialPenpals = PlaceHolderImages.slice(2, 4);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-purple-950 to-black p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl mx-auto mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground text-center">
          Your Pen Pals
        </h1>
        <p className="mt-2 text-muted-foreground text-center max-w-2xl mx-auto">
          A space to build gentle, supportive connections. Write and receive letters to feel less alone on your journey.
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        {/* Current Pen Pals Section */}
        <section>
          <h2 className="text-2xl font-headline font-semibold text-primary mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Your Connections
          </h2>
          {penpals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {penpals.map((pal) => (
                <Card key={pal.id} className="bg-purple-950/80 border-purple-700/70 overflow-hidden">
                  <Image src={pal.imageUrl} alt={pal.description} width={400} height={300} className="w-full h-40 object-cover" data-ai-hint={pal.imageHint} />
                  <CardHeader>
                    <CardTitle className="text-purple-50">{pal.id.replace('-', ' ')}</CardTitle>
                    <CardDescription className="text-purple-200/80">Last letter: 3 days ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-purple-600 hover:bg-purple-500 text-purple-50">Write a Letter</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8 bg-card/50">
              <p className="text-muted-foreground">You haven't connected with a pen pal yet. Find one below to start your first conversation.</p>
            </Card>
          )}
        </section>

        {/* Find New Pen Pals Section */}
        <section>
          <h2 className="text-2xl font-headline font-semibold text-primary mb-4 flex items-center gap-2">
            <UserPlus className="w-6 h-6" />
            Find a New Pen Pal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {potentialPenpals.map((pal) => (
              <Card key={pal.id} className="bg-purple-950/80 border-purple-700/70 overflow-hidden">
                <Image src={pal.imageUrl} alt={pal.description} width={400} height={300} className="w-full h-40 object-cover" data-ai-hint={pal.imageHint} />
                <CardHeader>
                  <CardTitle className="text-purple-50">{pal.id.replace('-', ' ')}</CardTitle>
                  <CardDescription className="text-purple-200/80">"Looking for someone to share small wins with."</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-purple-600 text-purple-50 hover:bg-purple-900/60">Send a Request</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
