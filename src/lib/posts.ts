import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

export type PostMeta = {
	title: string;
	/** One line, shown under the title and in every list. */
	description: string;
	/** ISO date, e.g. "2025-11-18". */
	date: string;
	/** Set false to keep a draft out of the site entirely. */
	published?: boolean;
};

export type Post = PostMeta & { slug: string };

export type LoadedPost = Post & { Content: ComponentType };

const POSTS_DIR = path.join(process.cwd(), "content/posts");

const LONG_DATE = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "short",
	year: "numeric",
});

/** "2025-11-18" -> "18 Nov 2025", without a timezone shifting the day. */
export function formatPostDate(date: string) {
	const [year, month, day] = date.split("-").map(Number);
	return LONG_DATE.format(
		new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1)),
	);
}

/**
 * Posts are MDX files that export their own `meta`, so there is no frontmatter
 * to parse and the metadata is type-checked like everything else.
 *
 * The directory is read on the server and each file imported by name. The
 * dynamic import is a template literal on purpose: the bundler turns that into
 * a context over the folder, so dropping a new .mdx file into `content/posts`
 * is all it takes to publish.
 */
async function slugs(): Promise<string[]> {
	const entries = await readdir(POSTS_DIR);
	return entries
		.filter((entry) => entry.endsWith(".mdx"))
		.map((entry) => entry.replace(/\.mdx$/, ""));
}

export async function loadPost(slug: string): Promise<LoadedPost | undefined> {
	// Guard the dynamic import: `slug` comes from the URL, and without this a
	// crafted value could reach into the module context.
	if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
	if (!(await slugs()).includes(slug)) return undefined;

	const loaded = await import(`../../content/posts/${slug}.mdx`);
	if (!loaded.meta) {
		throw new Error(
			`content/posts/${slug}.mdx is missing its \`meta\` export.`,
		);
	}

	return { ...(loaded.meta as PostMeta), slug, Content: loaded.default };
}

/** Published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
	const all = await Promise.all(
		(await slugs()).map(async (slug) => {
			const post = await loadPost(slug);
			if (!post) return undefined;
			const { Content: _Content, ...rest } = post;
			return rest;
		}),
	);

	return all
		.filter((post): post is Post => post !== undefined)
		.filter((post) => post.published !== false)
		.sort((a, b) => b.date.localeCompare(a.date));
}
