import { site } from "../../site.config.ts";
import { getPosts } from "../../src/lib/posts.ts";

/** Built once, alongside the pages, rather than on every request. */
export const dynamic = "force-static";

const FEED_URL = `${site.url}/feed.xml`;

function escapeXml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/**
 * RSS, because a reader is still how a fair number of people keep up with a
 * blog, and because feed aggregators are one of the few places a new site gets
 * picked up without having to ask anyone.
 */
export async function GET() {
	const posts = await getPosts();

	const items = posts
		.map((post) => {
			const url = `${site.url}/blog/${post.slug}`;

			// RFC 822, which is what RSS wants, not the ISO date the posts carry.
			return `		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<description>${escapeXml(post.description)}</description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>`;
		})
		.join("\n");

	// Dated from the newest post rather than from the clock, so a redeploy that
	// changes nothing doesn't tell every reader the feed is new.
	const updated = posts[0] ? new Date(posts[0].date) : new Date(0);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(site.name)}</title>
		<link>${site.url}</link>
		<description>${escapeXml(site.description)}</description>
		<language>en</language>
		<lastBuildDate>${updated.toUTCString()}</lastBuildDate>
		<atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: { "content-type": "application/rss+xml; charset=utf-8" },
	});
}
