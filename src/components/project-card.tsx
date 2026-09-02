import { ArrowUpRight } from "iconoir-react";
import type { Project } from "../../content/projects.ts";
import { MONO_STYLE } from "../lib/fonts.ts";

/**
 * One project.
 *
 * A `featured` project spans both columns of the grid and gets a slightly
 * larger title; everything else about the card is identical, so the page has
 * emphasis without two different components to keep in sync.
 *
 * Renders as a link when the project has an `href`, and as a plain article
 * when it doesn't, which is how closed-source work stays on the page without
 * a dead link.
 */
export function ProjectCard({ project }: { project: Project }) {
	const linked = Boolean(project.href);

	const body = (
		<>
			<div className="d-f ai-fs jc-sb g-3">
				<h3
					className={`m-0 fw-700 ls-1 c-text ${project.featured ? "fs-lg" : "fs-md"}`}
				>
					{project.name}
				</h3>
				{project.period && (
					<span
						className="fs-0 fs-xs c-text-dim"
						style={MONO_STYLE}
						title={project.period}
					>
						{project.period}
					</span>
				)}
			</div>

			<p className="mt-3 mb-0 f-1 fs-sm lh-5 c-text-dim">
				{project.description}
			</p>

			<div className="d-f fw-w ai-c g-2 mt-5">
				{project.stack.map((item) => (
					<span
						key={item}
						className="px-2 py-1 br-sm bg-surface-2 fs-xs c-text-dim"
						style={MONO_STYLE}
					>
						{item}
					</span>
				))}
			</div>

			{project.label && (
				<span
					className="d-f ai-c g-2 mt-5 pt-4 btw-1 bs-s bc-border fs-xs c-accent"
					style={MONO_STYLE}
				>
					<span className="o-h to-e ws-nw">{project.label}</span>
					<ArrowUpRight
						width={13}
						height={13}
						strokeWidth={2.2}
						className="fs-0"
					/>
				</span>
			)}
		</>
	);

	const shell = `d-f fd-c h-100% p-5 br-lg bw-1 bs-s bc-border bg-surface ${
		project.featured ? "@md:gc-s-2" : ""
	}`;

	if (!linked) {
		return <article className={shell}>{body}</article>;
	}

	return (
		<a
			href={project.href}
			target="_blank"
			rel="noreferrer"
			className={`${shell} td-none c-text h:bc-border-strong tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-accent`}
		>
			{body}
		</a>
	);
}
