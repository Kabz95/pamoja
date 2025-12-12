
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getReframedThought } from '@/app/actions';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  negativeThought: z.string().min(10, {
    message: "Please share a little more. Your thought must be at least 10 characters.",
  }),
});

export default function ThoughtReframeTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [reframedThought, setReframedThought] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      negativeThought: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReframedThought(null);
    form.clearErrors();

    const result = await getReframedThought(values.negativeThought);

    if (result.reframedThought) {
      setReframedThought(result.reframedThought);
    } else if (result.error) {
      toast({
        title: "A gentle reminder",
        description: result.error,
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground text-center">
        Share a thought that's on your mind. Our AI companion will help you find a gentler, more balanced perspective.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="negativeThought"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Your Negative Thought</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'I feel like I'm not making any progress and I'll be stuck forever.'"
                    rows={4}
                    {...field}
                    className="bg-input/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reframing...
              </>
            ) : (
               <>
                <Sparkles className="mr-2 h-4 w-4" />
                Reframe My Thought
              </>
            )}
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center p-6">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
          <span className="text-muted-foreground">Holding space for you...</span>
        </div>
      )}

      {reframedThought && !isLoading && (
        <Card className="mt-4 bg-primary/10 border-primary/30 animate-in fade-in">
          <CardContent className="p-6">
            <h4 className="font-headline text-lg font-semibold text-primary mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5"/>
              A New Perspective
            </h4>
            <blockquote className="text-foreground/90 italic pl-4 border-l-2 border-primary">
              {reframedThought}
            </blockquote>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
