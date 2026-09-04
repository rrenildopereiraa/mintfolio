import Link from "next/link";
import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * The footer: a copyright line and the feed.
 *
 * The social links used to live here and now sit at the end of the About
 * section, where a reader who has just finished reading about you is already
 * looking. Repeating them down here would only give the same four links a
 * second, quieter home, and it would put something after the signature — which
 * is meant to be the last thing on the page.
 *
 * What is left is the two things a footer is genuinely for: who owns this, and
 * how a machine subscribes to it.
 */
export function SiteFooter() {
	return (
		<footer className="mt-24 pt-8 btw-1 bs-s bc-border">
			<div className="d-f fd-c g-3 @sm:fd-r @sm:ai-c @sm:jc-sb">
				<p className="m-0 fs-xs c-text-dim" style={MONO_STYLE}>
					© {new Date().getFullYear()} {site.name}
				</p>

				<Link
					href="/feed.xml"
					className="fs-xs td-none c-text-dim h:c-text tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
					style={MONO_STYLE}
				>
					RSS
				</Link>
			</div>
		</footer>
	);
}
