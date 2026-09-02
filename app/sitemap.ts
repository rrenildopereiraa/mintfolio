import type { MetadataRoute } from "next";
import { site } from "../site.config.ts";
import { getPosts } from "../src/lib/posts.ts";

/**
 * Generated rather than hand-written, so a new post is listed the moment it
 * ships. The old static public/sitemap.xml only ever knew about the homepage.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts();

	const latest = posts[0] ? new Date(posts[0].date) : new Date();

	return [
		{
			url: site.url,
			lastModified: latest,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${site.url}/blog`,
			lastModified: latest,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		...posts.map((post) => ({
			url: `${site.url}/blog/${post.slug}`,
			lastModified: new Date(post.date),
			changeFrequency: "yearly" as const,
			priority: 0.8,
		})),
	];
}
