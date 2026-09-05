/**
 * The Experience section, newest first. Separate from `cv.config.ts`: the page
 * wants one line per role, the PDF wants bullets.
 */

export type Role = {
	title: string;
	company: string;
	href?: string;
	/** Free text, so "2024" and "March 2024" are both fine. */
	start: string;
	/** Use "Present" for a current role. */
	end: string;
	/** One or two sentences on what you actually did there. */
	summary: string;
};

export const experience: Role[] = [
	{
		title: "Senior Product Engineer",
		company: "Northwind Labs",
		href: "https://example.com",
		start: "2023",
		end: "Present",
		summary:
			"Lead the tooling team behind six internal products. Rebuilt the design token pipeline, cut the CI build from eleven minutes to under three, and wrote the migration guides nobody wanted to write.",
	},
	{
		title: "Frontend Engineer",
		company: "Cobalt Systems",
		href: "https://example.com",
		start: "2021",
		end: "2023",
		summary:
			"Shipped the customer-facing dashboard and the component library under it. Introduced visual regression tests after the third accidental redesign.",
	},
	{
		title: "Developer",
		company: "Studio Marrow",
		start: "2019",
		end: "2021",
		summary:
			"Agency work: twenty-odd sites for clients who all wanted something slightly different. Learned more about browser quirks than I strictly wanted to.",
	},
];
