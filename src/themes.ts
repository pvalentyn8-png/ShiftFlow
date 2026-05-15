export type ThemeName = "deep-night" | "midnight" | "forest" | "sunset" | "light";

interface ThemeColors {
  bg: string;
  card: string;
  text: string;
  textMuted: string;
  accent: string;
  accentMuted: string;
  accentText: string;
  border: string;
  glow: string;
  secondary: string;
  secondaryBg: string;
  secondaryBorder: string;
  indicator: string;
  btnIcon: string;
}

export const THEMES: Record<ThemeName, ThemeColors> = {
  "deep-night": { bg: "bg-[#0a0a1a]", card: "bg-white/[0.03]", text: "text-[#e8e0f0]", textMuted: "text-purple-400/60", accent: "purple-600", accentMuted: "bg-purple-500/10", accentText: "text-purple-400", border: "border-white/10", glow: "shadow-purple-900/40", secondary: "amber-500", secondaryBg: "bg-amber-500/10", secondaryBorder: "border-amber-500/30", indicator: "bg-purple-500", btnIcon: "text-purple-400" },
  "midnight": { bg: "bg-[#020617]", card: "bg-sky-950/20", text: "text-sky-50", textMuted: "text-sky-400/60", accent: "sky-600", accentMuted: "bg-sky-500/10", accentText: "text-sky-400", border: "border-sky-500/20", glow: "shadow-sky-900/40", secondary: "emerald-500", secondaryBg: "bg-emerald-500/10", secondaryBorder: "border-emerald-500/30", indicator: "bg-sky-500", btnIcon: "text-sky-400" },
  "forest": { bg: "bg-[#051109]", card: "bg-emerald-950/20", text: "text-emerald-50", textMuted: "text-emerald-400/60", accent: "emerald-600", accentMuted: "bg-emerald-500/10", accentText: "text-emerald-400", border: "border-emerald-500/20", glow: "shadow-emerald-900/40", secondary: "lime-500", secondaryBg: "bg-lime-500/10", secondaryBorder: "border-lime-500/30", indicator: "bg-emerald-500", btnIcon: "text-emerald-400" },
  "sunset": { bg: "bg-[#1a0a05]", card: "bg-orange-950/20", text: "text-orange-50", textMuted: "text-orange-300/60", accent: "orange-600", accentMuted: "bg-orange-500/10", accentText: "text-orange-400", border: "border-orange-500/20", glow: "shadow-orange-900/40", secondary: "rose-500", secondaryBg: "bg-rose-500/10", secondaryBorder: "border-rose-500/30", indicator: "bg-orange-500", btnIcon: "text-orange-400" },
  "light": { bg: "bg-[#f8fafc]", card: "bg-white", text: "text-slate-900", textMuted: "text-slate-500", accent: "blue-600", accentMuted: "bg-blue-500/10", accentText: "text-blue-600", border: "border-slate-200", glow: "shadow-slate-200", secondary: "violet-600", secondaryBg: "bg-violet-500/10", secondaryBorder: "border-violet-500/30", indicator: "bg-blue-500", btnIcon: "text-blue-600" }
};
