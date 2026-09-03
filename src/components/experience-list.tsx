import type { Role } from "../../content/experience.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * Roles down a rail.
 *
 * The rail is a left border on each row rather than one long absolute element,
 * so it can never fall out of step with the content next to it, and the dot is
 * pulled onto the line with a negative margin.
 */
export function ExperienceList({ roles }: { roles: Role[] }) {
	return (
		<ol className="d-f fd-c m-0 p-0" style={{ listStyle: "none" }}>
			{roles.map((role, index) => (
				<li
					key={`${role.company}-${role.title}`}
					className={`p-r pl-6 blw-1 bs-s bc-silver-2 ${
						index === roles.length - 1 ? "pb-0" : "pb-8"
					}`}
				>
					<span
						aria-hidden="true"
						className="p-a l-0 t-1 d-b w-2 h-2 ml--1 br-9999 bg-mint"
					/>

					<div className="d-f fd-c g-1 @sm:fd-r @sm:ai-b @sm:jc-sb @sm:g-4">
						<h3 className="m-0 fw-600 fs-md lh-3 c-zinc-9">
							{role.title}
							<span className="c-slate">{" · "}</span>
							{role.href ? (
								<a
									href={role.href}
									target="_blank"
									rel="noreferrer"
									className="td-none c-mint-7 h:c-mint tp-c tdu-150"
								>
									{role.company}
								</a>
							) : (
								<span className="c-mint-7">{role.company}</span>
							)}
						</h3>
						<span className="fs-0 fs-xs c-slate" style={MONO_STYLE}>
							{role.start} – {role.end}
						</span>
					</div>

					<p className="mt-2 mb-0 max-w-176 fs-sm lh-5 c-slate">
						{role.summary}
					</p>
				</li>
			))}
		</ol>
	);
}
