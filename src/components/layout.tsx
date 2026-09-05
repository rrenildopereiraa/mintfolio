import type { ReactNode } from "react";
import { COLOR } from "../lib/colors.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { GridBackdrop } from "./grid-backdrop.tsx";
import { SiteFooter } from "./site-footer.tsx";
import { SiteNav } from "./site-nav.tsx";

/**
 * The page shell: header, content column, footer.
 *
 * The column is a reading measure rather than a layout width. Everything on
 * the page is text or a row of text, so there is nothing that needs the space
 * a wider column would buy, and prose set much wider than this gets tiring.
 */
export function Layout({
	children,
	/**
	 * How far the ruled grid reaches down the page, as a Yumma CSS height
	 * utility. Omit it for no grid at all.
	 *
	 * The grid starts above the header rather than below it, so there is no
	 * seam where the tint begins.
	 */
	backdrop,
	/**
	 * Turn the footer off for a page that ends on something of its own. The
	 * home page does: it closes on the signature, and a rule and a copyright
	 * line printed underneath would make the signature not the last thing on
	 * the page, which is the only thing a signature is for.
	 */
	footer = true,
}: {
	children: ReactNode;
	backdrop?: string;
	footer?: boolean;
}) {
	return (
		<div className="p-r min-h-dvh o-h bg-page c-text s::bg-accent/25">
			{backdrop && <GridBackdrop height={backdrop} />}

			<div className="p-r zi-10 max-w-168 mx-auto px-6 pb-20 @sm:px-8 @sm:pb-24">
				<SiteNav />
				{children}
				{footer && <SiteFooter />}
			</div>
		</div>
	);
}

/** The shape a section icon has to be: sized and coloured by the heading. */
export type SectionIcon = (props: {
	width: number;
	height: number;
	strokeWidth: number;
	className: string;
}) => ReactNode;

/**
 * A section heading: an icon, the label, a ruled run of squares, and the
 * section number.
 *
 * The rule is squares rather than a line because the same shape carries the
 * whole identity, from the mesh behind the hero down to this. It is one
 * alphabet used at two sizes, which is what stops the page needing borders to
 * feel structured.
 *
 * Everything in the row is aligned on the text baseline rather than centred on
 * the row. Centring puts the rule through the middle of the label's x-height,
 * where it reads as struck through the words; on the baseline it reads as a
 * rule the words are sitting on, and it stays there at any type size, because
 * the baseline is the thing that moves with the text.
 */
export function SectionHeading({
	label,
	number,
	icon: Icon,
	description,
	action,
}: {
	label: string;
	/** Shown at the right end of the rule, e.g. "01". */
	number: string;
	/** The section's mark, usually an Iconoir icon. */
	icon: SectionIcon;
	/** One line under the heading. Optional. */
	description?: string;
	/** A link pinned to the right of the description row. */
	action?: ReactNode;
}) {
	return (
		<div>
			{/* Two rows nested rather than one flat one. The disc is centred on
			    the text row, and the rule is baselined to the label — and those
			    are different alignments, so they cannot both come from one
			    `align-items`. Mixing them with `align-self` looks right until a
			    32px disc joins a 14px line box and drags the shared baseline
			    down with it. */}
			<div className="d-f ai-c g-3">
				{/* The icon sits on a white disc, the same treatment as the nav
				    pill: where the grid runs behind a heading the disc lifts the
				    mark off it, and where it doesn't the ring still reads as a
				    deliberate plate rather than a floating glyph. */}
				<span
					aria-hidden="true"
					className="d-f ai-c jc-c fs-0 w-8 h-8 br-9999 bw-1 bs-s bc-border bg-surface c-accent"
					style={{
						boxShadow: `0 1px 2px ${COLOR.lift}`,
					}}
				>
					<Icon width={16} height={16} strokeWidth={1.7} className="d-b fs-0" />
				</span>

				<div className="d-f ai-b g-3" style={{ flexGrow: 1 }}>
					<h2 className="m-0 fs-sm fw-600 ls-1 c-text">{label}</h2>

					{/* A block flex item baselines on its bottom edge, so a 4px strip
					    of squares lands directly on the label's baseline. */}
					<span
						aria-hidden="true"
						className="d-b h-1"
						style={{
							flexGrow: 1,
							backgroundImage: `linear-gradient(to right, ${COLOR.sectionRule} 0 4px, transparent 4px 9px)`,
							backgroundSize: "9px 4px",
							backgroundRepeat: "repeat-x",
						}}
					/>

					<span className="fs-xs c-text-dim fs-0" style={MONO_STYLE}>
						{number}
					</span>
				</div>
			</div>

			{(description || action) && (
				<div className="d-f ai-b jc-sb g-4 mt-4">
					{description && (
						<p className="m-0 fs-sm lh-5 c-text-dim">{description}</p>
					)}
					{action}
				</div>
			)}
		</div>
	);
}
