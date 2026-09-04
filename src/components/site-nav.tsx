import Link from "next/link";
import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * The header: a wordmark, and the links in a white pill.
 *
 * The pill exists because the grid sits behind this row. Links printed
 * straight onto the mesh have to compete with it, and a hover background on
 * each link means a second rectangle appearing over a field of rectangles.
 * Lifting the whole group onto one white surface settles both: the pill is the
 * only shape, and hovering just changes the ink.
 *
 * There is no menu button. Three links fit on a phone, and when they don't the
 * row wraps and the pill drops under the wordmark on its own line.
 */
export function SiteNav() {
	return (
		<header className="d-f fw-w ai-c jc-sb g-3 pt-6 @sm:pt-8">
			<Link
				href="/"
				className="d-if ai-c g-2 td-none c-zinc-9 fv:os-s fv:oo-2 fv:oc-mint"
			>
				<span aria-hidden="true" className="d-b w-2 h-2 br-9999 bg-mint fs-0" />
				<span className="fw-700 ls-1 fs-sm">{site.name}</span>
			</Link>

			<nav
				className="d-f ai-c g-1 p-1 br-9999 bw-1 bs-s bc-silver-2 bg-white"
				style={{
					boxShadow:
						"0 1px 2px rgba(48, 48, 53, 0.04), 0 8px 20px -14px rgba(48, 48, 53, 0.3)",
				}}
			>
				{site.nav.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="px-3 py-1 br-9999 fs-xs td-none c-slate h:c-zinc-9 tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-mint"
						style={MONO_STYLE}
					>
						{item.label}
					</Link>
				))}
			</nav>
		</header>
	);
}
