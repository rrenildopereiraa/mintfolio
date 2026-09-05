import type { ProjectMark } from "../src/components/icons.tsx";

/**
 * The Projects section. Order here is order on the page; `mark` picks a shape
 * from `src/components/icons.tsx`.
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
	/** Shown as marks in the preview card. Names come from `brand-marks.tsx`. */
	stack: string[];
};

export const projects: Project[] = [
	{
		name: "Mend Labs",
		description:
			"The design system three product teams actually share. Tokens, docs and a release process that stops everyone forking the same button.",
		summary:
			"One source for color, type and spacing, with a changelog people read because breaking changes arrive with a codemod.",
		href: "https://github.com/abigailchandler/mend-labs",
		label: "github.com/mend-labs",
		mark: "circle",
		period: "Ongoing",
		stack: ["TypeScript", "Figma", "Storybook"],
	},
	{
		name: "Mend UI",
		description:
			"Forty React components built on unstyled primitives. Accessible before it is pretty, and themeable without a prop for every pixel.",
		summary:
			"Keyboard behavior and focus handling come from the primitives underneath, so the components only have to get the styling right.",
		href: "https://github.com/abigailchandler/mend-ui",
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
			"Every icon is optimized at build time and exported both ways, because half the teams using them are not running a bundler.",
		href: "https://github.com/abigailchandler/mend-icons",
		label: "github.com/mend-icons",
		mark: "triangle",
		period: "2023",
		stack: ["TypeScript", "React", "Vite"],
	},
];
