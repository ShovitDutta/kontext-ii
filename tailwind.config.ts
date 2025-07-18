import type { Config } from "tailwindcss";
const config: Config = {
    plugins: [],
    darkMode: ["class"],
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            keyframes: {
                pulse: { "0%, 100%": { opacity: "1" }, "50%": { opacity: ".5" } },
                "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
                "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
            },
            borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
            animation: { "accordion-down": "accordion-down 0.2s ease-out", "accordion-up": "accordion-up 0.2s ease-out", pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" },
            colors: {
                ring: "hsl(var(--ring))",
                input: "hsl(var(--input))",
                border: "hsl(var(--border))",
                foreground: "hsl(var(--foreground))",
                background: "hsl(var(--background))",
                card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
                muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
                accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
                primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
                popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
                secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
                destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
                chart: { "1": "hsl(var(--chart-1))", "2": "hsl(var(--chart-2))", "3": "hsl(var(--chart-3))", "4": "hsl(var(--chart-4))", "5": "hsl(var(--chart-5))" },
                sidebar: {
                    ring: "hsl(var(--sidebar-ring))",
                    border: "hsl(var(--sidebar-border))",
                    accent: "hsl(var(--sidebar-accent))",
                    primary: "hsl(var(--sidebar-primary))",
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                },
            },
        },
    },
};
export default config;
