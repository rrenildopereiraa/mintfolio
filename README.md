# Mintfolio

A developer portfolio, blog and CV in one Next.js project.

Everything a visitor reads comes from a handful of config files. You edit data,
not components: your name, your projects, your roles, your writing. The pages,
the metadata, the social cards, the RSS feed, the sitemap and the downloadable
PDF CV all follow from that.

- Home page with hero, projects, experience, recent posts and about
- Blog with MDX posts and Shiki syntax highlighting
- A CV rendered to a real PDF at `/cv.pdf`, laid out to parse cleanly in an
  applicant tracking system
- Light and dark, from one set of paired colours, every pair checked against
  WCAG AA
- Generated social cards, RSS, sitemap, `robots.txt` and JSON-LD structured
  data
- No database, no CMS, no account to sign up for

## Requirements

- Node.js 20.9 or newer
- pnpm, npm or yarn

## Installation

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Configuration

Four files hold everything you need to change. None of them import a component,
and none of them need you to know React.

| File | What it holds |
| --- | --- |
| `site.config.ts` | Your name, URL, role, headline, intro, About text, avatar, signature, nav links, social links |
| `content/projects.ts` | The Projects section |
| `content/experience.ts` | The Experience section |
| `cv.config.ts` | Everything printed on the PDF CV |

Posts live as `.mdx` files in `content/posts/`. Images and the favicon live in
`public/`.

### Your personal information

Open `site.config.ts` first. It feeds the header, the footer, the page titles,
the social cards, the feed, the sitemap and the structured data, so a name
changed there changes everywhere:

```ts
export const site = {
  name: "Ada Lovelace",
  url: "https://adalovelace.dev",   // no trailing slash
  role: "Systems engineer",
  location: "London, United Kingdom",
  email: "hello@adalovelace.dev",
  // ...
};
```

Set `url` before you deploy. The links in your feed, sitemap and social cards
are absolute and built from it.

The headline is stored in three pieces so the accent phrase can be tinted on
the page and drawn the same way on the social card, which never sees your
markup:

```ts
headline: {
  greeting: "Hey there.",
  intro: "I'm",
  accent: "Ada",
},
```

`nav` and `socials` are plain lists. Remove an entry and it disappears from the
site. Anchors like `/#projects` point at sections in `app/page.tsx`; anything
else is treated as a route.

Each social's `label` is also how the footer finds its mark in
`src/components/icons.tsx`. GitHub, LinkedIn, X and Email ship with one; add a
social with no mark and the footer falls back to printing its label, so nothing
ever disappears silently.

### Adding a project

Append to the array in `content/projects.ts`. Order is the order on the page:

```ts
{
  name: "Project A",
  description: "One sentence. What it is, not how it was built.",
  summary: "The longer line, shown in the hover card.",
  href: "https://github.com/you/project-a",
  label: "github.com/project-a",
  mark: "circle",      // circle | square | triangle
  period: "Ongoing",   // free text: "2024", "2023 – 2024", "Ongoing"
  stack: ["TypeScript", "Go", "CLI"],
},
```

Omit `href` and `label` and the row renders without the repository chip, which
is how you show closed-source work you can still describe.

`mark` is the small shape beside the name. Three plain shapes ship with the
template; to use your own, add an SVG to `src/components/icons.tsx` and put it
in the `projectMarks` map. They all draw inside a 16x16 box, so the layout does
not move.

Hovering a project name opens a preview card with `summary` and `stack` in it.
That is Base UI's PreviewCard, so it handles the open delay, keyboard focus,
placement near a viewport edge and dismissal on Escape.

### Adding a role

Append to `content/experience.ts`, newest first:

```ts
{
  title: "Senior Product Engineer",
  company: "Northwind Labs",
  href: "https://northwind.example",   // optional
  start: "2023",
  end: "Present",
  summary: "One or two sentences on what you actually did there.",
},
```

This is deliberately separate from `cv.config.ts`: the page wants one line per
role and the PDF wants bullet points, and one list trying to serve both serves
neither.

### Adding a blog post

Create a file in `content/posts/`. The file name is the URL, so
`content/posts/why-i-rewrote-it.mdx` becomes `/blog/why-i-rewrote-it`.

Every post starts with a `meta` export:

````mdx
export const meta = {
  title: "The build wasn't slow, the cache was lying",
  description: "Eleven minutes of CI, and almost none of it was doing any work.",
  date: "2025-11-18",
  published: true,
};

Your first paragraph. Markdown from here on.

## A heading

Fenced code blocks are syntax highlighted:

```ts
const key = hash([...sourceFiles, ...dependencies]);
```
````

`date` is `YYYY-MM-DD`. Set `published: false` and the post is left out of the
site entirely: off the index, out of the feed and the sitemap, and a 404 at its
own URL. Run `pnpm dev` and flip it back to `true` to read a draft. Posts are
sorted newest first, and the home page shows the most recent few.

Tables, task lists and strikethrough work via GFM. To change how any element is
styled, edit `src/components/mdx-components.tsx`.

### Adding images

Put files in `public/` and reference them from the root:

```mdx
![A build graph](/build-graph.png)
```

`site.avatar` is a path in `public/`. No page shows it — it is published as
your `image` in the JSON-LD, which is what search results and link previews
pick up. Replace `public/avatar.svg` with your own photo and point `avatar` at
it, or set it to `""` to publish none. `public/favicon.svg` is the browser tab
icon.

### Your signature

The About section ends with a signature line: a dotted rule with your name
under it, the way a form leaves you room to sign. The template ships the slot
and not the signature, because a stranger's handwriting under your own words is
worse than none.

To add yours, put an SVG of it in `public/` and point `signature` at it:

```ts
signature: "/signature.svg",
```

It draws above the rule. The slot keeps its height either way, so filling it in
never moves anything below it. Vector rather than a photo of ink: it stays
crisp at any size and on any screen. If you would rather not have one at all,
delete `<Signature />` from `app/page.tsx`.

### Your CV

`cv.config.ts` is the whole PDF: profile, experience, projects, education,
skills and languages. `pnpm build` renders it to `/cv.pdf` and the site links
to it.

It is laid out to survive an applicant tracking system, which is what reads a
CV before a person does: one column, real text rather than an image of text,
and section headings with the plain names those parsers look for.

Your phone number is the exception. It is read from the environment rather than
written into the file, so it never reaches a public git history:

```bash
cp .env.example .env.local
# then set CV_PHONE in .env.local
```

Leave it unset and the line is simply left off. On Vercel, add `CV_PHONE` as an
environment variable if you want it on the deployed CV.

## Metadata and SEO

Titles, descriptions, canonical URLs, Open Graph and Twitter tags are generated
from `site.config.ts` and each post's `meta`. So are:

- `/opengraph-image` and per-post social cards, drawn at build time
- `/feed.xml`, an RSS feed of published posts
- `/sitemap.xml` and `/robots.txt`
- JSON-LD `Person`, `WebSite`, `Blog` and `BlogPosting` structured data

There is nothing to configure here beyond getting `site.url` right.

## Theming

Every colour lives in the `theme.colors` block of `yumma.config.mjs`, as a
`{ light, dark }` pair:

```js
accent: { light: "#0f766e", dark: "#5eead4" },
text:   { light: "#0d1b19", dark: "#e4f1ee" },
```

[Yumma CSS](https://yummacss.com) compiles each pair into CSS `light-dark()`,
so `c-accent` is one class that resolves to the right value in either theme.
There is no second palette, no `dark:` prefix on anything, and no way for the
two themes to drift apart.

The names are roles rather than hues — `accent`, `text`, `text-dim`, `surface`,
`border` — so changing the identity is changing `accent` and nothing else. The
surfaces are almost neutral and only the accent is saturated, which is what
keeps a mint theme from reading as a novelty.

**Contrast.** Every pair is checked against WCAG AA in both themes: body copy
and links at 4.5:1, the marks at 3:1. If you swap the accent, keep it dark
enough in light mode to clear 4.5:1 on `surface` — a bright mint looks right on
a swatch and is unreadable as 14px type. This is the most common way a
good-looking palette turns into an inaccessible one.

**Dark mode** follows the reader's system by default, and the toggle in the nav
cycles light → dark → system. The choice is stored per browser and applied by a
small inline script before first paint, so nobody sees the wrong palette flash
on load.

A handful of colours are not properties Yumma has a class for — gradient stops,
box-shadow tints, an SVG `fill`. Those live in `src/lib/colors.ts`, still as
`light-dark()` pairs, so there is exactly one other file to touch.

There is no custom stylesheet to keep in sync: `app/globals.css` is the font
imports and one `@yummacss` directive.

### Type

Three faces, all from Fontsource, all self-hosted:

| Face | Where |
| --- | --- |
| Geist | Everything, set once on `<body>` |
| Instrument Serif Italic | One word in the headline, and nowhere else |
| IBM Plex Mono | Dates, tags, section numbers, the nav |

Only the serif has any character, which is the point: it is used for your name
and lets the rest of the page stay quiet. The mono is a text mono rather than a
code mono, so the small labels read as typed rather than compiled.

To change any of them, swap the `@import` in `app/globals.css` and the matching
family in `src/lib/fonts.ts`. Yumma's `theme` takes colours and screens but not
families, which is why the families live in a TypeScript file and get applied
as inline styles.

## Local development

```bash
pnpm dev        # dev server on :3000
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # format and lint with Biome
pnpm validate   # check every class against Yumma
```

`pnpm validate` fails on a class Yumma does not recognise, which catches typos
that would otherwise silently render as nothing.

## Production build

```bash
pnpm build
pnpm start
```

The build prerenders every page, both social card routes, the feed, the sitemap
and the PDF CV. If it succeeds, there is nothing left to render at request
time.

## Deploying to Vercel

Push the repository to GitHub, then import it at
[vercel.com/new](https://vercel.com/new). The defaults are correct: Vercel
detects Next.js, runs `pnpm build`, and serves the result.

Two things to do afterwards:

1. Set `url` in `site.config.ts` to your real domain and redeploy, so the feed,
   sitemap and social cards point at the right place.
2. Add `CV_PHONE` under **Settings → Environment Variables** if you want a
   phone number on the deployed CV.

It deploys anywhere Next.js runs. Nothing here depends on a Vercel-only
feature.

## Project structure

```
site.config.ts          You: name, links, headline, About
cv.config.ts            The PDF CV
yumma.config.mjs        Colour palette and breakpoints
content/
  projects.ts           Projects section
  experience.ts         Experience section
  posts/*.mdx           Blog posts
app/                    Routes, metadata, feed, sitemap, social cards
src/components/         The pieces the pages are built from
src/components/icons.tsx        Social marks and the project shapes
src/lib/                Post loading, structured data, fonts
public/                 Images, avatar, favicon
```

## Licence

MIT. Use it, change it, ship it. Replace the content with your own before you
do.
