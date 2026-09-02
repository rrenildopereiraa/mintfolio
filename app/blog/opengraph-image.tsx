import { ImageResponse } from "next/og";
import { site } from "../../site.config.ts";
import { OG_SIZE, OgCard } from "../../src/components/og-card.tsx";
import { getPosts } from "../../src/lib/posts.ts";
import { BLOG_DESCRIPTION } from "./description.ts";

export const alt = `Blog · ${site.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
	const posts = await getPosts();

	return new ImageResponse(
		<OgCard
			eyebrow={`${site.url.replace(/^https?:\/\//, "")}/blog`}
			title="Blog"
			description={BLOG_DESCRIPTION}
			footnote={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
		/>,
		size,
	);
}
