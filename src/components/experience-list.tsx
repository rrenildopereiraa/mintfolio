import type { Role } from "../../content/experience.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * Roles with the dates in a left gutter, since a career is scanned by year.
 * The gutter collapses under 640px, where it would squeeze the summary.
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
