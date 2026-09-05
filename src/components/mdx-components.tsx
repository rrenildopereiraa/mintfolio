import type { MDXComponents } from "mdx/types";
import { MONO_STYLE } from "../lib/fonts.ts";

export const mdxComponents: MDXComponents = {
	h2: (props) => (
		<h2 className="mt-10 mb-3 fw-600 ls-2 fs-xl lh-2 tw-b c-text" {...props} />
	),
	h3: (props) => (
		<h3 className="mt-8 mb-2 fw-600 ls-2 fs-lg lh-2 tw-b c-text" {...props} />
	),
	p: (props) => (
		<p className="mt-0 mb-4 fs-md lh-5 tw-p c-text-dim" {...props} />
	),
	ul: (props) => (
		<ul className="mt-0 mb-4 pl-5 fs-md lh-5 c-text-dim" {...props} />
	),
	ol: (props) => (
		<ol className="mt-0 mb-4 pl-5 fs-md lh-5 c-text-dim" {...props} />
	),
	li: (props) => <li className="mb-1" {...props} />,
	strong: (props) => <strong className="fw-500 c-text" {...props} />,
	a: (props) => (
		<a
			className="td-none bbw-1 bs-s bc-accent/50 c-text h:c-accent h:bc-accent tp-c tdu-150"
			{...props}
		/>
	),
	blockquote: (props) => (
		<blockquote
			className="mx-0 mt-0 mb-4 pl-4 blw-2 bs-s bc-accent/40 c-text-dim"
			{...props}
		/>
	),
	hr: () => <hr className="mx-0 my-8 h-px bw-0 bg-border" />,

	/**
	 * Merges with Shiki's own class and style. The theme's block background is
	 * dropped so code sits on the site's surface in both themes.
	 */
	pre: ({ className, style, ...props }) => {
		const { backgroundColor: _drop, ...rest } = style ?? {};

		return (
			<pre
				className={`ox-auto mt-0 mb-4 p-4 bw-1 bs-s bc-border br-lg bg-surface-2 fs-xs lh-5 ${className ?? ""}`}
				style={{ ...rest, ...MONO_STYLE, tabSize: 2 }}
				{...props}
			/>
		);
	},

	/**
	 * Inline code only. A fenced block holds Shiki's spans and is already styled
	 * by `pre`; boxing it again would draw a box inside a box.
	 */
	code: ({ children, ...props }) =>
		typeof children === "string" ? (
			<code
				className="px-1 br-sm bg-surface-2 c-accent"
				style={{ ...MONO_STYLE, fontSize: "0.875em" }}
				{...props}
			>
				{children}
			</code>
		) : (
			<code {...props}>{children}</code>
		),

	table: (props) => (
		<div className="ox-auto mt-0 mb-4">
			<table className="w-100% fs-sm c-text-dim" {...props} />
		</div>
	),
	th: (props) => (
		<th
			className="py-2 pr-4 ta-l bbw-1 bs-s bc-border fw-500 fs-xs c-text"
			style={MONO_STYLE}
			{...props}
		/>
	),
	td: (props) => (
		<td className="py-2 pr-4 bbw-1 bs-s bc-border va-t" {...props} />
	),
};
