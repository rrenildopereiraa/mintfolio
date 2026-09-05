"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import type { CSSProperties, ReactNode } from "react";
import { COLOR } from "../lib/colors.ts";
import { useReducedMotion } from "../lib/use-media-query.ts";

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
	const reducedMotion = useReducedMotion();

	return (
		<PreviewCard.Root>
			<PreviewCard.Trigger
				// In Base UI 1.7 the open delay is a Trigger prop, not a Root one.
				delay={120}
				// `d-if` + `ai-c` is what keeps the mark on the text's center line
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
						render={(props, state) => (
							<div
								{...props}
								style={{
									...props.style,
									width,
									// Yumma CSS has no box-shadow utility, so the
									// lift is inline.
									boxShadow: `0 16px 38px -18px ${COLOR.popup}`,
									...motion(state, reducedMotion),
								}}
							/>
						)}
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

/**
 * How the card arrives and leaves.
 *
 * It grows a little and rises from the edge it is anchored to, rather than
 * fading in place: the movement is what tells you the card belongs to the word
 * you are pointing at. Small numbers on purpose: this fires on hover, so
 * anything longer than about 150ms feels like the page is thinking.
 *
 * Base UI hands us `transitionStatus`, which is `starting` on the frame before
 * the card opens and `ending` while it closes, so one set of styles covers
 * both directions. It keeps the element mounted for the exit by reading the
 * transition duration off the element, which is why the `transition` has to be
 * declared even in the resting state.
 *
 * `instant` is Base UI telling us this particular change should not animate:
 * a dismissal, or focus arriving by keyboard. Reduced motion is the
 * reader telling us the same thing about all of them.
 */
function motion(
	state: { transitionStatus?: string; instant?: string; side: string },
	reducedMotion: boolean,
): CSSProperties {
	if (reducedMotion || state.instant) return {};

	const hidden =
		state.transitionStatus === "starting" ||
		state.transitionStatus === "ending";

	const horizontal = state.side === "left" || state.side === "right";
	const away =
		state.side === "bottom" || state.side === "inline-start" ? -5 : 5;

	return {
		transformOrigin: ORIGIN[state.side] ?? "center top",
		opacity: hidden ? 0 : 1,
		transform: hidden
			? `scale(0.96) translate${horizontal ? "X" : "Y"}(${away}px)`
			: "none",
		transition:
			"opacity 120ms ease-out, transform 150ms cubic-bezier(0.2, 0, 0.13, 1)",
	};
}

/** Grow from the edge nearest the word, not from the middle of the card. */
const ORIGIN: Record<string, string> = {
	top: "center bottom",
	bottom: "center top",
	left: "right center",
	right: "left center",
};

/** The tip, drawn 14 wide and 7 deep, pointing down. */
const ARROW_W = 14;
const ARROW_D = 7;

/**
 * Where the tip sits, and which way it faces.
 *
 * Base UI places the arrow along the anchor's axis. It sets `left` when the
 * card is above or below, `top` when it is beside, and leaves the other axis
 * and the rotation to the stylesheet, which is a stylesheet this project does
 * not have. Without these the arrow lands wherever `top: auto` resolves to,
 * which is inside the card's padding, still pointing down whichever side the
 * card opened on.
 *
 * The offsets push it fully outside the card's border, and the rotations turn
 * a downward tip to face the anchor. Rotating about the center leaves the box
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
