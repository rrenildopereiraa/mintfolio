"use client";

import { Button } from "@base-ui/react/button";
import { Computer, HalfMoon, SunLight } from "iconoir-react";
import type { ColorScheme } from "../lib/theme.ts";
import { useColorScheme } from "../lib/use-color-scheme.ts";
import { Tooltip } from "./tooltip.tsx";

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
				className="d-f ai-c jc-c w-8 h-8 bg-transparent bw-0 br-9999 c-p c-text-dim h:c-accent h:bg-surface-2 fv:os-s fv:oo-2 fv:oc-accent tp-c tdu-150"
			>
				<Icon width={16} height={16} strokeWidth={2} />
			</Button>
		</Tooltip>
	);
}
