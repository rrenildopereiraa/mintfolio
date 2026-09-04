/**
 * The colours Yumma cannot express as a class.
 *
 * Almost everything on the site is a `c-*` / `bg-*` / `bc-*` utility built from
 * the pairs in `yumma.config.mjs`. A few things are not colours in a property
 * Yumma has a utility for — gradient stops, box-shadow tints, an SVG `fill` —
 * and those live here so there is exactly one other place to look, rather than
 * a hex buried in a `style` prop in six components.
 *
 * They are still themed: `light-dark()` is a CSS colour function, so it works
 * anywhere a colour is valid, including inside a gradient or a shadow. It reads
 * the `color-scheme` the theme toggle sets, which is the same switch the
 * utilities follow — so these and the classes can never disagree.
 *
 * If you change the accent in `yumma.config.mjs`, change the tinted values
 * here to match.
 */

/** `light-dark(a, b)`, for use in any inline style. */
export function lightDark(light: string, dark: string) {
	return `light-dark(${light}, ${dark})`;
}

export const COLOR = {
	/**
	 * `surface` and `border` again, for the two SVG paths that draw the preview
	 * card's arrow. A path's fill is not a property Yumma has a class for, so
	 * these have to mirror `yumma.config.mjs` by hand. They are the only pair
	 * here that duplicates a token; change them together.
	 */
	surface: lightDark("#ffffff", "#0c1817"),
	border: lightDark("#dde8e5", "#1c302c"),

	/** The run of squares in a section heading. */
	sectionRule: lightDark("#bfe6d8", "#1f4a44"),
	/** The dotted leader on a project row, and the signature line. */
	leader: lightDark("#cbd3d1", "#31413e"),
	/** Under the nav pill and the section discs. */
	lift: lightDark("rgba(13, 27, 25, 0.05)", "rgba(0, 0, 0, 0.4)"),
	/** Under the nav pill, the wider of its two shadows. */
	liftWide: lightDark("rgba(13, 27, 25, 0.3)", "rgba(0, 0, 0, 0.55)"),
	/** Under the preview card, which floats higher than anything else. */
	popup: lightDark("rgba(13, 27, 25, 0.32)", "rgba(0, 0, 0, 0.66)"),
	/** The ruled grid behind the hero: the tint, then the lines. */
	gridWash: lightDark("rgba(13, 148, 136, 0.07)", "rgba(94, 234, 212, 0.06)"),
	gridLine: lightDark("rgba(13, 148, 136, 0.13)", "rgba(94, 234, 212, 0.09)"),
} as const;

/**
 * The contribution heatmap: empty, then four steps toward the accent.
 *
 * A ramp rather than one colour with five opacities, because opacity over a
 * tinted page shifts hue as it fades and the low steps end up looking grey.
 */
export const CONTRIBUTION_LEVELS = [
	lightDark("#e8efed", "#15211f"),
	lightDark("#b3ddd5", "#164b42"),
	lightDark("#68bcae", "#1f7a6c"),
	lightDark("#199e8c", "#33b6a1"),
	lightDark("#0f766e", "#5eead4"),
];
