import { COLOR } from "../lib/colors.ts";

/**
 * The ruled grid behind the hero: lines, a wash, and a mask that fades both
 * out before they reach the text. Inline, since no utility carries gradients.
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

/** Two diffuse glows, off-center so neither reads as a spotlight. */
const WASH = {
	backgroundImage: `
		radial-gradient(55% 70% at 15% 0%, ${COLOR.gridWash} 0%, transparent 72%),
		radial-gradient(45% 55% at 85% 8%, ${COLOR.gridWash} 0%, transparent 75%)`,
} as const;

export function GridBackdrop({
	/** How far down the page the grid reaches. A Yumma CSS height utility. */
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
				// Center a viewport-wide layer regardless of the column it sits in.
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
