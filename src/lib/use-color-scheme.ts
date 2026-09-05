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
 * Reads and cycles the scheme. The class is only written on click: an effect
 * would overwrite what the inline script already set, and flash.
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
