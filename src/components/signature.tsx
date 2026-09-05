import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * How the page signs off.
 *
 * Your name, and above it your signature if you have set one. No ruled line
 * and no reserved space waiting for one: an empty slot with a dashed rule
 * across it reads as something unfinished rather than as somewhere to sign,
 * and the name on its own is already a sign-off.
 *
 * The template ships the slot and not the signature. A drawn signature is the
 * one piece of a portfolio nobody else can supply for you, and a stranger's
 * handwriting under your own words is worse than none, so set `signature` in
 * `site.config.ts` to a file in `public/` and it appears here. An SVG of your
 * own handwriting is the right thing: it stays crisp at any size and inherits
 * nothing, so it looks the same everywhere.
 *
 * Delete this component from `app/page.tsx` if you would rather not sign off
 * at all.
 */
export function Signature() {
	return (
		<div className="mt-8 d-f fd-c ai-fs g-2">
			{site.signature && (
				// biome-ignore lint/performance/noImgElement: an SVG has nothing for next/image to optimize, and a layout wrapper is all it would add.
				<img
					src={site.signature}
					alt={`${site.name}'s signature`}
					style={{ height: 40, width: "auto", objectFit: "contain" }}
				/>
			)}

			<span className="fs-xs c-text-dim" style={MONO_STYLE}>
				{site.name}
			</span>
		</div>
	);
}
