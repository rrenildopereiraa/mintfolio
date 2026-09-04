import {
	ArrowRight,
	Component,
	PathArrow,
	Post,
	Suitcase,
	UserLove,
} from "iconoir-react";
import Link from "next/link";
import { experience } from "../content/experience.ts";
import { projects } from "../content/projects.ts";
import { stack } from "../content/stack.ts";
import { site } from "../site.config.ts";
import { Contributions } from "../src/components/contributions.tsx";
import { ExperienceList } from "../src/components/experience-list.tsx";
import { HoverCard } from "../src/components/hover-card.tsx";
import { GitHub } from "../src/components/icons.tsx";
import { JsonLd } from "../src/components/json-ld.tsx";
import { Layout, SectionHeading } from "../src/components/layout.tsx";
import { PostList } from "../src/components/post-card.tsx";
import { ProjectRow } from "../src/components/project-row.tsx";
import { Signature } from "../src/components/signature.tsx";
import { StackList } from "../src/components/stack-list.tsx";
import { MONO_STYLE, SERIF_ITALIC } from "../src/lib/fonts.ts";
import { getPosts } from "../src/lib/posts.ts";
import { homeSchema } from "../src/lib/schema.ts";

/** How many posts the home page shows before sending you to the archive. */
const RECENT_POSTS = 3;

/** One rhythm between sections, set once. */
const SECTION = "pt-20 @sm:pt-24";

export default async function Home() {
	const posts = await getPosts();
	const recent = posts.slice(0, RECENT_POSTS);
	const github = site.socials.find((s) => s.label === "GitHub");

	return (
		<Layout backdrop="h-140">
			<JsonLd data={homeSchema()} />

			{/* The hero is prose, not a slogan. Two short lines and a paragraph,
			    with the name carrying the one piece of art direction. */}
			<header id="top" className="pt-14 @sm:pt-16">
				<h1 className="m-0 fw-600 ls-1 fs-4xl lh-2 c-zinc-9 @sm:fs-5xl">
					{site.headline.greeting}
					<br />
					{site.headline.intro}{" "}
					<span className="c-mint-7" style={SERIF_ITALIC}>
						{site.headline.accent}
					</span>
					.
				</h1>

				<p className="mt-6 mb-0 fs-lg lh-6 c-slate">{site.intro}</p>

				<p className="mt-5 mb-0 fs-sm lh-5 c-slate">
					Hiring, or just curious? Here&rsquo;s{" "}
					<a
						href="/cv.pdf"
						className="td-none bbw-1 bs-s bc-silver-3 c-zinc-9 h:bc-mint tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-mint"
					>
						my CV
					</a>
					.
				</p>
			</header>

			<section id="projects" className={SECTION}>
				<SectionHeading
					label="Projects"
					number="01"
					icon={Suitcase}
					description="Things I built, maintain, or broke and then fixed."
				/>
				<div className="mt-6">
					{projects.map((project) => (
						<ProjectRow key={project.name} project={project} />
					))}
				</div>
			</section>

			<section id="experience" className={SECTION}>
				<SectionHeading
					label="Experience"
					number="02"
					icon={PathArrow}
					description="The short version. The full history is in the CV."
				/>
				<div className="mt-6">
					<ExperienceList roles={experience} />
				</div>
			</section>

			<section id="stack" className={SECTION}>
				<SectionHeading
					label="My stack"
					number="03"
					icon={Component}
					description="What I reach for, not everything I have touched."
				/>
				<div className="mt-6">
					<StackList items={stack} />
				</div>
			</section>

			{recent.length > 0 && (
				<section id="blog" className={SECTION}>
					<SectionHeading
						label="Writing"
						number="04"
						icon={Post}
						description="Some notes, when I have the time."
						action={
							<Link
								href="/blog"
								className="d-if ai-c g-2 fs-0 fs-xs td-none c-slate h:c-mint-7 tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-mint"
								style={MONO_STYLE}
							>
								All posts
								<ArrowRight width={12} height={12} strokeWidth={2.2} />
							</Link>
						}
					/>
					<div className="mt-6">
						<PostList posts={recent} />
					</div>
				</section>
			)}

			<section id="about" className={SECTION}>
				<SectionHeading label="About" number="05" icon={UserLove} />

				<div className="mt-6">
					{site.about.map((paragraph) => (
						<p
							key={paragraph.slice(0, 32)}
							className="mt-0 mb-4 fs-sm lh-6 c-slate"
						>
							{paragraph}
						</p>
					))}

					{/* The contribution graph hangs off the GitHub link rather than
					    taking a section of its own: it is a detail worth finding, not
					    a headline. */}
					<p className="mt-0 mb-0 fs-sm lh-6 c-slate">
						You can find me on{" "}
						{github ? (
							<HoverCard width={500} card={<Contributions total={1284} />}>
								<a
									href={github.href}
									target="_blank"
									rel="noreferrer"
									className="d-if ai-c g-2 td-none c-zinc-9 fv:os-s fv:oo-2 fv:oc-mint"
								>
									<GitHub width={15} height={15} className="fs-0" />
									<span className="fw-500 h:c-mint-7 tp-c tdu-150">GitHub</span>
								</a>
							</HoverCard>
						) : (
							"GitHub"
						)}
						, or say hello over email.
					</p>

					<Signature />
				</div>
			</section>
		</Layout>
	);
}
