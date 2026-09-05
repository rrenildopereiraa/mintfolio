/**
 * Everything about you, and the first file to edit. Projects, experience and
 * the CV live in `content/` and `cv.config.ts`.
 */
export const site = {
	/** Used as the author name and as the wordmark in the header. */
	name: "Abigail Chandler",

	/**
	 * No trailing slash. Set this before deploying: the links in your feed,
	 * sitemap and social cards are absolute and built from it.
	 */
	url: "https://mintfolio.renildo.dev",

	/** Shown under your name, and published as your job title. */
	role: "Product engineer",

	location: "Rotterdam, Netherlands",

	email: "hello@abigailchandler.dev",

	/** The browser tab, and the default social card title. */
	title: "Abigail Chandler",

	/**
	 * One or two sentences, used wherever a page doesn't supply its own
	 * description.
	 */
	description:
		"Product engineer building developer tools, design systems, and the unglamorous infrastructure underneath them.",

	/**
	 * The headline, in pieces so the accent can be tinted on the page and drawn
	 * the same way on the social card.
	 */
	headline: {
		greeting: "Hey there.",
		intro: "I'm",
		accent: "Abigail",
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
	 * Behind the address bar on a phone. Keep it matching `page` in
	 * `yumma.config.mjs`.
	 */
	themeColor: { light: "#fbfdfc", dark: "#07100f" },

	/**
	 * A file in `public/`. No page shows it; it is your `image` in the
	 * structured data. Empty publishes none.
	 */
	avatar: "/avatar.svg",

	/**
	 * Your signature, as an SVG in `public/`. Empty by default; About signs off
	 * with your name either way.
	 */
	signature: "",

	/**
	 * Header links. Each is an anchor on the home page or a route of its own.
	 * Remove one and it disappears; the sections live in `app/page.tsx`.
	 */
	nav: [
		{ label: "Projects", href: "/#projects" },
		{ label: "Writing", href: "/blog" },
		{ label: "About", href: "/#about" },
	],

	/**
	 * Rendered as a sentence at the end of About, and as `sameAs` in the
	 * structured data.
	 */
	socials: [
		{ label: "LinkedIn", href: "https://linkedin.com/in/abigailchandler" },
		{ label: "Email", href: "mailto:hello@abigailchandler.dev" },
	],
};
