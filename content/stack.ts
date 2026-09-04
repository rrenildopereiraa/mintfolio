/**
 * The My stack section.
 *
 * One flat list, and a short one. A stack section is not an inventory: it is
 * the answer to "what would this person reach for on Monday", and eight names
 * answer that better than thirty, because thirty means the reader has to guess
 * which ones you actually meant.
 *
 * The rule of thumb: if you would not be happy being asked about it in an
 * interview tomorrow, leave it out.
 *
 * Each name is matched against the brand marks in
 * `src/components/stack-icons.tsx`. Anything with no mark there still renders —
 * it gets the outlined square — so never leave a tool out just because it has
 * no logo.
 */
export const stack: string[] = [
	"TypeScript",
	"React",
	"Next.js",
	"Astro",
	"Yumma CSS",
	"PostgreSQL",
	"Drizzle",
	"Vite",
	"Biome",
];
