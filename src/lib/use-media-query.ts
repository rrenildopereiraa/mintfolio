"use client";

import { useEffect, useState } from "react";

/**
 * A media query as a value.
 *
 * Yumma has variants for pseudo-classes, pseudo-elements and breakpoints, but
 * none for `prefers-reduced-motion` or `hover`, and an inline style can't
 * carry a media query either. So the query is read here and the answer becomes
 * something a component can branch on.
 *
 * `initial` is what the server renders, and the first client render has to
 * match it, so each caller picks the answer that is safe to be wrong about for
 * one frame. For reduced motion that is `false`: a frame of animation is a
 * smaller mistake than a frame of missing content.
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
