/**
 * The three faces, as inline styles: Yumma CSS themes colors and screens, not
 * families. To change one, swap its `@import` in `app/globals.css` too.
 */

/** Geist, on <body> and inherited, which is why no heading names a font. */
export const SANS = '"Geist Variable", system-ui, sans-serif';

/** The one art-directed face: one word in the headline, nowhere else. */
export const SERIF = '"Instrument Serif", Georgia, serif';

/** Ready to spread: `style={SERIF_ITALIC}`. */
export const SERIF_ITALIC = { fontFamily: SERIF, fontStyle: "italic" } as const;

/**
 * IBM Plex Mono, for dates, tags and section numbers. A text mono, so the
 * labels read as typed rather than compiled.
 */
export const MONO = '"IBM Plex Mono", ui-monospace, monospace';

/** Ready to spread: `style={MONO_STYLE}`. */
export const MONO_STYLE = { fontFamily: MONO } as const;
