/**
 * The two typefaces, as inline styles.
 *
 * Yumma's `theme` takes colors and screens, not families, so `ff-d` and `ff-m`
 * are fixed stacks that can't be pointed at Fontsource's faces. Setting the
 * family where it is actually wanted costs a `style` prop and no stylesheet.
 *
 * `SANS` is set once on <body> and inherited by everything, which is why no
 * heading names a font. `MONO` is opt-in, for the small technical labels that
 * give the design its voice: dates, tags, counters.
 *
 * To change the typeface, swap the imports in `app/globals.css` and the two
 * families here.
 */
export const SANS = '"Instrument Sans Variable", system-ui, sans-serif';

/**
 * The one art-directed face on the site: an italic serif, used for a single
 * word in the headline and nowhere else. Only the 400 italic is loaded, which
 * is the only cut that gets used.
 */
export const SERIF = '"Instrument Serif", Georgia, serif';

/** Ready to spread: `style={SERIF_ITALIC}`. */
export const SERIF_ITALIC = { fontFamily: SERIF, fontStyle: "italic" } as const;
export const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';

/** Ready to spread: `style={MONO_STYLE}`. */
export const MONO_STYLE = { fontFamily: MONO } as const;
