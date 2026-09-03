import Link from "next/link";
import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * The header.
 *
 * On phones the links move to a second row rather than hiding behind a menu
 * button: there are three of them, they fit, and a hamburger for three links
 * is a tap nobody should have to make. The wordmark stays on the top row at
 * every width.
 */
export function SiteNav() {
	return (
		<header className="pt-6 @sm:pt-8">
			<div className="d-f ai-c jc-sb g-4">
				<Link
					href="/"
					className="d-if ai-c g-2 td-none c-zinc-9 fv:os-s fv:oo-2 fv:oc-mint"
				>
					<span
						aria-hidden="true"
						className="d-b w-2 h-2 br-9999 bg-mint fs-0"
					/>
					<span className="fw-700 ls-1 fs-sm">{site.name}</span>
				</Link>

				<div className="d-f ai-c g-2 fs-0">
					<nav className="d-none @sm:d-f ai-c g-1">
						{site.nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="px-3 py-2 br-md fs-xs td-none c-slate h:c-zinc-9 h:bg-silver-1 tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-mint"
								style={MONO_STYLE}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>

			{/* The same links, on their own row, below 40rem. */}
			<nav className="d-f @sm:d-none ai-c g-1 mt-3 mx--2">
				{site.nav.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="px-3 py-2 br-md fs-xs td-none c-slate h:c-zinc-9 h:bg-silver-1 tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-mint"
						style={MONO_STYLE}
					>
						{item.label}
					</Link>
				))}
			</nav>
		</header>
	);
}
