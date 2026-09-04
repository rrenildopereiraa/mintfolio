import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "../site.config.ts";
import { Providers } from "../src/components/providers.tsx";
import { SANS } from "../src/lib/fonts.ts";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: site.title,
		// Post pages fill the %s, so a shared post reads as its own title.
		template: `%s · ${site.name}`,
	},
	description: site.description,
	authors: [{ name: site.name, url: site.url }],
	// Points the tab icon at `public/favicon.svg`. Without a declared icon the
	// browser goes looking for `/favicon.ico` on every page load and 404s.
	icons: { icon: "/favicon.svg" },
	alternates: {
		canonical: "/",
		types: { "application/rss+xml": "/feed.xml" },
	},
	// No `images` on either of these: app/opengraph-image.tsx fills in og:image
	// for every route that doesn't ship its own card, and the Twitter crawler
	// falls back to og:image when twitter:image is absent.
	openGraph: {
		type: "website",
		url: site.url,
		title: site.title,
		description: site.description,
		siteName: site.name,
	},
	twitter: {
		card: "summary_large_image",
		title: site.title,
		description: site.description,
	},
};

export const viewport: Viewport = {
	themeColor: site.themeColor,
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			{/* The family is set here rather than in a stylesheet: Yumma's
			    `theme` takes colors and screens, not families, so `ff-d` could
			    only ever be its own built-in stack. Everything inherits this,
			    which is why no heading names a font. */}
			<body style={{ fontFamily: SANS, WebkitFontSmoothing: "antialiased" }}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
