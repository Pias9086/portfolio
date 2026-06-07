export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'other';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  bullets?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  portfolio?: string;
  dribbble?: string;
}

export interface CustomThemeColors {
  id: string;
  name: string;
  bg: string;
  cardBg: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  borderClass: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  darkTheme: boolean;
}

export interface PortfolioConfig {
  name: string;
  title: string;
  tagline: string;
  aboutMini: string;
  aboutFull: string;
  avatarUrl: string; // Emoji, SVG, or URL
  avatarType: 'emoji' | 'url';
  resumeUrl?: string;
  themeId: string;
  socials: SocialLinks;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}
