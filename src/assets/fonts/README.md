# Fonts

`manrope-400.ttf`, `manrope-500.ttf` and `manrope-700.ttf` are static instances
of [Manrope](https://fonts.google.com/specimen/Manrope) by Mikhail Sharanda,
fetched from Google Fonts.

They are committed here because the CV is rendered to PDF by
`@react-pdf/renderer`, which embeds fonts from TrueType or OpenType files. The
`@fontsource-variable/manrope` package the site uses ships woff2 only, which
that renderer cannot read.

Licensed under the [SIL Open Font License 1.1](https://openfontlicense.org).

If you change the site's typeface, replace these three files and update the
family name in `src/components/cv-document.tsx`.
