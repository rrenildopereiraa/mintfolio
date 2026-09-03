/**
 * Everything about you.
 *
 * This is the first file to edit after cloning Mintfolio. It feeds the header,
 * the footer, the metadata, the social cards, the RSS feed, the sitemap and
 * the structured data, so a name changed here changes everywhere.
 *
 * Your projects, experience, skills and CV live in their own files:
 *   content/projects.ts
 *   content/experience.ts
 *   content/skills.ts
 *   cv.config.ts
 */
export const site = {
	/** Used as the author name and as the wordmark in the header. */
	name: "Iris Calderon",

	/**
	 * No trailing slash. Set this before deploying: the links in your feed,
	 * sitemap and social cards are absolute and built from it.
	 */
	url: "https://iriscalderon.dev",

	/** Shown under your name, and published as your job title. */
	role: "Product engineer",

	location: "Rotterdam, Netherlands",

	email: "hello@iriscalderon.dev",

	/** The browser tab, and the default social card title. */
	title: "Iris Calderon",

	/**
	 * One or two sentences, used wherever a page doesn't supply its own
	 * description.
	 */
	description:
		"Product engineer building developer tools, design systems, and the unglamorous infrastructure underneath them.",

	/**
	 * The home page headline, in pieces, so the accent phrase can be tinted on
	 * the page and drawn the same way on the social card, which never sees the
	 * page's markup.
	 */
	headline: {
		lead: "I build tools that get",
		accent: "out of the way",
		tail: ".",
	},

	/** The paragraph under the headline. Two or three lines reads best. */
	intro:
		"Six years shipping developer-facing products, mostly in TypeScript. I care about the parts nobody demos: build times, error messages, and the second week of using something.",

	/** The About section. Two short paragraphs. */
	about: [
		"I started out doing frontend for agencies, which is a fast way to learn what breaks. These days I work on internal tooling, where the people using it sit two desks away and tell you exactly what is wrong with it.",
		"Outside work I maintain a couple of small open source libraries, ride a very slow bicycle, and am steadily failing to learn the cello.",
	],

	/**
	 * What mobile browsers paint behind the address bar. Keep it matching the
	 * page background.
	 */
	themeColor: "#fbfdfc",

	/**
	 * A file in `public/`, shown in the About section and published as your
	 * avatar. Set it to an empty string to drop the photo entirely.
	 */
	avatar: "/avatar.svg",

	/**
	 * Header links. Each is an anchor on the home page or a route of its own.
	 * Remove one and it disappears; the sections live in `app/page.tsx`.
	 */
	nav: [
		{ label: "Work", href: "/#work" },
		{ label: "Experience", href: "/#experience" },
		{ label: "Blog", href: "/blog" },
	],

	/**
	 * Shown in the contact block and the footer, and published as `sameAs` in
	 * your structured data, where `mailto:` links are skipped automatically.
	 */
	socials: [
		{ label: "GitHub", href: "https://github.com/iriscalderon" },
		{ label: "LinkedIn", href: "https://linkedin.com/in/iriscalderon" },
		{ label: "X", href: "https://x.com/iriscalderon" },
		{ label: "Email", href: "mailto:hello@iriscalderon.dev" },
	],
};
