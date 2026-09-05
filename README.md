# Mintfolio

A developer portfolio, blog and CV in one Next.js project.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frrenildopereiraa%2Fmintfolio&project-name=mintfolio&repository-name=mintfolio)

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

Four files hold everything a visitor reads. None of them import a component,
and none of them need you to know React.

| File | What it holds |
| --- | --- |
| `site.config.ts` | Name, URL, role, headline, About, nav, social links, signature |
| `content/projects.ts` | The Projects section |
| `content/experience.ts` | The Experience section |
| `cv.config.ts` | Everything printed on the PDF CV |

Posts live as `.mdx` files in `content/posts/`. Images and the favicon live in
`public/`. Colours live in `yumma.config.mjs`.

Every one of those files is commented at the point it matters, so the answer is
usually already in the file you have open.

## The rest of the documentation is the blog

The three posts this template ships with are the documentation. They are
walkthroughs of the thing they are written in, which means they are also the
demo — the post about code blocks contains code blocks, the one about the
palette shows its own contrast figures.

Run `pnpm dev` and read them at `/blog`:

- **Writing posts** — the `meta` block, syntax highlighting, tables, task
  lists, images, drafts, and where to change how any of it looks
- **Making it yours** — the four config files, the projects and CV formats, how
  the social sentence is built
- **Colour, type, and how dark mode works here** — the paired palette, the
  contrast floor to respect when you swap the accent, the three typefaces

When you have read them, delete all three and write your own. They live in
`content/posts/` and nothing links to them by name.

## Local development

```bash
pnpm dev        # dev server on :3000
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # format and lint with Biome
pnpm validate   # check every class against Yumma CSS
```

`pnpm validate` fails on a class Yumma CSS does not recognise, which catches
typos that would otherwise silently render as nothing.

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
