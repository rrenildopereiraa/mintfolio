"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import type { ReactNode } from "react";

/**
 * Client-side context that has to sit above every page. Kept in its own file
 * so the root layout can stay a server component.
 */
export function Providers({ children }: { children: ReactNode }) {
	return <Tooltip.Provider delay={200}>{children}</Tooltip.Provider>;
}
