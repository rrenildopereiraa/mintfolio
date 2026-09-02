import Link from "next/link";
import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { ThemeToggle } from "./theme-toggle.tsx";

/**
 * The header.
 *
 * On phones the links move to a second row rather than hiding behind a menu
 * button: there are three of them, they fit, and a hamburger for three links
 * is a tap nobody should have to make. The wordmark and the theme toggle stay
 * on the top row at every width.
 */
export function SiteNav() {
	return (
		<header className="pt-6 @sm:pt-8">
			<div className="d-f ai-c jc-sb g-4">
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

				<div className="d-f ai-c g-2 fs-0">
					<nav className="d-none @sm:d-f ai-c g-1">
						{site.nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="px-3 py-2 br-md fs-xs td-none c-text-dim h:c-text h:bg-surface-2 tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
								style={MONO_STYLE}
							>
								{item.label}
							</Link>
						))}
					</nav>
					<ThemeToggle />
				</div>
			</div>

			{/* The same links, on their own row, below 40rem. */}
			<nav className="d-f @sm:d-none ai-c g-1 mt-3 mx--2">
				{site.nav.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="px-3 py-2 br-md fs-xs td-none c-text-dim h:c-text h:bg-surface-2 tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
						style={MONO_STYLE}
					>
						{item.label}
					</Link>
				))}
			</nav>
		</header>
	);
}
