import { StackMark } from "./stack-icons.tsx";

/**
 * The stack, as one wrapped row.
 *
 * No columns, no group headings, no proficiency bars, and nothing highlighted
 * — including the CSS framework this template happens to be built with. Every
 * name gets its mark and then exactly the same weight, colour and size as the
 * rest: a stack list stops being information the moment one item is dressed
 * up, and starts being an advertisement.
 */
export function StackList({ items }: { items: string[] }) {
	return (
		<ul
			className="d-f fw-w m-0 p-0"
			style={{ listStyle: "none", columnGap: 28, rowGap: 14 }}
		>
			{items.map((item) => (
				<li key={item} className="d-f ai-c g-2 fs-sm c-zinc-9">
					<StackMark name={item} />
					{item}
				</li>
			))}
		</ul>
	);
}
