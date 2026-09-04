import {
	ArrowRight,
	Download,
	PathArrow,
	Post,
	Suitcase,
	UserLove,
} from "iconoir-react";
import Link from "next/link";
import { experience } from "../content/experience.ts";
import { projects } from "../content/projects.ts";
import { site } from "../site.config.ts";
import { ExperienceList } from "../src/components/experience-list.tsx";
import { JsonLd } from "../src/components/json-ld.tsx";
import { Layout, SectionHeading } from "../src/components/layout.tsx";
import { PostList } from "../src/components/post-card.tsx";
import { ProjectRow } from "../src/components/project-row.tsx";
import { Signature } from "../src/components/signature.tsx";
import { SocialLinks } from "../src/components/social-links.tsx";
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

	return (
		<Layout backdrop="h-140">
			<JsonLd data={homeSchema()} />

			{/* The hero is prose, not a slogan. Two short lines and a paragraph,
			    with the name carrying the one piece of art direction. */}
			<header id="top" className="pt-14 @sm:pt-16">
				<h1 className="m-0 fw-600 ls-1 fs-4xl lh-2 c-text @sm:fs-5xl">
					{site.headline.greeting}
					<br />
					{site.headline.intro}{" "}
					<span className="c-accent" style={SERIF_ITALIC}>
						{site.headline.accent}
					</span>
					.
				</h1>

				<p className="mt-6 mb-0 fs-lg lh-6 c-text-dim">{site.intro}</p>
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
					action={
						// The one download on the page, put where the sentence beside
						// it already says to look. In the hero it was a third line
						// competing with the introduction.
						<a
							href="/cv.pdf"
							className="d-if ai-c g-2 fs-0 px-3 py-1 br-9999 bw-1 bs-s bc-border bg-surface fs-xs td-none c-text h:bc-accent h:c-accent tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
							style={MONO_STYLE}
						>
							My CV
							<Download width={12} height={12} strokeWidth={2.2} />
						</a>
					}
				/>
				<div className="mt-6">
					<ExperienceList roles={experience} />
				</div>
			</section>

			{recent.length > 0 && (
				<section id="blog" className={SECTION}>
					<SectionHeading
						label="Writing"
						number="03"
						icon={Post}
						description="Some notes, when I have the time."
						action={
							<Link
								href="/blog"
								className="d-if ai-c g-2 fs-0 fs-xs td-none c-text-dim h:c-accent tp-c tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
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
				<SectionHeading label="About" number="04" icon={UserLove} />

				<div className="mt-6">
					{site.about.map((paragraph) => (
						<p
							key={paragraph.slice(0, 32)}
							className="mt-0 mb-4 fs-sm lh-6 c-text-dim"
						>
							{paragraph}
						</p>
					))}

					<SocialLinks contributions={1284} />

					<Signature />
				</div>
			</section>
		</Layout>
	);
}
