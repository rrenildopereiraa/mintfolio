import { defineConfig } from "yummacss";

/**
 * Mintfolio's palette.
 *
 * Every colour is a `{ light, dark }` pair, which Yumma CSS compiles into
 * `light-dark()` and backs with `color-scheme` on the root element. Change a
 * value here and both themes follow; there is no second palette to keep in
 * sync.
 *
 * `accent` is the one to change for a different identity. The surfaces below
 * are almost neutral and only the accent is saturated, which is what keeps a
 * mint theme from reading as a novelty.
 */
export default defineConfig({
	source: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./content/**/*.ts"],
	safelist: ["cs-l", "cs-d", "cs-ld"],
	theme: {
		colors: {
			accent: { light: "#0d9488", dark: "#5eead4" },
			"accent-dim": { light: "#14b8a6", dark: "#2dd4bf" },
			"accent-soft": { light: "#d9efeb", dark: "#12312d" },
			"on-accent": { light: "#ffffff", dark: "#04110f" },
			border: { light: "#dde8e5", dark: "#1c302c" },
			"border-strong": { light: "#c2d6d1", dark: "#294843" },
			page: { light: "#fbfdfc", dark: "#07100f" },
			surface: { light: "#ffffff", dark: "#0c1817" },
			"surface-2": { light: "#f1f7f5", dark: "#11201e" },
			text: { light: "#0d1b19", dark: "#e4f1ee" },
			"text-dim": { light: "#5a706b", dark: "#8ba7a1" },
		},
	},
});
