import { renderToBuffer } from "@react-pdf/renderer";
import { cv } from "../../cv.config.ts";
import { CvDocument } from "../../src/components/cv-document.tsx";

/** Rendered once at build time, like every other route here. */
export const dynamic = "force-static";

/**
 * The CV as a file, not a page: laid out for print and for parsers.
 */
export async function GET() {
	const pdf = await renderToBuffer(CvDocument());

	return new Response(pdf as unknown as BodyInit, {
		headers: {
			"content-type": "application/pdf",
			// `attachment` downloads it; swap for `inline` to preview in the browser.
			"content-disposition": `attachment; filename="${cv.fileName}.pdf"`,
		},
	});
}
