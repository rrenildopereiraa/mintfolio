import type { ProjectMark } from "../src/components/icons.tsx";

/**
 * The Projects section.
 *
 * Order is the order on the page. Each project carries a `mark`, which is the
 * small shape shown beside its name and inside its preview card. Three plain
 * shapes ship with the template; replace them with your own SVG in
 * `src/components/icons.tsx` and nothing else has to change.
 */
export type Project = {
	name: string;
	/** One sentence. What it is, not how it was built. */
	description: string;
	/** Shown in the preview card. A little more room than the sentence above. */
	summary: string;
	/** Where the row links. Omit for work you cannot link to. */
	href?: string;
	/** Shown as the chip on the row, e.g. "github.com/you/thing". */
	label?: string;
	/** `circle`, `square` or `triangle`. */
	mark: ProjectMark;
	/** Free text: "2024", "2023 – 2024", "Ongoing". */
	period: string;
	/** A handful of tags, shown in the preview card. */
	stack: string[];
};

export const projects: Project[] = [
	{
		name: "Project A",
		description:
			"A task runner for monorepos that keeps its cache honest. Rebuilds only what actually changed, and tells you why when it disagrees with you.",
		summary:
			"Cuts a cold monorepo build from eleven minutes to under three, and explains every cache decision it makes.",
		href: "https://github.com/iriscalderon/project-a",
		label: "github.com/project-a",
		mark: "circle",
		period: "Ongoing",
		stack: ["Go", "TypeScript", "CLI"],
	},
	{
		name: "Project B",
		description:
			"A local-first sync engine for React apps that have to survive a train tunnel. Conflict resolution you can read and reason about.",
		summary:
			"Offline-first storage with a conflict model you can actually explain to the rest of the team.",
		href: "https://github.com/iriscalderon/project-b",
		label: "github.com/project-b",
		mark: "square",
		period: "2024",
		stack: ["TypeScript", "IndexedDB", "CRDT"],
	},
	{
		name: "Project C",
		description:
			"Turns an OpenAPI document into a typed client that reads like it was written by hand.",
		summary:
			"Generates clients nobody wants to rewrite, with types that survive a schema change.",
		href: "https://github.com/iriscalderon/project-c",
		label: "github.com/project-c",
		mark: "triangle",
		period: "2023",
		stack: ["TypeScript", "Codegen"],
	},
];
