
"use client";

import { cn } from "@/lib/utils";
import { AvatarId, getAvatarById } from "@/lib/avatars";

type Props = {
  avatarId?: AvatarId | null;
  size?: number; // px
  className?: string;
};

export default function AnimatedAvatar({ avatarId, size = 72, className }: Props) {
  const config = getAvatarById(avatarId ?? undefined);
  const s = size;

  const base = cn(
    "rounded-full shadow-xl relative overflow-hidden flex items-center justify-center",
    "animate-[float_4s_ease-in-out_infinite]",
    className
  );

  const bgStyle = {
    width: s,
    height: s,
    backgroundImage: `linear-gradient(135deg, ${config.accentFrom}, ${config.accentTo})`,
  } as React.CSSProperties;

  // Different mini-drawings per avatar
  switch (config.id) {
    case "elia-candlemage":
      return (
        <div className={base} style={bgStyle}>
          {/* candle body */}
          <div className="w-7 h-8 bg-amber-100/90 rounded-md flex flex-col items-center justify-end pb-1">
            <div className="w-4 h-1 rounded-full bg-amber-300/80" />
          </div>
          {/* flame */}
          <div className="absolute -top-1">
            <div className="w-3 h-4 bg-amber-300 rounded-full rotate-12 animate-pulse" />
          </div>
        </div>
      );

    case "mira-starling":
      return (
        <div className={base} style={bgStyle}>
          {/* constellation */}
          <svg className="w-10 h-10 text-purple-100/95" viewBox="0 0 40 40">
            <polyline
              points="5,30 15,10 25,15 35,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {[5, 15, 25, 35].map((x, i) => (
              <circle key={i} cx={x} cy={i === 0 ? 30 : i === 1 ? 10 : i === 2 ? 15 : 5} r="1.5" fill="currentColor" />
            ))}
          </svg>
        </div>
      );

    case "rowan-quill":
      return (
        <div className={base} style={bgStyle}>
          <div className="w-10 h-6 bg-amber-50/95 rounded-md shadow-sm relative">
            <div className="absolute left-2 top-2 w-5 h-[1px] bg-amber-300/80" />
          </div>
          <div className="absolute right-3 bottom-2 w-6 h-6 border-l-2 border-white/90 border-b-2 rounded-bl-full rotate-12" />
        </div>
      );

    case "orion-ashwood":
      return (
        <div className={base} style={bgStyle}>
          {/* tree trunk */}
          <div className="w-2 h-7 bg-emerald-900 rounded-full" />
          {/* canopy */}
          <div className="absolute -top-1 w-10 h-10 bg-emerald-300/90 rounded-full" />
          {/* owl */}
          <div className="absolute right-5 bottom-5 w-4 h-5 bg-amber-100 rounded-full flex flex-col items-center justify-center">
            <div className="flex gap-[2px] mb-[1px]">
              <span className="w-1 h-1 rounded-full bg-amber-700" />
              <span className="w-1 h-1 rounded-full bg-amber-700" />
            </div>
            <div className="w-2 h-[2px] bg-amber-700/80 rounded-full" />
          </div>
        </div>
      );

    case "lira-moontear":
      return (
        <div className={base} style={bgStyle}>
          <div className="w-9 h-9 bg-white/15 rounded-full border border-white/30" />
          <div className="absolute left-7 top-3 w-6 h-6 border-2 border-purple-100 rounded-full border-r-transparent border-b-transparent rotate-12" />
        </div>
      );

    case "fen-willowfrost":
      return (
        <div className={base} style={bgStyle}>
          <div className="w-10 h-10 bg-sky-100/70 rounded-full blur-[1px]" />
          <div className="absolute w-12 h-12 border border-sky-200/70 rounded-full animate-pulse" />
          <div className="absolute bottom-2 w-5 h-1 bg-sky-50/90 rounded-full" />
        </div>
      );

    case "kasai-emberbright":
      return (
        <div className={base} style={bgStyle}>
          <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center">
            <div className="w-4 h-5 bg-orange-500 rounded-full rotate-12 shadow-lg shadow-orange-900/60" />
          </div>
          <div className="absolute -bottom-1 w-10 h-2 bg-orange-200/60 rounded-full blur-[2px]" />
        </div>
      );

    case "selene-whisperwell":
      return (
        <div className={base} style={bgStyle}>
          <div className="w-11 h-11 bg-purple-200/30 rounded-full" />
          <div className="absolute bottom-2 flex gap-1">
            <div className="w-2 h-2 bg-pink-200 rounded-full" />
            <div className="w-2 h-2 bg-pink-100 rounded-full" />
            <div className="w-2 h-2 bg-pink-300 rounded-full" />
          </div>
        </div>
      );

    case "aero-finch":
      return (
        <div className={base} style={bgStyle}>
          <div className="w-10 h-10 border-2 border-sky-100/80 rounded-full" />
          <div className="absolute right-1 top-1 w-8 h-3 bg-sky-100/80 rounded-full blur-[1px]" />
        </div>
      );

    case "nova-lumen":
      return (
        <div className={base} style={bgStyle}>
          <div className="w-10 h-10 bg-black/40 rounded-full border border-purple-100/60 relative">
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-fuchsia-400/70 to-indigo-400/70 blur-[2px]" />
          </div>
          <div className="absolute w-2 h-2 bg-white/90 rounded-full top-3 left-5 animate-ping" />
          <div className="absolute w-1.5 h-1.5 bg-white/80 rounded-full bottom-4 right-5" />
        </div>
      );

    case "thistle-and-pip":
      return (
        <div className={base} style={bgStyle}>
          {/* mushroom */}
          <div className="w-7 h-6 bg-rose-300 rounded-t-full relative">
            <div className="absolute left-1 top-1 w-1.5 h-1.5 bg-rose-100 rounded-full" />
            <div className="absolute right-1 top-2 w-1.5 h-1.5 bg-rose-100 rounded-full" />
          </div>
          <div className="w-2 h-4 bg-amber-50 rounded-b-full" />
        </div>
      );

    case "solace-familiar":
    default:
      return (
        <div className={base} style={bgStyle}>
          <div className="w-9 h-9 bg-purple-100/90 rounded-full flex flex-col items-center justify-center animate-pulse">
            <div className="flex gap-1 mb-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-700/90" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-700/90" />
            </div>
            <div className="w-4 h-1 rounded-full bg-purple-700/80" />
          </div>
        </div>
      );
  }
}
