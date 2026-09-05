import { Fragment } from "react";
import { site } from "../../site.config.ts";
import { Contributions } from "./contributions.tsx";
import { HoverCard } from "./hover-card.tsx";
import { socialMarks } from "./icons.tsx";

type Social = (typeof site.socials)[number];

/**
 * One link, inline in the sentence. Marks come from `icons.tsx` by `label`;
 * a social without one still renders, just as a word.
 */
function SocialLink({ social }: { social: Social }) {
	const Mark = socialMarks[social.label];
	const external = !social.href.startsWith("mailto:");

	return (
		<a
			href={social.href}
			{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
			className="d-if ai-c g-1 va-m td-none fw-500 c-text h:c-accent tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
		>
			{Mark && <Mark width={14} height={14} className="fs-0" />}
			{social.label}
		</a>
	);
}

/**
 * A sentence rather than a strip of logos, built from `site.socials` so the
 * config rewrites it. GitHub carries the contribution graph on hover.
 */
export function SocialProse({
	/** Shown on the GitHub card. Replace with a real figure when you have one. */
	contributions,
}: {
	contributions: number;
}) {
	const socials = site.socials;

	return (
		<p className="mt-0 mb-0 fs-sm lh-6 c-text-dim">
			You can find me on{" "}
			{socials.map((social, i) => {
				// Comma between, "or" before the last one, full stop after it.
				const separator =
					i === 0 ? "" : i === socials.length - 1 ? " or " : ", ";

				const link =
					social.label === "GitHub" ? (
						<HoverCard
							width={500}
							card={<Contributions total={contributions} />}
						>
							<SocialLink social={social} />
						</HoverCard>
					) : (
						<SocialLink social={social} />
					);

				return (
					<Fragment key={social.label}>
						{separator}
						{link}
					</Fragment>
				);
			})}
			.
		</p>
	);
}
