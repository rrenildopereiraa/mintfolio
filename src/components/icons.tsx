import type { SVGProps } from "react";

/**
 * Brand and project marks.
 *
 * Iconoir covers the interface icons, but brand marks are not interface icons:
 * GitHub's mark has a defined shape and X has a defined one too, and drawing
 * an approximation of either is the kind of detail people notice. So the marks
 * that belong to somebody else live here, hand-copied, and everything else
 * comes from Iconoir.
 *
 * Each takes the usual SVG props, so size it with `width`/`height` and colour
 * it with `fill="currentColor"` where the mark allows it.
 */

/**
 * The GitHub mark.
 *
 * `currentColor` rather than a baked-in hex: the mark is monochrome, so it can
 * simply inherit. If dark mode lands, this needs no second variant.
 */
export function GitHub(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				fill="currentColor"
				d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
			/>
		</svg>
	);
}

/**
 * The X mark.
 *
 * Iconoir ships an `X` too. This one is here so every brand mark on the site
 * comes from the same file and inherits colour the same way, rather than one
 * arriving from an icon pack with its own sizing conventions.
 */
export function X(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
			<path
				fill="currentColor"
				d="M9.52 6.77 15.48 0h-1.41L8.9 5.88 4.77 0H0l6.25 8.9L0 16h1.41l5.46-6.21L11.23 16H16L9.52 6.77Zm-1.93 2.2-.63-.89L1.92 1.04h2.17l4.06 5.7.63.89 5.28 7.4h-2.17L7.59 8.97Z"
			/>
		</svg>
	);
}

/**
 * The LinkedIn mark.
 *
 * The badge, not the bare wordmark, because that is the only form LinkedIn
 * publishes. It sits a shade heavier than the other two at the same size,
 * which is a property of the mark rather than something to correct.
 */
export function LinkedIn(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				fill="currentColor"
				d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z"
			/>
		</svg>
	);
}

/**
 * Email.
 *
 * Not a brand, so it gets an interface icon rather than a logo: an envelope
 * drawn to the same weight as the rest of the site's Iconoir set, so the four
 * footer marks read as one row instead of three logos and a stray.
 */
export function Email(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M2.5 6.5h19v11a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5v-11ZM2.5 7 12 13.5 21.5 7"
				stroke="currentColor"
				strokeWidth="1.9"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/**
 * Every mark the footer can reach for, keyed by the `label` in
 * `site.config.ts`. Add a social there and add its mark here; anything with no
 * mark falls back to its label, so the footer never silently drops a link.
 */
export const socialMarks: Record<
	string,
	(props: SVGProps<SVGSVGElement>) => React.ReactElement
> = {
	GitHub,
	LinkedIn,
	X,
	Email,
};

/**
 * Project marks: a circle, a square and a triangle.
 *
 * The example projects are deliberately shapes rather than invented logos. A
 * fake wordmark would be one more thing to delete, and a plain shape reads as
 * a placeholder you are meant to replace. Swap in an SVG of your own and the
 * layout does not move: they all draw inside the same 16x16 box.
 */
type Mark = (props: SVGProps<SVGSVGElement>) => React.ReactElement;

export const ProjectCircle: Mark = (props) => (
	<svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
		<circle cx="8" cy="8" r="6" fill="currentColor" />
	</svg>
);

export const ProjectSquare: Mark = (props) => (
	<svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
		<rect x="2.5" y="2.5" width="11" height="11" rx="2" fill="currentColor" />
	</svg>
);

export const ProjectTriangle: Mark = (props) => (
	<svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
		<path d="M8 2.2 14.2 13.4H1.8Z" fill="currentColor" />
	</svg>
);

/** Looked up by the `mark` field in `content/projects.ts`. */
export const projectMarks = {
	circle: ProjectCircle,
	square: ProjectSquare,
	triangle: ProjectTriangle,
} as const;

export type ProjectMark = keyof typeof projectMarks;
