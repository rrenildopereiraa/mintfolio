/**
 * Renders a structured data block.
 *
 * JSON-LD has to reach the document as a raw script body, so there is no way
 * to write this without `dangerouslySetInnerHTML`. What makes it safe is the
 * serialisation: the value is a JSON string, and the `<` escape means a title
 * containing one can't close the script tag early and put whatever followed it
 * into the page.
 */
export function JsonLd({ data }: { data: object }) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: see above, the value is serialised JSON with `<` escaped.
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, "\\u003c"),
			}}
		/>
	);
}
