/**
 * The Tech stack section.
 *
 * Grouped, because a flat wall of thirty names tells a reader nothing. Keep
 * each group to five or six and the section stays scannable.
 *
 * List what you actually reach for. A stack that claims everything reads as
 * a stack that claims nothing, and the one thing a reader can verify in ten
 * seconds is whether your site uses what you say it does.
 */
export type StackGroup = {
	title: string;
	items: string[];
};

export const stack: StackGroup[] = [
	{
		title: "Language",
		items: ["TypeScript", "Python", "SQL"],
	},
	{
		title: "Frontend",
		items: ["React", "Next.js", "Astro", "Yumma CSS", "Base UI"],
	},
	{
		title: "Data",
		items: ["PostgreSQL", "Neon", "Supabase", "Drizzle"],
	},
	{
		title: "Tooling",
		items: ["Vite", "pnpm", "Turborepo", "Playwright", "Biome"],
	},
];
