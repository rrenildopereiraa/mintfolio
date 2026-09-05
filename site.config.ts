/**
 * Everything about you.
 *
 * This is the first file to edit after cloning Mintfolio. It feeds the header,
 * the footer, the metadata, the social cards, the RSS feed, the sitemap and
 * the structured data, so a name changed here changes everywhere.
 *
 * Your projects, experience and CV live in their own files:
 *   content/projects.ts
 *   content/experience.ts
 *   cv.config.ts
 */
export const site = {
	/** Used as the author name and as the wordmark in the header. */
	name: "Eva Calderon",

	/**
	 * No trailing slash. Set this before deploying: the links in your feed,
	 * sitemap and social cards are absolute and built from it.
	 */
	url: "https://evacalderon.dev",

	/** Shown under your name, and published as your job title. */
	role: "Product engineer",

	location: "Rotterdam, Netherlands",

	email: "hello@evacalderon.dev",

	/** The browser tab, and the default social card title. */
	title: "Eva Calderon",

	/**
	 * One or two sentences, used wherever a page doesn't supply its own
	 * description.
	 */
	description:
		"Product engineer building developer tools, design systems, and the unglamorous infrastructure underneath them.",

	/**
	 * The home page headline, in pieces.
	 *
	 * It renders as two lines: the greeting, then the introduction with your
	 * name set in the serif italic. Kept as pieces rather than one string so
	 * the accent can be tinted on the page and drawn the same way on the
	 * social card, which never sees the page's markup.
	 */
	headline: {
		greeting: "Hey there.",
		intro: "I'm",
		accent: "Eva",
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
	 * What mobile browsers paint behind the address bar, one value per theme.
	 * Keep them matching the `page` pair in `yumma.config.mjs`, or the strip
	 * above the page will be a shade off it.
	 */
	themeColor: { light: "#fbfdfc", dark: "#07100f" },

	/**
	 * A file in `public/`. No page shows it: it is published as your `image` in
	 * the structured data, where search results and link previews look for it.
	 * Set it to an empty string to publish none.
	 */
	avatar: "/avatar.svg",

	/**
	 * Your signature, as a file in `public/`. Empty by default: the About
	 * section draws the dotted line and your name under it either way, and a
	 * signature that isn't yours is worse than no signature at all.
	 *
	 * An SVG of your own handwriting works best — it stays crisp at any size.
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
	 * Rendered as a sentence at the end of the About section, each name with
	 * its mark beside it, and published as `sameAs` in your structured data,
	 * where `mailto:` links are skipped automatically.
	 */
	socials: [
		{ label: "GitHub", href: "https://github.com/evacalderon" },
		{ label: "LinkedIn", href: "https://linkedin.com/in/evacalderon" },
		{ label: "X", href: "https://x.com/evacalderon" },
		{ label: "Email", href: "mailto:hello@evacalderon.dev" },
	],
};
