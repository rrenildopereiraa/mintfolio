import Link from "next/link";
import { MONO_STYLE } from "../lib/fonts.ts";
import { formatPostDate, type Post } from "../lib/posts.ts";

/** One post. The whole row is the target, which is easier to hit on a phone. */
export function PostCard({ post }: { post: Post }) {
	return (
		<Link
			href={`/blog/${post.slug}`}
			className="d-f fd-c g-2 mx--3 px-3 py-4 br-lg td-none c-text h:bg-surface-2 tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-accent @sm:fd-r @sm:ai-b @sm:g-6"
		>
			{/* Fixed width on wide screens so short dates don't shunt the titles
			    left and leave the column ragged. */}
			<time
				dateTime={post.date}
				className="fs-0 fs-xs c-text-dim @sm:w-24"
				style={MONO_STYLE}
			>
				{formatPostDate(post.date)}
			</time>

			<span className="d-f fd-c g-1">
				<span className="fw-600 fs-md lh-3 c-text">{post.title}</span>
				<span className="fs-sm lh-5 c-text-dim">{post.description}</span>
			</span>
		</Link>
	);
}

/** The list wrapper, so the home page and the archive stay identical. */
export function PostList({ posts }: { posts: Post[] }) {
	return (
		<div className="d-f fd-c">
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	);
}
