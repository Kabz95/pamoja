
'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserCog, Palette, Moon, Sun, Star, Heart, Smile, Leaf, Brain, Cloud, Sunset, Sunrise, Sparkles as Glitter } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import AnimatedAvatar from "@/components/avatars/AnimatedAvatar";
import { updateUserProfile } from '@/firebase/user-profile';
import { AVATAR_CONFIG, AvatarId, DEFAULT_AVATAR_ID } from '@/lib/avatars';

const themes = [
    { name: 'Cosmic Indigo', class: 'dark', icon: Glitter },
    { name: 'Midnight Lavender', class: 'theme-midnight-lavender', icon: Moon },
    { name: 'Dawn Comfort', class: 'theme-dawn-comfort', icon: Sunrise },
    { name: 'Deep Ocean Calm', class: 'theme-deep-ocean', icon: Brain },
    { name: 'Petal Sanctuary', class: 'theme-petal-sanctuary', icon: Heart },
    { name: 'Starfield Minimal', class: 'theme-starfield-minimal', icon: Star },
    { name: 'Forest Fern', class: 'theme-forest-fern', icon: Leaf },
    { name: 'Amethyst Aura', class: 'theme-amethyst-aura', icon: Sun },
    { name: 'Cloud Whisper', class: 'theme-cloud-whisper', icon: Cloud },
    { name: 'Ember Warmth', class: 'theme-ember-warmth', icon: Sunset },
];

export default function SettingsPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    
    const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [user, firestore]);
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<{nickname?: string; avatarId?: AvatarId}>(userProfileRef);

    const [nickname, setNickname] = useState<string>("");
    const [avatarId, setAvatarId] = useState<AvatarId>(DEFAULT_AVATAR_ID);
    const [saving, setSaving] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('dark');

    useEffect(() => {
        if (userProfile) {
            setNickname(userProfile.nickname ?? "");
            setAvatarId(userProfile.avatarId ?? DEFAULT_AVATAR_ID);
        }
    }, [userProfile]);

    useEffect(() => {
        const storedTheme = localStorage.getItem('pamoja-theme') || 'dark';
        if (storedTheme) {
            document.documentElement.className = storedTheme;
            setCurrentTheme(storedTheme);
        }
    }, []);
    
    const handleThemeChange = (themeClass: string) => {
        setCurrentTheme(themeClass);
        document.documentElement.className = themeClass;
        localStorage.setItem('pamoja-theme', themeClass);
        toast({
            title: "Theme Updated",
            description: "Your app's appearance has been updated.",
        });
    };
    
    async function handleSaveProfile() {
        if (!user) {
            toast({ title: "You must be logged in to save.", variant: "destructive" });
            return;
        }
        try {
            setSaving(true);
            await updateUserProfile(firestore, user.uid, {
                nickname: nickname?.trim() || null,
                avatarId,
            });
            toast({ title: "Profile saved", description: "Your nickname and companion were updated." });
        } catch (e) {
            console.error(e);
            toast({ title: "Couldn’t save", description: "Please try again.", variant: "destructive" });
        } finally {
            setSaving(false);
        }
    }

    if (isUserLoading || isProfileLoading) {
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
                            <UserCog className="w-16 h-16 text-primary" />
                        </div>
                        <CardTitle className="font-headline">Please Sign In</CardTitle>
                        <CardDescription>
                            You need to be signed in to access your settings. This is your space, after all.
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

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-black via-purple-950 to-black flex flex-col items-center p-4 sm:p-6 md:p-8">
            <header className="w-full max-w-4xl mb-8 md:mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground text-center">
                    Settings
                </h1>
                <p className="mt-2 text-muted-foreground text-center">
                    Gently adjust your space to feel just right for you.
                </p>
            </header>

            <main className="w-full max-w-3xl space-y-8">
                <Card className="bg-purple-950/80 border border-purple-700/70">
                    <CardHeader>
                        <CardTitle className="text-purple-50">Profile Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Nickname */}
                        <div className="space-y-2">
                            <label className="text-sm text-purple-200/80">Nickname</label>
                            <Input
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="A name that feels like you"
                                className="bg-purple-900/60 border-purple-700 text-purple-50 placeholder:text-purple-300/60"
                            />
                            <p className="text-xs text-purple-300/80">
                                This is how we’ll greet you around the app instead of using your email.
                            </p>
                        </div>

                        {/* Avatar selection */}
                        <div className="space-y-3">
                            <label className="text-sm text-purple-200/80">Magical Companion</label>
                            <p className="text-xs text-purple-300/80">
                                Choose a character that feels like a safe, gentle companion for this season.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {AVATAR_CONFIG.map((avatar) => {
                                    const selected = avatarId === avatar.id;
                                    return (
                                        <button
                                            key={avatar.id}
                                            type="button"
                                            onClick={() => setAvatarId(avatar.id)}
                                            className={cn(
                                                "p-3 rounded-2xl border text-left transition flex flex-col items-center gap-2",
                                                selected
                                                ? "border-purple-300 bg-purple-900/70 shadow-lg"
                                                : "border-purple-800 bg-purple-950/40 hover:border-purple-500"
                                            )}
                                        >
                                            <AnimatedAvatar avatarId={avatar.id} size={60} />
                                            <div className="space-y-0.5 text-center">
                                                <p className="text-xs font-medium text-purple-50">
                                                {avatar.name}
                                                </p>
                                                <p className="text-[11px] text-purple-200/80">
                                                {avatar.tagline}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="bg-purple-600 hover:bg-purple-500 text-purple-50"
                            >
                                {saving ? "Saving…" : "Save Profile"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Palette /> Appearance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <label className="text-sm">Themes</label>
                         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {themes.map((theme) => (
                                <button
                                    key={theme.name}
                                    onClick={() => handleThemeChange(theme.class)}
                                    className={cn(
                                        "p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-colors",
                                        currentTheme === theme.class ? "border-primary bg-primary/20" : "border-border hover:bg-accent"
                                    )}
                                    title={theme.name}
                                >
                                    <theme.icon className="w-6 h-6" />
                                    <span className="text-xs text-center">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
