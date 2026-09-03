import { ArrowUpRight } from "iconoir-react";
import type { Project } from "../../content/projects.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { HoverCard } from "./hover-card.tsx";
import { projectMarks } from "./icons.tsx";

/**
 * One project, as a row.
 *
 * A row rather than a card: a grid of bordered boxes is the single most copied
 * portfolio pattern there is, and at this width a wide card is mostly empty
 * anyway. The name, a dotted leader and the repository chip share one line,
 * with the sentence underneath.
 *
 * The name is also the preview-card trigger, so hovering it shows the longer
 * summary and the stack without spending page height on either.
 */
export function ProjectRow({ project }: { project: Project }) {
	const Mark = projectMarks[project.mark];

	return (
		<div className="py-5 bbw-1 bs-s bc-silver-2">
			<div className="d-f ai-c g-3">
				<HoverCard
					card={
						<div>
							<div className="d-f ai-c g-2">
								<Mark width={15} height={15} className="c-mint-7 fs-0" />
								<span className="fs-sm fw-600 c-zinc-9">{project.name}</span>
							</div>
							<p className="mt-2 mb-0 fs-sm lh-5 c-slate">{project.summary}</p>
							<p className="mt-3 mb-0 fs-xs c-slate" style={MONO_STYLE}>
								{project.stack.join(" · ")}
							</p>
						</div>
					}
				>
					<Mark width={14} height={14} className="c-mint-7 fs-0" />
					<span className="fs-md fw-600 ls-1">{project.name}</span>
				</HoverCard>

				{/* The leader is a background image rather than a border so it can be
				    dotted at a spacing a border-style cannot express. */}
				<span
					aria-hidden="true"
					className="d-b h-px"
					style={{
						flexGrow: 1,
						backgroundImage:
							"linear-gradient(to right, #cbd3d1 0 2px, transparent 2px 6px)",
						backgroundSize: "6px 1px",
					}}
				/>

				{project.href && project.label && (
					<a
						href={project.href}
						target="_blank"
						rel="noreferrer"
						className="d-if ai-c g-1 fs-0 px-2 py-1 br-sm bg-mint-1 fs-xs td-none c-mint-7 h:c-mint tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-mint"
						style={MONO_STYLE}
					>
						{project.label}
						<ArrowUpRight width={11} height={11} strokeWidth={2.4} />
					</a>
				)}
			</div>

			<p className="mt-2 mb-0 max-w-176 fs-sm lh-5 c-slate">
				{project.description}
			</p>
		</div>
	);
}
