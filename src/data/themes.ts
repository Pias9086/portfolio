import { CustomThemeColors } from '../types';

export const THEMES: CustomThemeColors[] = [
  {
    id: 'artistic-flair',
    name: 'Artistic Flair (Premium Dark)',
    bg: 'bg-[#0A0A0A]',
    cardBg: 'bg-[#121212]',
    text: 'text-[#F0F0F0]',
    textMuted: 'text-[#AAA]',
    accent: 'text-[#D4FF00]', // Neon Lime
    accentHover: 'hover:text-[#D4FF00]',
    borderClass: 'border-[#222]',
    fontFamily: 'serif',
    darkTheme: true,
  },
  {
    id: 'cyberpunk-dark',
    name: 'Cyber Mono (Dark)',
    bg: 'bg-[#0f1115]',
    cardBg: 'bg-[#181a20]',
    text: 'text-[#e2e8f0]',
    textMuted: 'text-[#94a3b8]',
    accent: 'text-[#10b981]', // Emerald / Neon Green accent
    accentHover: 'hover:text-[#34d399]',
    borderClass: 'border-[#334155]',
    fontFamily: 'mono',
    darkTheme: true,
  },
  {
    id: 'minimalist-studio',
    name: 'Warm Studio (Light)',
    bg: 'bg-[#fafaf9]', // Warm cream/stone
    cardBg: 'bg-[#ffffff]',
    text: 'text-[#292524]', // Warm dark charcoal
    textMuted: 'text-[#78716c]',
    accent: 'text-[#0ea5e9]', // Tech blue
    accentHover: 'hover:text-[#38bdf8]',
    borderClass: 'border-[#e7e5e4]',
    fontFamily: 'sans',
    darkTheme: false,
  },
  {
    id: 'editorial-serif',
    name: 'Editorial Serif (Light)',
    bg: 'bg-[#fcfbf7]', // Premium paper white
    cardBg: 'bg-[#ffffff]',
    text: 'text-[#1c1917]', // Intense stone
    textMuted: 'text-[#57534e]',
    accent: 'text-[#b91c1c]', // Crimson contrast accent
    accentHover: 'hover:text-[#991b1b]',
    borderClass: 'border-[#ebeae5]',
    fontFamily: 'serif',
    darkTheme: false,
  },
  {
    id: 'nordic-forest',
    name: 'Nordic Forest (Dark)',
    bg: 'bg-[#0b1312]', // Very deep forest charcoal
    cardBg: 'bg-[#121f1d]',
    text: 'text-[#eceff1]',
    textMuted: 'text-[#8ba29e]',
    accent: 'text-[#2dd4bf]', // Mint accent
    accentHover: 'hover:text-[#5eead4]',
    borderClass: 'border-[#1e3430]',
    fontFamily: 'sans',
    darkTheme: true,
  },
  {
    id: 'vibrant-indigo',
    name: 'Midnight Indigo (Dark)',
    bg: 'bg-[#0b0f19]', // Deep space blue
    cardBg: 'bg-[#111827]', // Slate 900
    text: 'text-[#f3f4f6]', // Gray 100
    textMuted: 'text-[#9ca3af]', // Gray 400
    accent: 'text-[#6366f1]', // Indigo accent
    accentHover: 'hover:text-[#818cf8]',
    borderClass: 'border-[#1f2937]', // Gray 800
    fontFamily: 'sans',
    darkTheme: true,
  },
];
