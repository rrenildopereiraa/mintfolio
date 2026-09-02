import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "./src/components/mdx-components.tsx";

/**
 * Required by @next/mdx: every MDX file resolves its element mapping through
 * this hook. The mapping itself lives with the other components.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return { ...mdxComponents, ...components };
}
