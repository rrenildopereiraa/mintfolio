"use client";

import { useEffect, useState } from "react";
import {
	ALL_SCHEME_CLASSES,
	type ColorScheme,
	SCHEME_CLASS,
	SCHEME_CYCLE,
	STORAGE_KEY,
} from "./theme.ts";

function readStored(): ColorScheme {
	if (typeof window === "undefined") return "auto";
	const stored = window.localStorage.getItem(STORAGE_KEY);
	return stored === "light" || stored === "dark" ? stored : "auto";
}

function apply(scheme: ColorScheme) {
	const root = document.documentElement;
	root.classList.remove(...ALL_SCHEME_CLASSES);
	root.classList.add(SCHEME_CLASS[scheme]);
}

/**
 * Reads and cycles the color scheme.
 *
 * Deliberately does *not* apply the class in an effect. The inline script in
 * the root layout has already put the stored scheme on <html> before first
 * paint, and an effect running with this hook's initial state would overwrite
 * that with `auto` on hydration, flashing the wrong palette on every load for
 * anyone who picked one.
 *
 * So the class is only ever written in response to a click. State exists just
 * to keep the toggle's own icon honest, and starts at `auto` so the first
 * client render matches the server before syncing on mount.
 */
export function useColorScheme() {
	const [scheme, setScheme] = useState<ColorScheme>("auto");

	useEffect(() => {
		setScheme(readStored());
	}, []);

	const cycle = () => {
		const next =
			SCHEME_CYCLE[(SCHEME_CYCLE.indexOf(scheme) + 1) % SCHEME_CYCLE.length];
		setScheme(next);
		window.localStorage.setItem(STORAGE_KEY, next);
		apply(next);
	};

	return { scheme, cycle };
}
