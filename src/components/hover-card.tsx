"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import type { ReactNode } from "react";
import { COLOR } from "../lib/colors.ts";

/**
 * An inline mark that opens a small card on hover.
 *
 * Built on Base UI's PreviewCard rather than a CSS `:hover` rule, which buys
 * the things a hover rule cannot do: an open and close delay so the card does
 * not flash as the pointer crosses it, keyboard focus opening it too,
 * collision-aware placement near a viewport edge, and dismissal on Escape.
 *
 * The trigger is deliberately not underlined. The mark plus the weight change
 * is enough to read as interactive, and an underline inside running prose
 * fights the sentence.
 */
export function HoverCard({
	children,
	card,
	width = 288,
}: {
	/** The inline trigger: usually a mark and a word. */
	children: ReactNode;
	/** What the card shows. */
	card: ReactNode;
	/** Card width in px. Contribution graphs want more than prose does. */
	width?: number;
}) {
	return (
		<PreviewCard.Root>
			<PreviewCard.Trigger
				// In Base UI 1.7 the open delay is a Trigger prop, not a Root one.
				delay={120}
				// `d-if` + `ai-c` is what keeps the mark on the text's centre line
				// rather than riding above it, which is the usual fault with an
				// icon dropped inline.
				className="d-if ai-c g-2 va-m c-text c-p"
				render={<span />}
			>
				{children}
			</PreviewCard.Trigger>

			<PreviewCard.Portal>
				{/* The portal mounts on <body>, which puts it below the page's own
				    `zi-10` content wrapper unless it is lifted explicitly. Without
				    this the card renders behind the text it is describing. */}
				<PreviewCard.Positioner sideOffset={10} style={{ zIndex: 50 }}>
					<PreviewCard.Popup
						className="p-r p-4 br-lg bw-1 bs-s bc-border bg-surface"
						// Yumma has no box-shadow utility, so the lift is inline.
						style={{
							width,
							boxShadow: `0 16px 38px -18px ${COLOR.popup}`,
						}}
					>
						<PreviewCard.Arrow
							className="d-f"
							render={(props, state) => (
								<span
									{...props}
									style={{ ...props.style, ...offsetFor(state.side) }}
								>
									<Arrow />
								</span>
							)}
						/>
						{card}
					</PreviewCard.Popup>
				</PreviewCard.Positioner>
			</PreviewCard.Portal>
		</PreviewCard.Root>
	);
}

/** The tip, drawn 14 wide and 7 deep, pointing down. */
const ARROW_W = 14;
const ARROW_D = 7;

/**
 * Where the tip sits, and which way it faces.
 *
 * Base UI places the arrow along the anchor's axis — it sets `left` when the
 * card is above or below, `top` when it is beside — and leaves the other axis
 * and the rotation to the stylesheet, which is a stylesheet this project does
 * not have. Without these the arrow lands wherever `top: auto` resolves to,
 * which is inside the card's padding, still pointing down whichever side the
 * card opened on.
 *
 * The offsets push it fully outside the card's border, and the rotations turn
 * a downward tip to face the anchor. Rotating about the centre leaves the box
 * 14 wide even when it paints 7 wide, which is why the horizontal sides use
 * half the width plus half the depth rather than the depth alone.
 */
function offsetFor(side: string) {
	const out = ARROW_W / 2 + ARROW_D / 2;

	switch (side) {
		// Card above the anchor: tip on its underside, pointing down.
		case "top":
			return { bottom: -ARROW_D };
		// Card below: tip on top, pointing up.
		case "bottom":
			return { top: -ARROW_D, rotate: "180deg" };
		// Card to the anchor's left: tip on its right edge, pointing right.
		case "left":
		case "inline-end":
			return { right: -out, rotate: "-90deg" };
		// Card to the anchor's right: tip on its left edge, pointing left.
		default:
			return { left: -out, rotate: "90deg" };
	}
}

/**
 * The tip itself.
 *
 * One shape drawn twice, filled then stroked, so the card's border carries on
 * around the point instead of stopping at it.
 */
function Arrow() {
	return (
		<svg
			width={ARROW_W}
			height={ARROW_D}
			viewBox="0 0 14 7"
			aria-hidden="true"
			className="d-b"
		>
			<title>Tip</title>
			<path d="M0 0 7 7 14 0" style={{ fill: COLOR.surface }} />
			<path
				d="M0 0 7 7 14 0"
				fill="none"
				style={{ stroke: COLOR.border }}
				strokeWidth="1"
			/>
		</svg>
	);
}
