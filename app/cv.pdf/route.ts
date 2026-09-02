import { renderToBuffer } from "@react-pdf/renderer";
import { cv } from "../../cv.config.ts";
import { CvDocument } from "../../src/components/cv-document.tsx";

/** Rendered once at build time, like every other route here. */
export const dynamic = "force-static";

/**
 * The CV, as a file rather than a page.
 *
 * There is deliberately no route that renders it as HTML. The portfolio is the
 * thing to look at; this is the thing to attach to an application, and keeping
 * them apart means the CV can be laid out for print and for parsers without
 * either concern leaking into the site.
 */
export async function GET() {
	const pdf = await renderToBuffer(CvDocument());

	return new Response(pdf as unknown as BodyInit, {
		headers: {
			"content-type": "application/pdf",
			// `attachment` so the link downloads rather than opening a viewer,
			// under a name that reads properly in someone's downloads folder.
			// Swap it for `inline` to preview it in the browser instead.
			"content-disposition": `attachment; filename="${cv.fileName}.pdf"`,
		},
	});
}
