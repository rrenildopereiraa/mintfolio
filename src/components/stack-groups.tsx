import type { StackGroup } from "../../content/stack.ts";
import { MONO_STYLE } from "../lib/fonts.ts";
import { StackMark } from "./stack-icons.tsx";

/**
 * The tech stack, grouped.
 *
 * Every entry gets its mark and then the same weight, the same colour and the
 * same size as every other. No proficiency bars, and nothing highlighted —
 * including the CSS framework this template happens to be built with: a stack
 * list stops being information the moment one item is dressed up, and starts
 * being an advertisement.
 */
export function StackGroups({ groups }: { groups: StackGroup[] }) {
	return (
		<div className="d-g g-8 gtc-1 @sm:gtc-2 @md:gtc-4">
			{groups.map((group) => (
				<div key={group.title}>
					<h3
						className="m-0 pb-3 bbw-1 bs-s bc-silver-2 fs-xs fw-500 ls-2 tt-u c-slate"
						style={MONO_STYLE}
					>
						{group.title}
					</h3>
					<ul
						className="d-f fd-c g-2 mt-4 m-0 p-0"
						style={{ listStyle: "none" }}
					>
						{group.items.map((item) => (
							<li key={item} className="d-f ai-c g-2 fs-sm c-zinc-9">
								<StackMark name={item} />
								{item}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
