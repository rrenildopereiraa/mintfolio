import { site } from "../../site.config.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { socialMarks } from "./icons.tsx";

/**
 * The footer.
 *
 * Marks rather than words: by the time a reader is down here they are looking
 * for one specific thing, and four logos are faster to pick out of a row than
 * four labels. The label survives as the accessible name, and as the fallback
 * for any social that has no mark in `icons.tsx`.
 */
export function SiteFooter() {
	return (
		<footer className="mt-24 pt-8 btw-1 bs-s bc-silver-2">
			<div className="d-f fd-c g-4 @sm:fd-r @sm:ai-c @sm:jc-sb">
				<p className="m-0 fs-xs c-slate" style={MONO_STYLE}>
					© {new Date().getFullYear()} {site.name}
				</p>

				<div className="d-f fw-w ai-c g-1 mx--2">
					{site.socials.map((social) => {
						const Mark = socialMarks[social.label];

						return (
							<a
								key={social.label}
								href={social.href}
								aria-label={social.label}
								title={social.label}
								className="d-if ai-c jc-c p-2 br-9999 fs-xs td-none c-slate h:c-zinc-9 tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-mint"
								style={MONO_STYLE}
							>
								{Mark ? (
									<Mark width={16} height={16} className="d-b fs-0" />
								) : (
									social.label
								)}
							</a>
						);
					})}
				</div>
			</div>
		</footer>
	);
}
