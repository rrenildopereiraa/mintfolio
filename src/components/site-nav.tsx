import Link from "next/link";
import { site } from "../../site.config.ts";
import { COLOR } from "../lib/colors.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { ThemeToggle } from "./theme-toggle.tsx";

/**
 * The header: a wordmark, and the links and theme toggle in one pill.
 *
 * The pill exists because the grid sits behind this row. Links printed
 * straight onto the mesh have to compete with it, and a hover background on
 * each link means a second rectangle appearing over a field of rectangles.
 * Lifting the whole group onto one surface settles both: the pill is the only
 * shape, and hovering just changes the ink.
 *
 * The toggle goes inside it rather than beside it, so the header stays one
 * object instead of two things that have to be aligned to each other.
 *
 * There is no menu button. Three links fit on a phone, and when they don't the
 * row wraps and the pill drops under the wordmark on its own line.
 */
export function SiteNav() {
	return (
		<header className="d-f fw-w ai-c jc-sb g-3 pt-6 @sm:pt-8">
			<Link
				href="/"
				className="d-if ai-c g-2 td-none c-text fv:os-s fv:oo-2 fv:oc-accent"
			>
				<span
					aria-hidden="true"
					className="d-b w-2 h-2 br-9999 bg-accent fs-0"
				/>
				<span className="fw-700 ls-1 fs-sm">{site.name}</span>
			</Link>

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

				<span aria-hidden="true" className="d-b w-px h-4 mx-1 bg-border" />
				<ThemeToggle />
			</nav>
		</header>
	);
}
