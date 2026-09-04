import { ArrowLeft } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../src/components/json-ld.tsx";
import { Layout } from "../../src/components/layout.tsx";
import { PostList } from "../../src/components/post-card.tsx";
import { MONO_STYLE } from "../../src/lib/fonts.ts";
import { getPosts } from "../../src/lib/posts.ts";
import { blogSchema } from "../../src/lib/schema.ts";
import { BLOG_DESCRIPTION } from "./description.ts";

export const metadata: Metadata = {
	title: "Blog",
	description: BLOG_DESCRIPTION,
	alternates: { canonical: "/blog" },
	openGraph: {
		type: "website",
		url: "/blog",
		title: "Blog",
		description: BLOG_DESCRIPTION,
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog",
		description: BLOG_DESCRIPTION,
	},
};

export default async function BlogPage() {
	const posts = await getPosts();

	return (
		<Layout backdrop="h-96">
			<JsonLd data={blogSchema(posts)} />

			<article className="pt-16 @sm:pt-20">
				<Link
					href="/"
					className="d-if ai-c g-2 fs-xs td-none c-text-dim h:c-accent tp-c tdu-150"
					style={MONO_STYLE}
				>
					<ArrowLeft width={13} height={13} strokeWidth={2.2} />
					Home
				</Link>

				<h1 className="mt-6 mb-0 fw-800 ls-2 fs-4xl lh-2 tw-b c-text">Blog</h1>
				<p className="mt-3 mb-10 max-w-160 fs-lg lh-5 tw-p c-text-dim">
					{BLOG_DESCRIPTION}
				</p>

				{posts.length > 0 ? (
					<PostList posts={posts} />
				) : (
					<p className="m-0 fs-sm c-text-dim">
						Nothing published yet. Add an `.mdx` file to `content/posts`.
					</p>
				)}
			</article>
		</Layout>
	);
}
