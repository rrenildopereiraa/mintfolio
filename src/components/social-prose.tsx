import { Fragment } from "react";
import { site } from "../../site.config.ts";
import { Contributions } from "./contributions.tsx";
import { HoverCard } from "./hover-card.tsx";
import { socialMarks } from "./icons.tsx";

type Social = (typeof site.socials)[number];

/**
 * One link out, set inline in the sentence.
 *
 * The mark sits on the text's centre line and the label stays a word in the
 * prose, so the link reads as part of what is being said rather than as a
 * button dropped into it.
 *
 * Marks come from `icons.tsx`, keyed by the social's `label` in
 * `site.config.ts`. A social with no mark still renders — it just gets its
 * label — so adding one to the config can never make a link disappear.
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
 * Where to find me, as a sentence.
 *
 * Deliberately not a row of icons. A grouped strip of logos is the thing every
 * portfolio has, it reads as a widget rather than as something you wrote, and
 * four unlabelled glyphs make the reader decode them one at a time. Set inline,
 * each mark is next to the word it belongs to and the whole thing is still a
 * sentence.
 *
 * The list is built from `site.socials`, so adding or removing one in the
 * config changes the sentence and nothing here needs editing.
 *
 * GitHub carries the contribution graph on hover: a detail worth finding, not
 * a headline that needs its own section.
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
