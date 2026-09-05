import { CONTRIBUTION_LEVELS } from "../lib/colors.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * A year of contribution squares, generated from a fixed seed rather than
 * fetched. Swap in real data: one number per day, 0 to 4.
 */
const WEEKS = 52;
const DAYS = 7;
const CELL = 9;
const SIZE = 7;

/** Deterministic, so the server and the client draw the same grid. */
function sample(): number[][] {
	let seed = 20260101;
	const next = () => {
		seed = (seed * 1664525 + 1013904223) % 4294967296;
		return seed / 4294967296;
	};

	return Array.from({ length: WEEKS }, () =>
		Array.from({ length: DAYS }, () => {
			const v = next();
			if (v < 0.38) return 0;
			if (v < 0.62) return 1;
			if (v < 0.82) return 2;
			if (v < 0.94) return 3;
			return 4;
		}),
	);
}

export function Contributions({ total }: { total: number }) {
	const weeks = sample();

	return (
		<div>
			<p className="m-0 pb-2 fs-xs c-text-dim" style={MONO_STYLE}>
				{total.toLocaleString("en-US")} contributions this year
			</p>

			<svg
				width={WEEKS * CELL}
				height={DAYS * CELL}
				viewBox={`0 0 ${WEEKS * CELL} ${DAYS * CELL}`}
				role="img"
				aria-label={`${total} contributions in the last year`}
			>
				{weeks.map((days, w) =>
					days.map((level, d) => (
						<rect
							// biome-ignore lint/suspicious/noArrayIndexKey: the grid is fixed and positional, so the cell's coordinates are its identity.
							key={`${w}-${d}`}
							x={w * CELL}
							y={d * CELL}
							width={SIZE}
							height={SIZE}
							rx={1.5}
							style={{ fill: CONTRIBUTION_LEVELS[level] }}
						/>
					)),
				)}
			</svg>
		</div>
	);
}
