import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * One line. Socials live in the About sentence and the feed on the blog; the
 * home page skips this entirely and closes on the signature.
 */
export function SiteFooter() {
	return (
		<footer className="mt-24 pt-8 btw-1 bs-s bc-border">
			<p className="m-0 fs-xs c-text-dim" style={MONO_STYLE}>
				© {new Date().getFullYear()} {site.name}
			</p>
		</footer>
	);
}
