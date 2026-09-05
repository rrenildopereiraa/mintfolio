import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * The footer: one line.
 *
 * The social links live at the end of the About section, in the sentence that
 * mentions them, and the feed link lives on the blog where somebody would go
 * looking for it. Neither belongs down here: a footer is where links go to be
 * ignored.
 *
 * That leaves the one thing a footer is genuinely for. The home page does not
 * render it at all: it closes on the signature.
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
