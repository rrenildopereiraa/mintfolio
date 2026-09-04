import { site } from "../../site.config.ts";
import { COLOR } from "../lib/colors.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * A signature line at the end of the About section.
 *
 * The template ships the slot and not the signature. A drawn signature is the
 * one piece of a portfolio nobody else can supply for you, and a stranger's
 * handwriting sitting under your own words is worse than none — so what is
 * here is the dotted rule and your name under it, the way a form leaves you
 * room to sign.
 *
 * Set `signature` in `site.config.ts` to a file in `public/` and it draws
 * above the rule. An SVG of your own handwriting is the right thing: it stays
 * crisp at any size and inherits nothing, so it looks the same everywhere.
 * Delete this component from `app/page.tsx` if you would rather not have one.
 */
export function Signature() {
	return (
		<div className="mt-10 d-if fd-c" style={{ minWidth: 200 }}>
			{/* The box keeps its height whether or not there is a signature in it,
			    so adding one never moves the rule or the name below it. */}
			<div className="d-f ai-fe h-12 pb-1">
				{site.signature && (
					// biome-ignore lint/performance/noImgElement: an SVG has nothing for next/image to optimise, and a layout wrapper is all it would add.
					<img
						src={site.signature}
						alt={`${site.name}'s signature`}
						style={{ height: "100%", width: "auto", objectFit: "contain" }}
					/>
				)}
			</div>

			<span
				aria-hidden="true"
				className="d-b h-px"
				style={{
					backgroundImage: `linear-gradient(to right, ${COLOR.leader} 0 2px, transparent 2px 6px)`,
					backgroundSize: "6px 1px",
				}}
			/>

			<span className="mt-2 fs-xs c-text-dim" style={MONO_STYLE}>
				{site.name}
			</span>
		</div>
	);
}
