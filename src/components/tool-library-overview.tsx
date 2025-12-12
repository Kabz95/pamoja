
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Coffee, ShieldCheck } from "lucide-react";


export default function ToolLibraryOverview() {
    return (
        <Card className="mb-12 bg-card/50 border-dashed">
            <CardHeader>
                <CardTitle className="font-headline text-center">A Calm Introduction</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                        <Coffee className="w-8 h-8 text-secondary"/>
                        <h4 className="font-semibold text-foreground">Start Small</h4>
                        <p className="text-sm">You don't need to use every tool. Find one that feels helpful today. That's more than enough. This space is for you to use as you need, without pressure.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-secondary"/>
                        <h4 className="font-semibold text-foreground">pamoja+</h4>
                        <p className="text-sm">The free tools are always available. If you're ready to go deeper, pamoja+ unlocks a bundle of 9 premium tools for remission work, like advanced analytics and personalized plans.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
