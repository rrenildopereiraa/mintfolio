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
				// No hover background: it sits inside the nav pill, and a second
				// shape appearing inside the first is exactly what the pill exists
				// to avoid. Hovering changes the ink, like the links beside it.
				className="d-f ai-c jc-c w-6 h-6 bg-transparent bw-0 br-9999 c-p c-text-dim h:c-text fv:os-s fv:oo-2 fv:oc-accent tp-c tdu-150"
			>
				<Icon width={14} height={14} strokeWidth={2} />
			</Button>
		</Tooltip>
	);
}
