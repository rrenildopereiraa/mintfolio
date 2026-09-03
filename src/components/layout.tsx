import type { ReactNode } from "react";
import { MONO_STYLE } from "../lib/fonts.ts";
import { GridBackdrop } from "./grid-backdrop.tsx";
import { SiteFooter } from "./site-footer.tsx";
import { SiteNav } from "./site-nav.tsx";

/**
 * The page shell: header, content column, footer.
 *
 * The column is wider than a reading measure because the Work grid needs two
 * cards side by side, and narrower than the viewport because prose still has
 * to be readable. Long-form pages narrow themselves further.
 */
export function Layout({
	children,
	/**
	 * How far the ruled grid reaches down the page, as a Yumma height utility.
	 * Omit it for no grid at all.
	 *
	 * The grid starts above the header rather than below it, so there is no
	 * seam where the tint begins. Inner pages use a shorter one than the home
	 * page: enough to carry the identity, not enough to sit behind the text.
	 */
	backdrop,
}: {
	children: ReactNode;
	backdrop?: string;
}) {
	return (
		<div className="p-r min-h-dvh o-h bg-white c-zinc-9 s::bg-mint/25">
			{backdrop && <GridBackdrop height={backdrop} />}

			<div className="p-r zi-10 max-w-232 mx-auto px-5 pb-20 @sm:px-8 @sm:pb-28">
				<SiteNav />
				{children}
				<SiteFooter />
			</div>
		</div>
	);
}

/**
 * A section heading: a small mono label with a mint marker, then the title.
 *
 * The label is what gives the page its technical register, and it is why the
 * headings need no rules or numbering to feel structured.
 */
export function SectionHeading({
	label,
	title,
	description,
	action,
}: {
	/** The small uppercase label above the title. */
	label: string;
	title: string;
	/** One line under the title. Optional. */
	description?: string;
	/** A link or control, pinned right on wide screens. */
	action?: ReactNode;
}) {
	return (
		<div className="d-f fd-c g-4 mb-8 @sm:fd-r @sm:ai-fe @sm:jc-sb">
			<div>
				<div className="d-f ai-c g-2">
					<span aria-hidden="true" className="d-b w-2 h-2 br-9999 bg-mint" />
					<span className="fs-xs fw-500 ls-3 tt-u c-mint-7" style={MONO_STYLE}>
						{label}
					</span>
				</div>
				<h2 className="mt-3 mb-0 fw-700 ls-1 fs-xxl lh-2 c-zinc-9">{title}</h2>
				{description && (
					<p className="mt-2 mb-0 max-w-160 fs-sm lh-5 c-slate">
						{description}
					</p>
				)}
			</div>
			{action}
		</div>
	);
}
