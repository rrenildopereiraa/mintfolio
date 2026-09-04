export type ColorScheme = "light" | "dark" | "auto";

/** Where the reader's theme choice is remembered, per browser. */
export const STORAGE_KEY = "mintfolio-color-scheme";

// Yumma CSS 3.29 compiles paired theme colors to `light-dark()` and declares
// `color-scheme: light dark` on :root, so flipping the whole palette is just a
// class on <html>: `cs-l` forces light, `cs-d` forces dark, `cs-ld` follows the
// operating system.
export const SCHEME_CLASS: Record<ColorScheme, string> = {
	light: "cs-l",
	dark: "cs-d",
	auto: "cs-ld",
};

export const ALL_SCHEME_CLASSES = Object.values(SCHEME_CLASS);

export const SCHEME_CYCLE: ColorScheme[] = ["light", "dark", "auto"];

/**
 * Runs before first paint, ahead of hydration.
 *
 * The server has no way to know which scheme this visitor picked, so the HTML
 * ships with the `auto` class and this corrects it synchronously. Doing it in
 * an effect instead would paint the wrong palette first and flash.
 *
 * Kept as a string rather than a module because it has to execute inline in
 * <head>, before any bundle loads.
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
