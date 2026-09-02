# Mintfolio

A developer portfolio, blog and CV in one Next.js project.

Everything a visitor reads comes from a handful of config files. You edit data,
not components: your name, your projects, your roles, your skills, your posts.
The pages, the metadata, the social cards, the RSS feed, the sitemap and the
downloadable PDF CV all follow from that.

- Home page with hero, projects, experience, skills, recent posts and contact
- Blog with MDX posts and syntax highlighting that follows light and dark mode
- A CV rendered to a real PDF at `/cv.pdf`, laid out to parse cleanly in an
  applicant tracking system
- Light and dark themes with a toggle, respecting the system setting until
  someone chooses
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
| `site.config.ts` | Your name, URL, role, headline, intro, About text, avatar, nav links, social links |
| `content/projects.ts` | The Work section |
| `content/experience.ts` | The Experience section |
| `content/skills.ts` | The Skills section |
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
  lead: "I build tools that get",
  accent: "out of the way",
  tail: ".",
},
```

`nav` and `socials` are plain lists. Remove an entry and it disappears from the
site. Anchors like `/#work` point at sections in `app/page.tsx`; anything else
is treated as a route.

### Adding a project

Append to the array in `content/projects.ts`. Order is the order on the page:

```ts
{
  name: "Halcyon",
  description: "A task runner for monorepos that keeps its cache honest.",
  href: "https://github.com/you/halcyon",
  label: "github.com/you/halcyon",
  stack: ["Go", "TypeScript", "CLI"],
  featured: true,      // gets the wide card at the top of the grid
  period: "Ongoing",   // free text: "2024", "2023 – 2024", "Ongoing"
},
```

Omit `href` and the project renders as a card with no link, which is how you
show closed-source work you can still describe.

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

### Adding skills

`content/skills.ts` holds groups rather than one long list. Three or four
groups of five or six items reads best. Delete a group and it disappears.

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

Fenced code blocks are highlighted, and follow light and dark mode:

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

The avatar is `site.avatar`, a path in `public/`. Replace `public/avatar.svg`
with your own photo and point `avatar` at it, or set it to `""` to drop the
photo entirely. `public/favicon.svg` is the browser tab icon.

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

Colours live in `yumma.config.mjs` as `{ light, dark }` pairs, compiled to CSS
`light-dark()`. Change `accent` and the whole site follows: buttons, links,
markers, the grid backdrop, the social cards and the CV.

```js
accent: { light: "#0d9488", dark: "#5eead4" },
```

If you change `page`, update `site.themeColor` to match so mobile browsers
paint the right colour behind the address bar.

Type and spacing come from [Yumma CSS](https://yummacss.com), a utility
framework whose class names are derived from CSS property names. There is no
custom stylesheet to keep in sync: `app/globals.css` is two font imports and
one `@yummacss` directive.

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
  projects.ts           Work section
  experience.ts         Experience section
  skills.ts             Skills section
  posts/*.mdx           Blog posts
app/                    Routes, metadata, feed, sitemap, social cards
src/components/         The pieces the pages are built from
src/lib/                Post loading, structured data, fonts, theme
public/                 Images, avatar, favicon
```

## Licence

MIT. Use it, change it, ship it. Replace the content with your own before you
do.
