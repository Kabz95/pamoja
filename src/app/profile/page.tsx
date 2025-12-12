
"use client";

import { useRouter } from "next/navigation";
import { useUser, useFirestore, useDoc, useMemoFirebase, useAuth } from "@/firebase";
import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  LogOut,
  Sparkles,
  ShieldCheck,
  Mail,
  Settings as SettingsIcon,
  HeartHandshake,
  KeyRound,
  Loader2,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";
import AnimatedAvatar from "@/components/avatars/AnimatedAvatar";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
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
                <UserIcon className="w-16 h-16 text-primary" />
            </div>
            <CardTitle className="font-headline">You're Not Signed In</CardTitle>
            <CardDescription>
              This is a space for you. Sign in or create an account to personalize your journey and save your progress.
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

  const email = user.email ?? "Anonymous member";

  // Since we made the app free, this will always be false, but the structure is good.
  const isPremiumMember = false; 

  const planLabel = isPremiumMember ? "pamoja+ member" : "Free plan";
  const planDescription = isPremiumMember
    ? "You have access to the full toolkit, including audio support, analytics, and relationship tools."
    : "You have access to all core tools. Thank you for being here.";

  const handleSignOut = async () => {
    if (auth) {
        await signOut(auth);
    }
    router.push("/");
  };

  const handleChangePassword = () => {
    router.push("/profile"); // Placeholder, can be changed to a reset password page
  };

  const handleManagePlan = () => {
    router.push("/tools"); 
  };

  const handleGoToSettings = () => {
    router.push("/settings");
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-black via-purple-950 to-black">
      <main className="max-w-3xl mx-auto px-4 pt-10 pb-16 space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-semibold text-purple-50">
            Your Space
          </h1>
          <p className="text-sm sm:text-base text-purple-200/85 max-w-xl mx-auto">
            A quiet corner just for you. This is where you manage your account,
            your plan, and how you move through pamoja.
          </p>
        </header>

        {/* Main profile card */}
        <Card className="bg-purple-950/80 border border-purple-700/70">
          <CardHeader className="flex flex-col sm:flex-row gap-4 sm:items-center">
            {/* Avatar + basic info */}
            <div className="flex items-center gap-4 flex-1">
              <AnimatedAvatar avatarId={userProfile?.avatarId as any} size={64} />
              <div className="space-y-1">
                <p className="text-lg font-semibold text-purple-50 break-all">
                  {userProfile?.nickname?.trim() || user.displayName || email || "Anonymous member"}
                </p>
                <p className="text-[12px] text-purple-200/80">{email}</p>
                <p className="text-xs sm:text-sm text-purple-200/80">
                  Welcome back. We’re glad you’re here.
                </p>
              </div>
            </div>

            {/* Plan badge */}
            <div className="sm:text-right">
              <Badge
                variant="outline"
                className={
                  isPremiumMember
                    ? "border-emerald-400/80 text-emerald-300 bg-emerald-900/20"
                    : "border-purple-300/80 text-purple-100 bg-purple-900/30"
                }
              >
                {isPremiumMember ? (
                  <span className="flex items-center gap-1 text-xs">
                    <Sparkles className="h-3 w-3" />
                    pamoja+ member
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs">
                    <ShieldCheck className="h-3 w-3" />
                    Free plan
                  </span>
                )}
              </Badge>
              <p className="mt-1 text-[11px] text-purple-200/75 max-w-xs sm:ml-auto">
                {planDescription}
              </p>
            </div>
          </CardHeader>

          <Separator className="bg-purple-800/70" />

          {/* Account + plan actions */}
          <CardContent className="pt-6 grid gap-6 md:grid-cols-2">
            {/* Account section */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-purple-100 flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-purple-300" />
                Account security
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/85">
                For your safety, we never show your password here. You can use a
                secure link to change it.
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="justify-center border-purple-600 text-purple-50 hover:bg-purple-900/60"
                  onClick={handleChangePassword}
                  disabled={user.isAnonymous}
                >
                  Change password
                </Button>
              </div>
            </div>

            {/* Plan section */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-purple-100 flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-purple-300" />
                Your plan
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/85">
                {isPremiumMember
                  ? "Thank you for supporting this space. You can adjust your plan or payment details from here in the future."
                  : "You’re on the free plan with access to the complete toolkit."}
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  className={
                    isPremiumMember
                      ? "bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
                      : "bg-purple-600 hover:bg-purple-500 text-purple-50"
                  }
                  onClick={handleManagePlan}
                >
                  {isPremiumMember ? "Manage your plan" : "Explore Your Tools"}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start px-0 text-xs text-purple-300 hover:text-purple-100 hover:bg-transparent"
                  onClick={handleGoToSettings}
                >
                  <SettingsIcon className="h-3 w-3 mr-1.5" />
                  Open app settings
                </Button>
              </div>
            </div>
          </CardContent>

          <Separator className="bg-purple-800/70" />

          {/* Sign out row */}
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4">
            <p className="text-xs text-purple-300/90 text-center sm:text-left">
              You can sign out any time. Your data stays linked to your account,
              so you can pick up where you left off when you return.
            </p>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-50 hover:bg-purple-900/60 gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

    