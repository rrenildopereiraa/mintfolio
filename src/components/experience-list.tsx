import type { Role } from "../../content/experience.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * Roles, as a dated list.
 *
 * The dates sit in a gutter on the left rather than trailing the job title on
 * the right. A career is read chronologically, so the years are the column you
 * scan and the titles are what you stop on; putting the dates last makes you
 * read every title to find the one year you were looking for.
 *
 * A hairline above each role does the separating. There is no rail and no bead
 * on it: a vertical line drawn down a list of three things is decoration
 * standing in for structure, and the rule already says where one role ends and
 * the next starts.
 *
 * The gutter collapses under 640px, where 110px of it would leave the summary
 * too narrow to read. Below that the dates sit above the title instead.
 */
export function ExperienceList({ roles }: { roles: Role[] }) {
	return (
		<ol className="d-f fd-c m-0 p-0" style={{ listStyle: "none" }}>
			{roles.map((role) => (
				<li
					key={`${role.company}-${role.title}`}
					className="d-f fd-c g-1 pt-5 pb-5 btw-1 bs-s bc-border @sm:fd-r @sm:g-6"
				>
					{/* Fixed width so every title starts on the same line, whatever
					    the dates say. `Present` is the longest thing that goes here. */}
					<span
						className="fs-0 fs-xs c-text-dim @sm:pt-1"
						style={{ ...MONO_STYLE, width: 108 }}
					>
						{role.start} – {role.end}
					</span>

					<div style={{ flexGrow: 1 }}>
						<h3 className="m-0 fw-600 fs-md lh-3 c-text">
							{role.title}
							<span className="c-text-dim">{" · "}</span>
							{role.href ? (
								<a
									href={role.href}
									target="_blank"
									rel="noreferrer"
									className="td-none c-accent h:c-accent-hover tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
								>
									{role.company}
								</a>
							) : (
								<span className="c-accent">{role.company}</span>
							)}
						</h3>

						<p className="mt-2 mb-0 fs-sm lh-5 c-text-dim">{role.summary}</p>
					</div>
				</li>
			))}
		</ol>
	);
}
