"use client";

import { useEffect, useState } from "react";

/**
 * A media query as a value, for the ones Yumma CSS has no variant for.
 * `initial` is what the server renders, so pick the safe answer to be wrong.
 */
export function useMediaQuery(query: string, initial = false) {
	const [matches, setMatches] = useState(initial);

	useEffect(() => {
		const list = window.matchMedia(query);
		setMatches(list.matches);

		const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
		list.addEventListener("change", onChange);
		return () => list.removeEventListener("change", onChange);
	}, [query]);

	return matches;
}

/** True when the reader has asked for less motion. */
export const useReducedMotion = () =>
	useMediaQuery("(prefers-reduced-motion: reduce)");
