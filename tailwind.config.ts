import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'text-electric-indigo',
    'text-emerald-neon',
    'bg-electric-indigo/10',
    'bg-emerald-neon/10',
    'border-electric-indigo/30',
    'border-emerald-neon/30',
    'from-electric-indigo/20',
    'from-emerald-neon/20',
    'bg-electric-indigo/20',
    'bg-emerald-neon/20',
    'border-electric-indigo/40',
    'border-emerald-neon/40',
  ],
  theme: {
    extend: {
      colors: {
        'deep-carbon': '#030712',
        'obsidian-slate': '#0F172A',
        'electric-indigo': '#6366F1',
        'emerald-neon': '#10B981',
        'ghost-white': '#F8FAFC',
        'bento-border': '#1E293B',
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'glow-indigo': '0 0 20px 2px rgba(99, 102, 241, 0.3)',
        'glow-indigo-hover': '0 0 30px 5px rgba(99, 102, 241, 0.5)',
      },
      borderRadius: {
        'bento': '24px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px 2px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 40px 8px rgba(99, 102, 241, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};

export default config;