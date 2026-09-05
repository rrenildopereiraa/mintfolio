/**
 * A structured data block. `dangerouslySetInnerHTML` is unavoidable here; the
 * `<` escape below is what stops a title closing the script tag early.
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
