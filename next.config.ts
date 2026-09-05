import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
	options: {
		// Turbopack serialises loader options, so plugins are named rather than
		// imported. The Shiki options below stay plain data for the same reason.
		remarkPlugins: ["remark-gfm"],
		rehypePlugins: [
			[
				"@shikijs/rehype",
				{
					// Any two Shiki themes. `light-dark()` writes both colors onto each
					// token, so code follows the theme with no stylesheet.
					themes: { light: "github-light", dark: "github-dark-dimmed" },
					defaultColor: "light-dark()",
				},
			],
		],
	},
});

export default withMDX(nextConfig);
