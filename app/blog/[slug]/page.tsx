import { ArrowLeft } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "../../../site.config.ts";
import { JsonLd } from "../../../src/components/json-ld.tsx";
import { Layout } from "../../../src/components/layout.tsx";
import { MONO_STYLE } from "../../../src/lib/fonts.ts";
import { formatPostDate, getPosts, loadPost } from "../../../src/lib/posts.ts";
import { postSchema } from "../../../src/lib/schema.ts";

type Params = { params: Promise<{ slug: string }> };

/** Every published post is prerendered at build time. */
export async function generateStaticParams() {
	return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const post = await loadPost(slug);
	if (!post) return {};

	const url = `/blog/${post.slug}`;

	return {
		title: post.title,
		description: post.description,
		alternates: { canonical: url },
		openGraph: {
			type: "article",
			url,
			title: post.title,
			description: post.description,
			publishedTime: post.date,
			authors: [site.name],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
		},
	};
}

export default async function PostPage({ params }: Params) {
	const { slug } = await params;
	const post = await loadPost(slug);
	if (!post || post.published === false) notFound();

	const { Content } = post;

	return (
		<Layout backdrop="h-96">
			<JsonLd data={postSchema(post)} />

			{/* Narrower than the rest of the site: this is the one page that is
			    nothing but prose, and a reading measure beats a wide column. */}
			<article className="max-w-160 pt-16 @sm:pt-20">
				<Link
					href="/blog"
					className="d-if ai-c g-2 fs-xs td-none c-slate h:c-mint-7 tp-c tdu-150"
					style={MONO_STYLE}
				>
					<ArrowLeft width={13} height={13} strokeWidth={2.2} />
					Blog
				</Link>

				<h1 className="mt-6 mb-0 fw-800 ls-2 fs-3xl lh-2 tw-b c-zinc-9">
					{post.title}
				</h1>

				<div className="d-f ai-c g-3 mt-4 pb-8 bbw-1 bs-s bc-silver-2">
					<time
						dateTime={post.date}
						className="fs-xs c-slate"
						style={MONO_STYLE}
					>
						{formatPostDate(post.date)}
					</time>
					<span
						aria-hidden="true"
						className="d-b w-1 h-1 br-9999 bg-silver-3"
					/>
					<span className="fs-xs c-slate" style={MONO_STYLE}>
						{site.name}
					</span>
				</div>

				<div className="mt-8">
					<Content />
				</div>
			</article>
		</Layout>
	);
}
