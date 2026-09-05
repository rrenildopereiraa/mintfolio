import { site } from "../../site.config.ts";
import type { Post } from "./posts.ts";

/**
 * Structured data, read from `site.config.ts`. The fixed `@id` is the point:
 * the author and the subject resolve to one person, not two.
 */
const PERSON_ID = `${site.url}/#person`;
const SITE_ID = `${site.url}/#website`;

/** Profiles worth claiming. A `mailto:` is not a profile, so it drops out. */
const profiles = site.socials
	.map((social) => social.href)
	.filter((href) => href.startsWith("http"));

function personNode() {
	return {
		"@type": "Person",
		"@id": PERSON_ID,
		name: site.name,
		url: site.url,
		jobTitle: site.role,
		description: site.description,
		...(site.avatar ? { image: `${site.url}${site.avatar}` } : {}),
		...(site.location ? { address: site.location } : {}),
		sameAs: profiles,
	};
}

function websiteNode() {
	return {
		"@type": "WebSite",
		"@id": SITE_ID,
		url: site.url,
		name: site.title,
		description: site.description,
		inLanguage: "en",
		publisher: { "@id": PERSON_ID },
	};
}

export function homeSchema() {
	return {
		"@context": "https://schema.org",
		"@graph": [personNode(), websiteNode()],
	};
}

/** The archive, described as a blog rather than a page holding links. */
export function blogSchema(posts: Post[]) {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Blog",
				"@id": `${site.url}/blog#blog`,
				url: `${site.url}/blog`,
				name: `Blog · ${site.name}`,
				inLanguage: "en",
				author: { "@id": PERSON_ID },
				isPartOf: { "@id": SITE_ID },
				blogPost: posts.map((post) => ({
					"@type": "BlogPosting",
					headline: post.title,
					description: post.description,
					datePublished: post.date,
					url: `${site.url}/blog/${post.slug}`,
					author: { "@id": PERSON_ID },
				})),
			},
			personNode(),
		],
	};
}

export function postSchema(post: Post) {
	const url = `${site.url}/blog/${post.slug}`;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "BlogPosting",
				headline: post.title,
				description: post.description,
				datePublished: post.date,
				dateModified: post.date,
				url,
				mainEntityOfPage: { "@type": "WebPage", "@id": url },
				inLanguage: "en",
				author: { "@id": PERSON_ID },
				publisher: { "@id": PERSON_ID },
				isPartOf: { "@id": SITE_ID },
			},
			personNode(),
		],
	};
}
