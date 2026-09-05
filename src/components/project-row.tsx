import { ArrowUpRight } from "iconoir-react";
import type { Project } from "../../content/projects.ts";
import { COLOR } from "../lib/colors.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { HoverCard } from "./hover-card.tsx";
import { projectMarks } from "./icons.tsx";

/**
 * One project as a row, not a card. The name is the preview-card trigger, so
 * the summary and stack cost no page height.
 */
export function ProjectRow({ project }: { project: Project }) {
	const Mark = projectMarks[project.mark];

	return (
		<div className="py-5 bbw-1 bs-s bc-border">
			<div className="d-f ai-c g-3">
				<HoverCard
					card={
						<div>
							<div className="d-f ai-c g-2">
								<Mark width={15} height={15} className="c-accent fs-0" />
								<span className="fs-sm fw-600 c-text">{project.name}</span>
							</div>
							<p className="mt-2 mb-0 fs-sm lh-5 c-text-dim">
								{project.summary}
							</p>
							<p className="mt-3 mb-0 fs-xs c-text-dim" style={MONO_STYLE}>
								{project.stack.join(" · ")}
							</p>
						</div>
					}
				>
					<Mark width={14} height={14} className="c-accent fs-0" />
					<span className="fs-md fw-600 ls-1">{project.name}</span>
				</HoverCard>

				{/* The leader is a background image rather than a border so it can be
				    dotted at a spacing a border-style cannot express. */}
				<span
					aria-hidden="true"
					className="d-b h-px"
					style={{
						flexGrow: 1,
						backgroundImage: `linear-gradient(to right, ${COLOR.leader} 0 2px, transparent 2px 6px)`,
						backgroundSize: "6px 1px",
					}}
				/>

				{project.href && project.label && (
					<a
						href={project.href}
						target="_blank"
						rel="noreferrer"
						className="d-if ai-c g-1 fs-0 px-2 py-1 br-sm bg-accent-soft fs-xs td-none c-accent h:c-accent-hover tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
						style={MONO_STYLE}
					>
						{project.label}
						<ArrowUpRight width={11} height={11} strokeWidth={2.4} />
					</a>
				)}
			</div>

			<p className="mt-2 mb-0 max-w-176 fs-sm lh-5 c-text-dim">
				{project.description}
			</p>
		</div>
	);
}
