// biome-ignore-all lint/performance/noImgElement: Satori rasterises this tree,
// it never reaches a browser, and next/image has nothing to optimise in it.

import type { ReactNode } from "react";

/** The size every social network crops against. */
export const OG_SIZE = { width: 1200, height: 630 };

/**
 * The dark half of the palette, as plain hex.
 *
 * Satori resolves neither CSS variables nor `light-dark()`, so the card can't
 * read `yumma.config.mjs` and carries its own copy. Dark on purpose: the card
 * is judged in a feed, and a dark rectangle holds its edges instead of
 * dissolving into the surrounding page.
 *
 * If you change the accent in `yumma.config.mjs`, change it here too.
 */
const COLOR = {
	page: "#07100f",
	text: "#e4f1ee",
	dim: "#8ba7a1",
	accent: "#5eead4",
	line: "#16292600",
};

/**
 * The same ruled grid the hero uses, as an image.
 *
 * Satori has no `repeating-linear-gradient`, so the lines are drawn once into
 * an SVG pattern and rasterised through resvg, which does support it.
 */
function gridUri(width: number, height: number) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><pattern id="g" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#16292b" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;

	return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * The shared social card.
 *
 * `title` takes a node rather than a string so the home card can tint part of
 * the headline. There is no font option because none is passed to
 * `ImageResponse`, which falls back to the Geist Regular bundled inside
 * next/og; Fontsource ships woff2, which Satori cannot read.
 */
export function OgCard({
	eyebrow,
	title,
	description,
	footnote,
}: {
	eyebrow: string;
	title: ReactNode;
	description: string;
	footnote: string;
}) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				position: "relative",
				width: "100%",
				height: "100%",
				padding: 72,
				backgroundColor: COLOR.page,
				color: COLOR.text,
			}}
		>
			<img
				src={gridUri(OG_SIZE.width, 420)}
				width={OG_SIZE.width}
				height={420}
				alt=""
				style={{ position: "absolute", top: 0, left: 0, opacity: 0.85 }}
			/>

			<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
				<div
					style={{
						width: 14,
						height: 14,
						borderRadius: 9999,
						backgroundColor: COLOR.accent,
					}}
				/>
				<span style={{ fontSize: 24, letterSpacing: 0.4, color: COLOR.dim }}>
					{eyebrow}
				</span>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					justifyContent: "center",
					paddingRight: 40,
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 62,
						lineHeight: 1.2,
						letterSpacing: -1.5,
					}}
				>
					{title}
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 24,
						fontSize: 27,
						lineHeight: 1.45,
						color: COLOR.dim,
					}}
				>
					{description}
				</div>
			</div>

			<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
				<div
					style={{
						width: 40,
						height: 2,
						backgroundColor: COLOR.accent,
					}}
				/>
				<span style={{ fontSize: 22, color: COLOR.dim }}>{footnote}</span>
			</div>
		</div>
	);
}

export { COLOR as OG_COLOR };
