"use client";

import { Button } from "@base-ui/react/button";
import { Computer, HalfMoon, SunLight } from "iconoir-react";
import type { ColorScheme } from "../lib/theme.ts";
import { useColorScheme } from "../lib/use-color-scheme.ts";
import { Tooltip } from "./tooltip.tsx";

/** Three states: a two-state switch has no way back to "follow the system". */
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
				// `p-0` is load-bearing: a button's default padding squashes the
				// icon rather than the box. No hover background; the disc is enough.
				className="d-f ai-c jc-c w-6 h-6 p-0 bg-transparent bw-0 br-9999 c-p c-text-dim h:c-text fv:os-s fv:oo-2 fv:oc-accent tp-c tdu-150"
			>
				<Icon width={17} height={17} strokeWidth={1.7} className="fs-0" />
			</Button>
		</Tooltip>
	);
}
