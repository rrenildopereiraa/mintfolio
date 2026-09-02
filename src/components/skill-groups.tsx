import type { SkillGroup } from "../../content/skills.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * Skills, grouped.
 *
 * One column per group on desktop, stacked on phones. The groups carry the
 * meaning, so the tags themselves stay quiet: no colour, no icons, no
 * proficiency bars that nobody believes.
 */
export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
	return (
		<div className="d-g g-6 gtc-1 @sm:gtc-2 @md:gtc-4">
			{groups.map((group) => (
				<div key={group.title}>
					<h3
						className="m-0 pb-3 bbw-1 bs-s bc-border fs-xs fw-500 ls-2 tt-u c-text-dim"
						style={MONO_STYLE}
					>
						{group.title}
					</h3>
					<ul
						className="d-f fd-c g-2 mt-4 m-0 p-0"
						style={{ listStyle: "none" }}
					>
						{group.items.map((item) => (
							<li key={item} className="fs-sm c-text">
								{item}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
