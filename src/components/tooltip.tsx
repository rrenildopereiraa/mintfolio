"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import { MONO_STYLE } from "../lib/fonts.ts";
import { useReducedMotion } from "../lib/use-media-query.ts";

export function Tooltip({
	content,
	popupClassName,
	children,
}: {
	/** A line of text, or anything else worth showing on hover. */
	content: ReactNode;
	/**
	 * Replaces the popup's own padding and type styles. For content that isn't
	 * a line of text, like a graph, which brings its own.
	 */
	popupClassName?: string;
	children: ReactElement;
}) {
	const reduced = useReducedMotion();

	return (
		<BaseTooltip.Root>
			<BaseTooltip.Trigger render={children} />
			<BaseTooltip.Portal>
				<BaseTooltip.Positioner sideOffset={8} className="zi-90">
					{/* Styled from Base UI's state rather than `[data-starting-style]`,
					    the one selector shape Yumma CSS cannot describe. */}
					<BaseTooltip.Popup
						className={`bw-1 bs-s bc-border br-md bg-surface us-none ${
							popupClassName ?? "px-2 py-1 fs-xs c-text-dim"
						}`}
						render={(props, state) => {
							const moving =
								state.transitionStatus === "starting" ||
								state.transitionStatus === "ending";

							return (
								<div
									{...props}
									style={{
										...props.style,
										...MONO_STYLE,
										opacity: moving ? 0 : 1,
										transform: moving ? "translateY(2px) scale(0.98)" : "none",
										transition: reduced
											? "none"
											: "opacity 120ms ease, transform 120ms ease",
									}}
								/>
							);
						}}
					>
						{content}
					</BaseTooltip.Popup>
				</BaseTooltip.Positioner>
			</BaseTooltip.Portal>
		</BaseTooltip.Root>
	);
}
