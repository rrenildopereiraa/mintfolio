import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * Your name, with your signature above it if `site.signature` points at an SVG.
 * The template ships the slot and not the handwriting.
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
