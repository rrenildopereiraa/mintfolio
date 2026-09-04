import { site } from "../../site.config.ts";
import { Contributions } from "./contributions.tsx";
import { HoverCard } from "./hover-card.tsx";
import { socialMarks } from "./icons.tsx";

type Social = (typeof site.socials)[number];

/**
 * One link out.
 *
 * Marks come from `icons.tsx`, keyed by the social's `label` in
 * `site.config.ts`. A social with no mark falls back to its label, so adding
 * one to the config can never make a link disappear silently.
 */
function SocialLink({ social }: { social: Social }) {
	const Mark = socialMarks[social.label];
	const external = !social.href.startsWith("mailto:");

	return (
		<a
			href={social.href}
			aria-label={social.label}
			title={social.label}
			{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
			className="d-if ai-c jc-c p-2 br-9999 fs-xs td-none c-text-dim h:c-text tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
		>
			{Mark ? (
				<Mark width={18} height={18} className="d-b fs-0" />
			) : (
				social.label
			)}
		</a>
	);
}

/**
 * The links out, as a row of marks.
 *
 * They sit at the end of the About section rather than in the footer. A footer
 * is where links go to be ignored; the end of the paragraph where somebody has
 * just read about you is where they actually want them. It also keeps the
 * signature as the last thing on the page, which is the point of a signature.
 *
 * GitHub carries the contribution graph on hover. It hangs off the mark rather
 * than taking a section of its own: a detail worth finding, not a headline.
 */
export function SocialLinks({
	/** Shown on the GitHub card. Replace with a real figure when you have one. */
	contributions,
}: {
	contributions: number;
}) {
	return (
		<div className="d-f fw-w ai-c g-1 mx--2 mt-6">
			{site.socials.map((social) =>
				social.label === "GitHub" ? (
					<HoverCard
						key={social.label}
						width={500}
						card={<Contributions total={contributions} />}
					>
						<SocialLink social={social} />
					</HoverCard>
				) : (
					<SocialLink key={social.label} social={social} />
				),
			)}
		</div>
	);
}
