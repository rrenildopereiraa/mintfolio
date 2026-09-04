# Mintfolio

A developer portfolio, blog and CV in one Next.js project.

Everything a visitor reads comes from a handful of config files. You edit data,
not components: your name, your projects, your roles, your stack, your posts.
The pages, the metadata, the social cards, the RSS feed, the sitemap and the
downloadable PDF CV all follow from that.

- Home page with hero, projects, experience, stack, recent posts and about
- Blog with MDX posts and Shiki syntax highlighting
- A CV rendered to a real PDF at `/cv.pdf`, laid out to parse cleanly in an
  applicant tracking system
- One light theme, built entirely on Yumma's default palette, so every class in
  the markup is one you can look up
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

Five files hold everything you need to change. None of them import a component,
and none of them need you to know React.

| File | What it holds |
| --- | --- |
| `site.config.ts` | Your name, URL, role, headline, intro, About text, avatar, signature, nav links, social links |
| `content/projects.ts` | The Projects section |
| `content/experience.ts` | The Experience section |
| `content/stack.ts` | The My stack section |
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

### Adding to My stack

`content/stack.ts` is one flat list of names, and a deliberately short one.
Eight or nine answers "what would this person reach for on Monday" better than
thirty, because thirty makes the reader guess which ones you actually meant. A
good filter: if you would not be happy being asked about it in an interview
tomorrow, leave it out.

Every entry gets its brand mark and then the same weight, colour and size as
every other one. A stack list stops being information the moment one item is
dressed up.

The marks live in `src/components/stack-icons.tsx`, copied in from
[Simple Icons](https://simple-icons.github.io) (CC0) rather than installed, and
keyed by the exact name you use in `content/stack.ts`. Add a tool with no mark
there and it still renders — it gets the outlined square instead, which is the
point: your stack should not be limited to the things that happen to have a
logo.

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

There is no `theme.colors` block in `yumma.config.mjs`. Every colour is a stock
[Yumma CSS](https://yummacss.com) utility from its default palette, so a class
you see in the markup is one you can look up and reuse unchanged. The accent is
`mint`, which Yumma ships as a first-class hue; the neutrals are `zinc` and
`slate`.

To change the accent, search for `mint` across `app/` and `src/` and pick
another Yumma hue: `c-mint-7` becomes `c-blue-7`, `bg-mint` becomes `bg-blue`,
and so on. Also update `site.themeColor` and the two hex values in
`src/components/grid-backdrop.tsx`, which are gradients and therefore cannot be
utilities.

**On dark mode.** This template is light only. Paired `{ light, dark }` theme
colours are what compile to CSS `light-dark()`, and Yumma 3.29 has no dark-mode
variant of its own, so using the default palette rules dark mode out. If you
want it, add a `theme.colors` block with paired values and swap the stock class
names back to your own token names.

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
  stack.ts              My stack section
  posts/*.mdx           Blog posts
app/                    Routes, metadata, feed, sitemap, social cards
src/components/         The pieces the pages are built from
src/components/icons.tsx        Social marks and the project shapes
src/components/stack-icons.tsx  Brand marks for the stack
src/lib/                Post loading, structured data, fonts
public/                 Images, avatar, favicon
```

## Licence

MIT. Use it, change it, ship it. Replace the content with your own before you
do.
