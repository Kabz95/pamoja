
export type AvatarId =
  | "elia-candlemage"
  | "mira-starling"
  | "rowan-quill"
  | "orion-ashwood"
  | "lira-moontear"
  | "fen-willowfrost"
  | "kasai-emberbright"
  | "selene-whisperwell"
  | "aero-finch"
  | "nova-lumen"
  | "thistle-and-pip"
  | "solace-familiar";

export type AvatarConfig = {
  id: AvatarId;
  name: string;
  tagline: string;
  // rough visual hints you can also use when you create final art
  vibe: "cozy" | "cosmic" | "forest" | "scholar" | "fire" | "water" | "dreamy" | "playful";
  accentFrom: string;
  accentTo: string;
};

export const AVATAR_CONFIG: AvatarConfig[] = [
  {
    id: "elia-candlemage",
    name: "Elia the Candle-Mage",
    tagline: "Soft light, steady warmth.",
    vibe: "cozy",
    accentFrom: "#f97316",
    accentTo: "#fb7185",
  },
  {
    id: "mira-starling",
    name: "Mira Starling",
    tagline: "Star freckles & open books.",
    vibe: "scholar",
    accentFrom: "#a855f7",
    accentTo: "#22c1c3",
  },
  {
    id: "rowan-quill",
    name: "Rowan Quill",
    tagline: "Quiet writer of brave spells.",
    vibe: "scholar",
    accentFrom: "#6366f1",
    accentTo: "#8b5cf6",
  },
  {
    id: "orion-ashwood",
    name: "Orion Ashwood",
    tagline: "Forest owl & steady roots.",
    vibe: "forest",
    accentFrom: "#16a34a",
    accentTo: "#22c55e",
  },
  {
    id: "lira-moontear",
    name: "Lira Moontear",
    tagline: "Dreamy moonlit seer.",
    vibe: "dreamy",
    accentFrom: "#6366f1",
    accentTo: "#ec4899",
  },
  {
    id: "fen-willowfrost",
    name: "Fen Willowfrost",
    tagline: "Mist, snow & quiet calm.",
    vibe: "water",
    accentFrom: "#38bdf8",
    accentTo: "#4f46e5",
  },
  {
    id: "kasai-emberbright",
    name: "Kasai Emberbright",
    tagline: "Tiny fire sprite, big heart.",
    vibe: "fire",
    accentFrom: "#f97316",
    accentTo: "#ef4444",
  },
  {
    id: "selene-whisperwell",
    name: "Selene Whisperwell",
    tagline: "Healing light & lavender blooms.",
    vibe: "dreamy",
    accentFrom: "#a855f7",
    accentTo: "#ec4899",
  },
  {
    id: "aero-finch",
    name: "Aero Finch",
    tagline: "Sky-runner with hopeful winds.",
    vibe: "water",
    accentFrom: "#22c1c3",
    accentTo: "#6366f1",
  },
  {
    id: "nova-lumen",
    name: "Nova Lumen",
    tagline: "Nebulas, stars & gentle cosmos.",
    vibe: "cosmic",
    accentFrom: "#8b5cf6",
    accentTo: "#ec4899",
  },
  {
    id: "thistle-and-pip",
    name: "Thistle & Pip",
    tagline: "Forest sprite & mushroom buddy.",
    vibe: "playful",
    accentFrom: "#22c55e",
    accentTo: "#a3e635",
  },
  {
    id: "solace-familiar",
    name: "Solace",
    tagline: "Soft spirit-cat of comfort.",
    vibe: "cozy",
    accentFrom: "#6366f1",
    accentTo: "#f9a8d4",
  },
];

export const DEFAULT_AVATAR_ID: AvatarId = "solace-familiar";

export function getAvatarById(id?: string | null): AvatarConfig {
  const found = AVATAR_CONFIG.find((a) => a.id === id);
  return found ?? AVATAR_CONFIG.find((a) => a.id === DEFAULT_AVATAR_ID)!;
}
