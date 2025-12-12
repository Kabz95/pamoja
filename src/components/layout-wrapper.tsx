
'use client';
import { useAuthLoadingState } from "@/hooks/use-auth-loading";
import { BootupScreen } from "./BootupScreen";
import { Button } from "./ui/button";
import Link from "next/link";
import { BookOpen, Home, Settings, User, PenSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const isLoading = useAuthLoadingState();

    return (
        <>
            <AnimatePresence>
                {isLoading && <BootupScreen />}
            </AnimatePresence>

            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col min-h-screen">
                        <main className="flex-1 pb-20 sm:pb-0">{children}</main>
                        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t p-1 sm:hidden grid grid-cols-5 gap-1 z-10">
                            <Button variant="ghost" size="sm" className="flex-col h-auto" asChild>
                                <Link href="/">
                                    <Home className="w-5 h-5" />
                                    <span className="text-xs mt-1">Home</span>
                                </Link>
                            </Button>
                             <Button variant="ghost" size="sm" className="flex-col h-auto" asChild>
                                <Link href="/penpal">
                                    <PenSquare className="w-5 h-5" />
                                    <span className="text-xs mt-1">Pen Pals</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-col h-auto" asChild>
                                <Link href="/tools">
                                    <BookOpen className="w-5 h-5" />
                                    <span className="text-xs mt-1">Tools</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-col h-auto" asChild>
                                <Link href="/profile">
                                    <User className="w-5 h-5" />
                                    <span className="text-xs mt-1">Profile</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-col h-auto" asChild>
                                <Link href="/settings">
                                    <Settings className="w-5 h-5" />
                                    <span className="text-xs mt-1">Settings</span>
                                </Link>
                            </Button>
                        </nav>
                    </div>
                </motion.div>
            )}
        </>
    )
}
