
import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThoughtReframeTool from "@/components/thought-reframe-tool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
      <header className="w-full max-w-4xl mb-8 md:mb-12 animate-in fade-in duration-500">
        <div className="flex items-center justify-center gap-4">
          <HeartHandshake className="w-12 h-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            pamoja
          </h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A gentle companion for your mental wellness journey. Welcome to a safe corner of the internet designed to be validating, slow, and low-pressure.
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center gap-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/tools">Explore Tools</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/tools/crisis-toolkit">Crisis Toolkit</Link>
          </Button>
        </div>

        <Card className="w-full max-w-2xl text-left">
            <CardHeader>
                <CardTitle className="text-center font-headline">A Moment for You</CardTitle>
            </CardHeader>
            <CardContent>
                <ThoughtReframeTool />
            </CardContent>
        </Card>

      </main>

      <footer className="w-full max-w-6xl mt-12 text-center text-muted-foreground text-sm animate-in fade-in duration-500 delay-500">
        <p>Made with care for you.</p>
      </footer>
    </div>
  );
}
