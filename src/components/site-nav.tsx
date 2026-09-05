import Link from "next/link";
import { site } from "../../site.config.ts";
import { COLOR } from "../lib/colors.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { ThemeToggle } from "./theme-toggle.tsx";

/**
 * One centered pill, no wordmark: the grid runs behind this row, and a single
 * surface beats links competing with it. The toggle gets its own inset disc.
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
