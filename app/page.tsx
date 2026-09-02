import { ArrowRight, Download, MapPin } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { experience } from "../content/experience.ts";
import { projects } from "../content/projects.ts";
import { skills } from "../content/skills.ts";
import { site } from "../site.config.ts";
import { ExperienceList } from "../src/components/experience-list.tsx";
import { GridBackdrop } from "../src/components/grid-backdrop.tsx";
import { JsonLd } from "../src/components/json-ld.tsx";
import { Layout, SectionHeading } from "../src/components/layout.tsx";
import { PostList } from "../src/components/post-card.tsx";
import { ProjectCard } from "../src/components/project-card.tsx";
import { SkillGroups } from "../src/components/skill-groups.tsx";
import { MONO_STYLE } from "../src/lib/fonts.ts";
import { getPosts } from "../src/lib/posts.ts";
import { homeSchema } from "../src/lib/schema.ts";

/** How many posts the home page shows before sending you to the archive. */
const RECENT_POSTS = 3;

const SECTION = "p-r pt-20 smt-20 @sm:pt-28";

export default async function Home() {
	const posts = await getPosts();
	const recent = posts.slice(0, RECENT_POSTS);

	return (
		<Layout backdrop="h-176">
			<JsonLd data={homeSchema()} />

			<header id="top" className="p-r pt-16 pb-4 @sm:pt-24">
				<div className="p-r zi-10">
					<p className="d-f ai-c g-2 m-0 fs-xs c-text-dim" style={MONO_STYLE}>
						<MapPin width={13} height={13} strokeWidth={2} />
						{site.location}
					</p>

					<h1 className="mt-5 mb-0 max-w-192 fw-800 ls-2 fs-4xl lh-1 tw-b c-text @sm:fs-6xl">
						{site.headline.lead}{" "}
						<span className="c-accent">{site.headline.accent}</span>
						{site.headline.tail}
					</h1>

					<p className="mt-6 mb-0 max-w-160 fs-lg lh-5 tw-p c-text-dim">
						{site.intro}
					</p>

					<div className="d-f fw-w ai-c g-3 mt-8">
						<a
							href={`mailto:${site.email}`}
							className="d-if ai-c g-2 px-4 py-2 br-9999 bg-accent fs-sm fw-600 td-none c-on-accent h:bg-accent-dim tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
						>
							Get in touch
						</a>
						<a
							href="/cv.pdf"
							className="d-if ai-c g-2 px-4 py-2 br-9999 bw-1 bs-s bc-border bg-surface fs-sm fw-500 td-none c-text h:bc-border-strong tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-accent"
						>
							<Download width={15} height={15} strokeWidth={2} />
							Download CV
						</a>
					</div>
				</div>
			</header>

			<section id="work" className={SECTION}>
				<SectionHeading
					label="Work"
					title="Selected projects"
					description="Things I built, maintain, or broke and then fixed."
				/>

				<div className="d-g g-4 gtc-1 @md:gtc-2">
					{projects.map((project) => (
						<ProjectCard key={project.name} project={project} />
					))}
				</div>
			</section>

			<section id="experience" className={SECTION}>
				<SectionHeading
					label="Experience"
					title="Where I've worked"
					description="The short version. The full history is in the CV."
				/>
				<ExperienceList roles={experience} />
			</section>

			<section id="skills" className={SECTION}>
				<SectionHeading
					label="Stack"
					title="Tools I reach for"
					description="Not everything I've touched, just what I'd be comfortable being called at 3am about."
				/>
				<SkillGroups groups={skills} />
			</section>

			{recent.length > 0 && (
				<section id="blog" className={SECTION}>
					<SectionHeading
						label="Writing"
						title="Notes"
						description="Occasional posts about building things and the parts that went wrong."
						action={
							<Link
								href="/blog"
								className="d-if ai-c g-2 fs-xs td-none c-accent h:c-accent-dim tp-c tdu-150"
								style={MONO_STYLE}
							>
								All posts
								<ArrowRight width={13} height={13} strokeWidth={2.2} />
							</Link>
						}
					/>
					<PostList posts={recent} />
				</section>
			)}

			<section id="about" className={SECTION}>
				<SectionHeading label="About" title="A bit more" />

				<div className="d-g g-8 gtc-1 @md:gtc-3">
					<div className="@md:gc-s-2">
						{site.about.map((paragraph) => (
							<p
								key={paragraph.slice(0, 32)}
								className="mt-0 mb-4 max-w-176 fs-md lh-6 tw-p c-text-dim"
							>
								{paragraph}
							</p>
						))}
					</div>

					<div className="p-r p-5 br-lg bw-1 bs-s bc-border bg-surface o-h">
						<GridBackdrop height="h-40" bleed={false} />
						<div className="p-r zi-10">
							{/* Dropped entirely when `site.avatar` is an empty string, which
							    is how the config offers to leave the photo out. */}
							{site.avatar && (
								<Image
									src={site.avatar}
									alt={site.name}
									width={56}
									height={56}
									className="d-b mb-4 w-14 h-14 br-9999 bw-1 bs-s bc-border"
									// Yumma has no object-fit utility, and without it a photo
									// that isn't square gets squashed rather than cropped.
									style={{ objectFit: "cover" }}
								/>
							)}

							<p className="m-0 fs-xs ls-2 tt-u c-text-dim" style={MONO_STYLE}>
								Contact
							</p>
							<a
								href={`mailto:${site.email}`}
								className="d-b mt-3 fs-sm fw-600 td-none c-text h:c-accent tp-c tdu-150"
							>
								{site.email}
							</a>

							<div className="d-f fw-w g-3 mt-5 pt-4 btw-1 bs-s bc-border">
								{site.socials
									.filter((social) => social.href.startsWith("http"))
									.map((social) => (
										<a
											key={social.label}
											href={social.href}
											target="_blank"
											rel="noreferrer"
											className="fs-xs td-none c-text-dim h:c-accent tp-c tdu-150"
											style={MONO_STYLE}
										>
											{social.label}
										</a>
									))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
