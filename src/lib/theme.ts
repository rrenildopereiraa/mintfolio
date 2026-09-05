export type ColorScheme = "light" | "dark" | "auto";

/** Where the reader's theme choice is remembered, per browser. */
export const STORAGE_KEY = "mintfolio-color-scheme";

// Flipping the palette is one class on <html>: `cs-l` light, `cs-d` dark,
// `cs-ld` follow the system.
export const SCHEME_CLASS: Record<ColorScheme, string> = {
	light: "cs-l",
	dark: "cs-d",
	auto: "cs-ld",
};

export const ALL_SCHEME_CLASSES = Object.values(SCHEME_CLASS);

export const SCHEME_CYCLE: ColorScheme[] = ["light", "dark", "auto"];

/**
 * Runs inline before first paint. The HTML ships as `auto` and this corrects
 * it synchronously; an effect would flash the wrong palette first.
 */
export const themeScript = `
(function () {
	try {
		var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
		var scheme = stored === "light" || stored === "dark" ? stored : "auto";
		var map = ${JSON.stringify(SCHEME_CLASS)};
		var root = document.documentElement;
		root.classList.remove(${ALL_SCHEME_CLASSES.map((c) => JSON.stringify(c)).join(", ")});
		root.classList.add(map[scheme]);
	} catch (e) {}
})();
`.trim();
