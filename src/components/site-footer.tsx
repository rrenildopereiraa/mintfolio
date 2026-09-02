import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

export function SiteFooter() {
	return (
		<footer className="mt-24 pt-8 btw-1 bs-s bc-border">
			<div className="d-f fd-c g-4 @sm:fd-r @sm:ai-c @sm:jc-sb">
				<p className="m-0 fs-xs c-text-dim" style={MONO_STYLE}>
					© {new Date().getFullYear()} {site.name}
				</p>

				<div className="d-f fw-w ai-c g-4">
					{site.socials.map((social) => (
						<a
							key={social.label}
							href={social.href}
							className="fs-xs td-none c-text-dim h:c-accent tp-c tdu-150"
							style={MONO_STYLE}
						>
							{social.label}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
