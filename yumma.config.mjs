import { defineConfig } from "yummacss";

/**
 * Each `{ light, dark }` pair compiles to `light-dark()`, so one class covers
 * both themes. Every pair clears WCAG AA: text 4.5:1, marks 3:1.
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
