import type { ReactNode } from "react";
import { COLOR } from "../lib/colors.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { GridBackdrop } from "./grid-backdrop.tsx";
import { SiteFooter } from "./site-footer.tsx";
import { SiteNav } from "./site-nav.tsx";

/** The page shell. The column is a reading measure, not a layout width. */
export function Layout({
	children,
	/** How far the grid reaches, as a height utility. Omit for no grid. */
	backdrop,
	/** Off for a page that ends on something of its own, like the signature. */
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

/** The shape a section icon has to be: sized and colored by the heading. */
export type SectionIcon = (props: {
	width: number;
	height: number;
	strokeWidth: number;
	className: string;
}) => ReactNode;

/**
 * An icon, the label, a ruled run of squares, and the number. Baseline-aligned:
 * centered, the rule reads as struck through the words.
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
			{/* Nested rows: the disc centers on the text, the rule baselines to
			    it, and one `align-items` cannot do both. */}
			<div className="d-f ai-c g-3">
				{/* The same white plate as the nav pill, so the mark lifts off the
				    grid where it runs behind a heading. */}
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

					{/* A block flex item baselines on its bottom edge, so this strip
					    lands on the label's baseline. */}
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
