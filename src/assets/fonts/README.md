# Fonts

`geist-400.ttf`, `geist-500.ttf` and `geist-700.ttf` are static instances of
[Geist](https://vercel.com/font) by Vercel, converted from the Latin subsets
that ship in `@fontsource/geist`.

They are committed here because the CV is rendered to PDF by
`@react-pdf/renderer`, which embeds fonts from TrueType or OpenType files.
Fontsource ships woff2, which that renderer cannot read, so the conversion
happens once and the result is checked in rather than run on every build.

Licensed under the [SIL Open Font License 1.1](https://openfontlicense.org).

If you change the site's typeface, replace these three files and update the
family name in `src/components/cv-document.tsx`. A CV set in a different face
from the page linking to it undercuts both.
