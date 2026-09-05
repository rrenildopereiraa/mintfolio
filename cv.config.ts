import type { Cv } from "./src/lib/cv.ts";

/**
 * Your CV, as data. `pnpm build` renders it to /cv.pdf, laid out to parse
 * cleanly in an applicant tracking system.
 */
export const cv: Cv = {
	person: {
		name: "Abigail Chandler",
		role: "Product engineer",
		location: "Rotterdam, Netherlands",
		email: "hello@abigailchandler.dev",

		// Read from the environment, never written down. See the README.
		phone: process.env.CV_PHONE,
		linkedin: "https://linkedin.com/in/abigailchandler",
		website: "https://abigailchandler.dev",
	},

	summary:
		"Product engineer with six years of experience building developer-facing tools, design systems and the infrastructure underneath them. Works mainly in TypeScript and Go. Rebuilt a monorepo build pipeline that cut CI from eleven minutes to under three, and maintains several small open source libraries. Interested in the parts of a product that only show up in the second week of using it.",

	experience: [
		{
			jobTitle: "Senior Product Engineer",
			company: "Northwind Labs",
			companyUrl: "https://example.com",
			location: "Rotterdam, Netherlands",
			startDate: "2023",
			endDate: "Present",
			description: [
				"Lead the tooling team supporting six internal product teams, owning the build pipeline, the component library and the release process.",
				"Rebuilt the design token pipeline so design and code read from one source, removing a class of drift that had caused three visual regressions a quarter.",
				"Cut continuous integration from eleven minutes to under three by making the monorepo cache reliable enough to trust.",
				"Wrote the migration guides and codemods for two major internal releases, so adopting teams could upgrade without a meeting.",
			],
		},
		{
			jobTitle: "Frontend Engineer",
			company: "Cobalt Systems",
			companyUrl: "https://example.com",
			location: "Amsterdam, Netherlands",
			startDate: "2021",
			endDate: "2023",
			description: [
				"Built and shipped the customer-facing analytics dashboard, from the component library upwards.",
				"Introduced visual regression testing and accessibility checks into review, cutting reported UI defects by roughly half.",
				"Mentored two junior engineers through their first year, including their first on-call rotations.",
			],
		},
		{
			jobTitle: "Developer",
			company: "Studio Marrow",
			location: "Utrecht, Netherlands",
			startDate: "2019",
			endDate: "2021",
			description: [
				"Delivered around twenty client sites, working directly with designers and clients from brief to launch.",
				"Standardised the studio's project setup, which took a new build from two days to an afternoon.",
			],
		},
	],

	education: [
		{
			degree: "BSc Computer Science",
			institution: "Delft University of Technology",
			year: "2019",
		},
	],

	skills: [
		"TypeScript",
		"JavaScript",
		"Go",
		"React",
		"Next.js",
		"Node.js",
		"PostgreSQL",
		"Design Systems",
		"Accessibility",
		"CI/CD",
		"Testing",
		"Developer Tooling",
	],

	languages: [
		{ name: "English", level: "Fluent" },
		{ name: "Dutch", level: "Native" },
		{ name: "Spanish", level: "Conversational" },
	],

	projects: [
		{
			name: "Halcyon",
			description:
				"A task runner for monorepos with a cache you can actually trust.",
			url: "https://github.com/abigailchandler/halcyon",
		},
		{
			name: "Tidepool",
			description:
				"A local-first sync engine for React apps that have to work offline.",
			url: "https://github.com/abigailchandler/tidepool",
		},
		{
			name: "Cartograph",
			description: "Generates typed API clients from OpenAPI documents.",
			url: "https://github.com/abigailchandler/cartograph",
		},
	],

	fileName: "Abigail-Chandler-CV",
};
