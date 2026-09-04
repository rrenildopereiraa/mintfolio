import { COLOR } from "../lib/colors.ts";

/**
 * The technical grid behind the hero.
 *
 * Two repeating gradients draw the ruled lines, a soft accent wash sits under
 * them, and one mask fades the whole thing out before it reaches the text, so
 * the grid reads as paper rather than as a pattern sitting on the content.
 *
 * The mask is on the wrapper rather than on the lines, which matters: without
 * it the wash is a hard-edged rectangle, and the backdrop stops looking like
 * atmosphere and starts looking like a box.
 *
 * All inline, because gradients and masks are the kind of thing no utility
 * class can carry. The colours come from `src/lib/colors.ts` so they follow
 * the theme like everything else.
 */

const FADE =
	"radial-gradient(115% 100% at 50% 0%, #000 0%, #000 40%, transparent 82%)";

/** Lines every 32px, hairline weight. */
const LINES = {
	backgroundImage: `
		repeating-linear-gradient(
			to right,
			${COLOR.gridLine} 0 1px,
			transparent 1px 32px
		),
		repeating-linear-gradient(
			to bottom,
			${COLOR.gridLine} 0 1px,
			transparent 1px 32px
		)`,
} as const;

/** Two diffuse glows, off-centre so neither reads as a spotlight. */
const WASH = {
	backgroundImage: `
		radial-gradient(55% 70% at 15% 0%, ${COLOR.gridWash} 0%, transparent 72%),
		radial-gradient(45% 55% at 85% 8%, ${COLOR.gridWash} 0%, transparent 75%)`,
} as const;

export function GridBackdrop({
	/** How far down the page the grid reaches. A Yumma height utility. */
	height = "h-140",
	/**
	 * Stretch past the content column to the edges of the viewport. Turn it off
	 * inside a card, where the backdrop should stay within the border.
	 */
	bleed = true,
}: {
	height?: string;
	bleed?: boolean;
}) {
	return (
		<div
			aria-hidden="true"
			className={`p-a t-0 zi-0 pe-none ${height} ${bleed ? "" : "l-0 w-100%"}`}
			style={{
				maskImage: FADE,
				WebkitMaskImage: FADE,
				// Centre a viewport-wide layer regardless of the column it sits in.
				// The parent clips the horizontal overflow this creates.
				...(bleed
					? { left: "50%", width: "100vw", transform: "translateX(-50%)" }
					: {}),
			}}
		>
			<div className="p-a t-0 l-0 w-100% h-100% o-60" style={WASH} />
			<div className="p-a t-0 l-0 w-100% h-100%" style={LINES} />
		</div>
	);
}
