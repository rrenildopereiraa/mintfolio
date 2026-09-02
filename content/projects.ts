/**
 * The Work section on the home page.
 *
 * Order matters: the list renders top to bottom. Mark the two or three you
 * actually want people to look at as `featured` and they get the wider card.
 * Anything without a `href` renders as a card without a link, which is useful
 * for closed-source work you can still describe.
 */

export type Project = {
	name: string;
	/** One sentence. What it is, not how it was built. */
	description: string;
	/** Where the card links. Omit for work you can't link to. */
	href?: string;
	/** Shown next to the link, e.g. "github.com/you/thing". */
	label?: string;
	/** A handful of tags. Three or four keeps the cards even. */
	stack: string[];
	/** Gives the project a full-width card at the top of the grid. */
	featured?: boolean;
	/** Free text: "2024", "2023 – 2024", "Ongoing". */
	period?: string;
};

export const projects: Project[] = [
	{
		name: "Halcyon",
		description:
			"A task runner for monorepos that keeps its cache honest. Rebuilds only what actually changed, and tells you why when it disagrees with you.",
		href: "https://github.com/iriscalderon/halcyon",
		label: "github.com/iriscalderon/halcyon",
		stack: ["Go", "TypeScript", "CLI"],
		featured: true,
		period: "Ongoing",
	},
	{
		name: "Tidepool",
		description:
			"A local-first sync engine for React apps that have to survive a train tunnel. Conflict resolution you can read and reason about.",
		href: "https://github.com/iriscalderon/tidepool",
		label: "github.com/iriscalderon/tidepool",
		stack: ["TypeScript", "IndexedDB", "CRDT"],
		period: "2024",
	},
	{
		name: "Cartograph",
		description:
			"Turns an OpenAPI document into a typed client that reads like it was written by hand.",
		href: "https://github.com/iriscalderon/cartograph",
		label: "github.com/iriscalderon/cartograph",
		stack: ["TypeScript", "Codegen"],
		period: "2023",
	},
	{
		name: "Reverb",
		description:
			"A 2 kB state machine for multi-step forms, built after the fourth checkout flow went wrong in the same way.",
		href: "https://github.com/iriscalderon/reverb",
		label: "github.com/iriscalderon/reverb",
		stack: ["TypeScript", "React"],
		period: "2023",
	},
	{
		name: "Northwind design system",
		description:
			"The component library and token pipeline behind six internal products. Closed source, but the token format is the interesting part.",
		stack: ["React", "Design tokens", "Storybook"],
		period: "2022 – 2024",
	},
];
