
'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser, initiateEmailSignUp, initiateEmailSignIn, initiateAnonymousSignIn, initiateGoogleSignIn, initiateAppleSignIn } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { HeartHandshake } from 'lucide-react';

export default function AuthPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
        router.push('/profile');
    }
  }, [user, isUserLoading, router]);

  const handleAuthAction = async (action: 'signup' | 'signin') => {
    setIsSubmitting(true);
    try {
      if (!auth) throw new Error("Auth service not available.");

      if (action === 'signup') {
        await initiateEmailSignUp(auth, email, password, name);
      } else {
        await initiateEmailSignIn(auth, email, password);
      }
      
      toast({
        title: 'Welcome!',
        description: "You're being signed in. Redirecting you to your profile...",
      });
      // The useEffect will handle the redirect
    } catch (error: any) {
      toast({
        title: 'Something went wrong',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAnonymousSignIn = async () => {
    setIsSubmitting(true);
    try {
        if (!auth) throw new Error("Auth service not available.");
        await initiateAnonymousSignIn(auth);
        toast({
            title: 'Welcome',
            description: "You're signed in anonymously. You can create an account later to save your progress.",
        });
         // The useEffect will handle the redirect
    } catch (error: any) {
        toast({
            title: 'Something went wrong',
            description: error.message,
            variant: 'destructive',
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'apple') => {
    setIsSubmitting(true);
    try {
        if (!auth) throw new Error("Auth service not available.");
        if (provider === 'google') {
            await initiateGoogleSignIn(auth);
        } else {
            await initiateAppleSignIn(auth);
        }
        toast({
            title: 'Welcome!',
            description: "You're being signed in. Redirecting you...",
        });
        // The useEffect will handle the redirect
    } catch (error: any) {
        toast({
            title: 'Something went wrong',
            description: "You didn’t do anything wrong. Please try again or use another method.",
            variant: 'destructive',
        });
        console.error(`${provider} sign-in error`, error);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center text-center mb-8">
            <HeartHandshake className="w-12 h-12 text-primary mb-4" />
            <h1 className="text-3xl font-headline font-bold text-foreground">
                A Space for You
            </h1>
            <p className="mt-2 text-muted-foreground max-w-sm">
                Create an account to save your journey, or continue anonymously. There's no pressure here.
            </p>
        </div>
        
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleSocialSignIn('google')} disabled={isSubmitting}>
                     Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialSignIn('apple')} disabled={isSubmitting}>
                    Apple
                </Button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
        </div>

        <Tabs defaultValue="signin" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Gently sign in with your email to continue your journey.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input id="email-signin" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Password</Label>
                  <Input id="password-signin" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button onClick={() => handleAuthAction('signin')} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Join Us</CardTitle>
                <CardDescription>
                  Creating an account with your email is a gentle step forward.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-signup">Name</Label>
                  <Input id="name-signup" type="text" placeholder="A name that feels like you" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button onClick={() => handleAuthAction('signup')} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-center text-sm text-muted-foreground">
            Or, if you're not ready...
        </div>
        <Button variant="link" className="w-full mt-2" onClick={handleAnonymousSignIn} disabled={isSubmitting}>
          Continue Anonymously
        </Button>
      </div>
    </div>
  );
}
