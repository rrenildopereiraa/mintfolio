import { ImageResponse } from "next/og";
import { site } from "../../../site.config.ts";
import { OG_SIZE, OgCard } from "../../../src/components/og-card.tsx";
import { formatPostDate, getPosts, loadPost } from "../../../src/lib/posts.ts";

type Params = { params: Promise<{ slug: string }> };

export const size = OG_SIZE;
export const contentType = "image/png";

/** Built at deploy time, so the first crawler to arrive gets a finished card. */
export async function generateStaticParams() {
	return (await getPosts()).map((post) => ({ slug: post.slug }));
}

/** Per-post alt text: what a screen reader reads when the link is shared. */
export async function generateImageMetadata({ params }: Params) {
	const { slug } = await params;
	const post = await loadPost(slug);

	return [
		{
			id: "card",
			alt: post ? `${post.title} · ${site.name}` : site.name,
			size: OG_SIZE,
			contentType: "image/png",
		},
	];
}

export default async function Image({ params }: Params) {
	const { slug } = await params;
	const post = await loadPost(slug);

	return new ImageResponse(
		<OgCard
			eyebrow={`${site.url.replace(/^https?:\/\//, "")}/blog`}
			title={post?.title ?? "Blog"}
			description={post?.description ?? ""}
			footnote={post ? formatPostDate(post.date) : site.name}
		/>,
		OG_SIZE,
	);
}
