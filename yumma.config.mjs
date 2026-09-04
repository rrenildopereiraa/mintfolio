import { defineConfig } from "yummacss";

/**
 * Mintfolio's palette.
 *
 * Every colour is a `{ light, dark }` pair, which Yumma compiles into CSS
 * `light-dark()` and backs with `color-scheme` on the root element. That
 * pairing is the only thing that makes the site themeable — Yumma 3.29 has no
 * `dark:` variant of its own, so a colour written as a stock utility like
 * `c-mint-7` can only ever have one value. Change a pair here and both themes
 * follow; there is no second palette to keep in sync.
 *
 * The names are roles, not hues. `accent` is the one to change for a different
 * identity, and nothing else has to move: the surfaces are almost neutral and
 * only the accent is saturated, which is what keeps a mint theme from reading
 * as a novelty.
 *
 * Every pair below is checked against WCAG AA in both themes — body copy and
 * links at 4.5:1, the marks at 3:1. If you swap the accent, keep it dark
 * enough in light mode to clear 4.5:1 on `surface`: a bright mint looks right
 * on a swatch and is unreadable as 14px type.
 */
export default defineConfig({
	source: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./content/**/*.ts"],

	// The theme toggle puts these on <html> at runtime, so nothing in the
	// source tree mentions them and they would otherwise be stripped.
	safelist: ["cs-l", "cs-d", "cs-ld"],

	theme: {
		colors: {
			/** Links, marks, and anything that should read as "this site". */
			accent: { light: "#0f766e", dark: "#5eead4" },
			/** One step further from the page, for hover. */
			"accent-hover": { light: "#115e59", dark: "#99f6e4" },
			/** A tinted surface: the repository chips, and nothing else so far. */
			"accent-soft": { light: "#d5f0ec", dark: "#10302d" },
			/** Text sitting on `accent`. */
			"on-accent": { light: "#ffffff", dark: "#04110f" },

			/** Hairline rules and dividers. */
			border: { light: "#dde8e5", dark: "#1c302c" },
			/** The same, where it has to hold its own next to text. */
			"border-strong": { light: "#c2d6d1", dark: "#294843" },

			/** The page itself. */
			page: { light: "#fbfdfc", dark: "#07100f" },
			/** Anything lifted off it: the nav pill, the section discs. */
			surface: { light: "#ffffff", dark: "#0c1817" },
			/** One step in from `surface`, for quiet fills. */
			"surface-2": { light: "#f1f7f5", dark: "#11201e" },

			/** Body copy and headings. */
			text: { light: "#0d1b19", dark: "#e4f1ee" },
			/** Secondary copy: descriptions, dates, labels. */
			"text-dim": { light: "#5a706b", dark: "#8ba7a1" },
		},
	},
});
