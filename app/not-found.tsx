import { ArrowLeft } from "iconoir-react";
import Link from "next/link";
import { Layout } from "../src/components/layout.tsx";
import { MONO_STYLE } from "../src/lib/fonts.ts";

export default function NotFound() {
	return (
		<Layout>
			<div className="pt-24 pb-16">
				<p className="m-0 fs-xs ls-3 tt-u c-mint-7" style={MONO_STYLE}>
					404
				</p>
				<h1 className="mt-4 mb-0 fw-800 ls-2 fs-4xl lh-2 c-zinc-9">
					Nothing here
				</h1>
				<p className="mt-4 mb-0 max-w-160 fs-lg lh-5 c-slate">
					That page doesn't exist, or it hasn't been published yet.
				</p>
				<Link
					href="/"
					className="d-if ai-c g-2 mt-8 px-4 py-2 br-9999 bw-1 bs-s bc-silver-2 bg-white fs-sm fw-500 td-none c-zinc-9 h:bc-silver-3 tp-a tdu-150 fv:os-s fv:oo-2 fv:oc-mint"
				>
					<ArrowLeft width={15} height={15} strokeWidth={2} />
					Back home
				</Link>
			</div>
		</Layout>
	);
}
