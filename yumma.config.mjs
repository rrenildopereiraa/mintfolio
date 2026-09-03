import { defineConfig } from "yummacss";

/**
 * Mintfolio uses Yumma's default palette.
 *
 * There is deliberately no `theme.colors` block. Every colour on the site is a
 * stock Yumma utility, so a class you see in the markup is one you can look up
 * in the docs and reuse unchanged. The accent is `mint`, which Yumma ships as a
 * first-class hue, and the neutrals are `zinc` and `slate`.
 *
 * The trade-off: paired `{ light, dark }` theme colours are what compile to
 * `light-dark()`, and Yumma 3.29 has no dark-mode variant of its own, so the
 * default palette means a light-only site. See the README.
 */
export default defineConfig({
	source: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./content/**/*.ts"],
});
