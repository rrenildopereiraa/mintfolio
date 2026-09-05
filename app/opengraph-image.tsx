import { ImageResponse } from "next/og";
import { site } from "../site.config.ts";
import { OG_COLOR, OG_SIZE, OgCard } from "../src/components/og-card.tsx";

export const alt = `${site.name} · ${site.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		<OgCard
			eyebrow={site.url.replace(/^https?:\/\//, "")}
			title={
				// Two boxes with a column gap: Satori lays each text node out
				// separately, so literal spaces around the tint come out too wide.
				<span
					style={{
						display: "flex",
						flexWrap: "wrap",
						columnGap: 16,
						rowGap: 4,
					}}
				>
					<span>{`${site.headline.greeting} ${site.headline.intro}`}</span>
					<span style={{ color: OG_COLOR.accent }}>
						{`${site.headline.accent}.`}
					</span>
				</span>
			}
			description={site.description}
			footnote={`${site.name} · ${site.role}`}
		/>,
		size,
	);
}
