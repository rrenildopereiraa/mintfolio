"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import type { CSSProperties, ReactNode } from "react";
import { COLOR } from "../lib/colors.ts";
import { useReducedMotion } from "../lib/use-media-query.ts";

/**
 * An inline mark that opens a card on hover. Base UI handles the delay,
 * keyboard focus, edge collisions and Escape; a `:hover` rule does none of it.
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
				// `d-if` + `ai-c` keeps the mark on the text's center line rather
				// than riding above it.
				className="d-if ai-c g-2 va-m c-text c-p"
				render={<span />}
			>
				{children}
			</PreviewCard.Trigger>

			<PreviewCard.Portal>
				{/* The portal mounts on <body>, below the page's `zi-10` wrapper,
				    so it needs lifting or it renders behind the text. */}
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
 * Grows from the edge it is anchored to. `transitionStatus` covers both
 * directions, and the resting `transition` is what keeps the exit mounted.
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
 * Base UI positions the arrow along one axis only; the other axis and the
 * rotation are ours. Rotated, the box stays 14 wide while it paints 7.
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

/** Filled then stroked, so the card's border carries around the point. */
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
