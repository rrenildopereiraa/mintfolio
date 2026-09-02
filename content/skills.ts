/**
 * The Skills section on the home page.
 *
 * Grouped rather than one long list, because a wall of forty tags tells a
 * reader nothing. Three or four groups of five or six reads best. Delete a
 * group and it disappears from the page.
 */

export type SkillGroup = {
	title: string;
	items: string[];
};

export const skills: SkillGroup[] = [
	{
		title: "Languages",
		items: ["TypeScript", "JavaScript", "Go", "SQL", "Python"],
	},
	{
		title: "Frontend",
		items: ["React", "Next.js", "Yumma CSS", "Base UI", "Web Components"],
	},
	{
		title: "Backend",
		items: ["Node.js", "PostgreSQL", "Redis", "tRPC", "REST"],
	},
	{
		title: "Tooling",
		items: ["Turborepo", "Vite", "Playwright", "GitHub Actions", "Docker"],
	},
];
