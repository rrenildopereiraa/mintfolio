import { ImageResponse } from "next/og";
import { site } from "../../../site.config.ts";
import { OG_SIZE, OgCard } from "../../../src/components/og-card.tsx";
import { formatPostDate, getPosts, loadPost } from "../../../src/lib/posts.ts";

type Params = { params: Promise<{ slug: string }> };

export const size = OG_SIZE;
export const contentType = "image/png";

/**
 * Without this the card is built on first request instead of at deploy time,
 * and the first request is usually the crawler that decides what the link
 * looks like everywhere it gets pasted.
 */
export async function generateStaticParams() {
	return (await getPosts()).map((post) => ({ slug: post.slug }));
}

/**
 * One card per post, described by that post. A static `alt` export could only
 * ever say something generic, and this is the text a screen reader reads out
 * when the link is shared.
 */
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
