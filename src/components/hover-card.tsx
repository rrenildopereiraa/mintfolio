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
						<PreviewCard.Arrow className="d-f" render={<span />}>
							<Arrow />
						</PreviewCard.Arrow>
						{card}
					</PreviewCard.Popup>
				</PreviewCard.Positioner>
			</PreviewCard.Portal>
		</PreviewCard.Root>
	);
}

/**
 * The little tip under the card.
 *
 * Drawn as one path with a fill and a stroke so the card's border carries on
 * around the point instead of stopping at it. Base UI flips it for us when the
 * card has to open upwards.
 */
function Arrow() {
	return (
		<svg width="14" height="7" viewBox="0 0 14 7" aria-hidden="true">
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
