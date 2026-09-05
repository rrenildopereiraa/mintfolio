/**
 * Colors no utility can reach: gradient stops, shadow tints, an SVG `fill`.
 * Still `light-dark()`, so they follow the theme like the classes do.
 */

/** `light-dark(a, b)`, for use in any inline style. */
export function lightDark(light: string, dark: string) {
	return `light-dark(${light}, ${dark})`;
}

export const COLOR = {
	/**
	 * `surface` and `border` again, for the preview card's arrow paths. The only
	 * duplicated tokens here; change them with the config.
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
 * The heatmap ramp. Five colors rather than one at five opacities, which would
 * shift hue over a tinted page.
 */
export const CONTRIBUTION_LEVELS = [
	lightDark("#e8efed", "#15211f"),
	lightDark("#b3ddd5", "#164b42"),
	lightDark("#68bcae", "#1f7a6c"),
	lightDark("#199e8c", "#33b6a1"),
	lightDark("#0f766e", "#5eead4"),
];
