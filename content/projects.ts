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
		name: "Mend Labs",
		description:
			"The design system three product teams actually share. Tokens, docs and a release process that stops everyone forking the same button.",
		summary:
			"One source for colour, type and spacing, with a changelog people read because breaking changes arrive with a codemod.",
		href: "https://github.com/evacalderon/mend-labs",
		label: "github.com/mend-labs",
		mark: "circle",
		period: "Ongoing",
		stack: ["TypeScript", "Style Dictionary", "Docs"],
	},
	{
		name: "Mend UI",
		description:
			"Forty React components built on unstyled primitives. Accessible before it is pretty, and themeable without a prop for every pixel.",
		summary:
			"Keyboard behaviour and focus handling come from the primitives underneath, so the components only have to get the styling right.",
		href: "https://github.com/evacalderon/mend-ui",
		label: "github.com/mend-ui",
		mark: "square",
		period: "2024",
		stack: ["React", "TypeScript", "Base UI"],
	},
	{
		name: "Mend Icons",
		description:
			"Six hundred icons drawn on one grid, so they sit on a line together. Shipped as plain SVGs and as a package that tree-shakes.",
		summary:
			"Every icon is optimised at build time and exported both ways, because half the teams using them are not running a bundler.",
		href: "https://github.com/evacalderon/mend-icons",
		label: "github.com/mend-icons",
		mark: "triangle",
		period: "2023",
		stack: ["SVG", "TypeScript", "SVGO"],
	},
];
