import Link from "next/link";
import { site } from "../../site.config.ts";
import { COLOR } from "../lib/colors.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { ThemeToggle } from "./theme-toggle.tsx";

/**
 * The header: one centred pill, and nothing else.
 *
 * There is no wordmark. The name is already the largest thing on the page two
 * lines below it, and a site this size does not need to be told apart from the
 * seventeen other tabs — printing it twice in the first 200 pixels was
 * repetition doing the work of branding.
 *
 * With nothing on the left the pill has no reason to sit right, so it centres:
 * a single object, deliberately placed, rather than the leftovers of a row.
 *
 * The pill itself exists because the grid runs behind this row. Links printed
 * straight onto the mesh have to compete with it, and a hover background on
 * each link means a second rectangle appearing over a field of rectangles. One
 * surface settles both, and hovering just changes the ink.
 *
 * The toggle is not a link, so it gets its own layer rather than a rule drawn
 * between it and the ones that are: an inset disc, one step darker than the
 * pill and ringed like it. A divider only says "these are different"; a second
 * surface says which of the two you are looking at.
 *
 * There is no menu button. Three links and a toggle fit on a phone.
 */
export function SiteNav() {
	return (
		<header className="d-f jc-c pt-6 @sm:pt-8">
			<nav
				className="d-f ai-c g-1 p-1 br-9999 bw-1 bs-s bc-border bg-surface"
				style={{
					boxShadow: `0 1px 2px ${COLOR.lift}, 0 8px 20px -14px ${COLOR.liftWide}`,
				}}
			>
				{site.nav.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="px-3 py-1 br-9999 fs-xs td-none c-text-dim h:c-text tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
						style={MONO_STYLE}
					>
						{item.label}
					</Link>
				))}

				<span
					className="d-f ai-c jc-c ml-1 br-9999 bw-1 bs-s bc-border bg-surface-2"
					style={{ boxShadow: `inset 0 1px 2px ${COLOR.lift}` }}
				>
					<ThemeToggle />
				</span>
			</nav>
		</header>
	);
}
