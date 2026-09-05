/**
 * The three typefaces, as inline styles.
 *
 * The `theme` block in Yumma CSS takes colors and screens, not families, so
 * `ff-d` and `ff-m`
 * are fixed stacks that can't be pointed at Fontsource's faces. Setting the
 * family where it is actually wanted costs a `style` prop and no stylesheet.
 *
 * Only one of the three has any character, and it is used for one word. The
 * other two are chosen to stay out of its way: a neutral sans that reads
 * cleanly at 14px, and a mono with enough warmth to feel typed rather than
 * compiled.
 *
 * To change the typeface, swap the imports in `app/globals.css` and the
 * families here.
 */

/**
 * Geist, on <body>, inherited by everything, which is why no heading names a
 * font. It is deliberately quiet: the page's voice comes from the serif and
 * the mono, and a display sans competing with both is what makes a portfolio
 * look busy.
 */
export const SANS = '"Geist Variable", system-ui, sans-serif';

/**
 * The one art-directed face on the site: an italic serif, used for a single
 * word in the headline and nowhere else. Only the 400 italic is loaded, which
 * is the only cut that gets used.
 */
export const SERIF = '"Instrument Serif", Georgia, serif';

/** Ready to spread: `style={SERIF_ITALIC}`. */
export const SERIF_ITALIC = { fontFamily: SERIF, fontStyle: "italic" } as const;

/**
 * IBM Plex Mono, opt-in, for the small technical labels: dates, tags,
 * counters, the section numbers. A mono drawn for text rather than for code:
 * the slab-ish terminals give the labels a typed, ribbon-on-paper feel that a
 * code-editor mono flattens out.
 */
export const MONO = '"IBM Plex Mono", ui-monospace, monospace';

/** Ready to spread: `style={MONO_STYLE}`. */
export const MONO_STYLE = { fontFamily: MONO } as const;
