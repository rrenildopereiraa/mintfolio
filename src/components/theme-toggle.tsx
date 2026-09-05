"use client";

import { Button } from "@base-ui/react/button";
import { Computer, HalfMoon, SunLight } from "iconoir-react";
import type { ColorScheme } from "../lib/theme.ts";
import { useColorScheme } from "../lib/use-color-scheme.ts";
import { Tooltip } from "./tooltip.tsx";

/**
 * Three states rather than two: light, dark, and following the system.
 *
 * A two-state switch has no way back to "whatever the OS says", so a reader
 * who taps it once is pinned to a fixed theme forever. The third state is the
 * default, and the one most people should stay on.
 */
const ICON: Record<ColorScheme, typeof SunLight> = {
	light: SunLight,
	dark: HalfMoon,
	auto: Computer,
};

const LABEL: Record<ColorScheme, string> = {
	light: "Light theme, click for dark",
	dark: "Dark theme, click for auto",
	auto: "Follow system, click for light",
};

export function ThemeToggle() {
	const { scheme, cycle } = useColorScheme();
	const Icon = ICON[scheme];

	return (
		<Tooltip content={LABEL[scheme]}>
			<Button
				onClick={cycle}
				aria-label={LABEL[scheme]}
				// `p-0` is load-bearing: a <button> carries the user agent's own
				// horizontal padding, and with the icon as a flex item that padding
				// eats into it rather than the box, squashing a 17px glyph to 8px
				// wide. A crescent survives that; a sun becomes a smear.
				//
				// No hover background either. The disc it sits in is already its
				// shape; a third one appearing under the icon on hover would be one
				// layer too many. Hovering changes the ink, like the links beside it.
				className="d-f ai-c jc-c w-6 h-6 p-0 bg-transparent bw-0 br-9999 c-p c-text-dim h:c-text fv:os-s fv:oo-2 fv:oc-accent tp-c tdu-150"
			>
				<Icon width={17} height={17} strokeWidth={1.7} className="fs-0" />
			</Button>
		</Tooltip>
	);
}
