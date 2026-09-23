# Gallery source photographs

Put the original photographs in **this folder**, then run:

```bash
npm run photos     # from mayeed-khan-shuvon/
npm run build
```

## Expected file names

Rename the files to these ids before running the pipeline (the id drives the
alt text, caption and structured data that go with each photograph):

| File name to use | Photograph |
| --- | --- |
| `04-stream.jpg`   | Standing in a rocky stream, glasses, checked shirt — **primary portrait** |
| `02-riverside.jpg`| Riverside with boats, sunglasses, blue sky |
| `01-park-bench.jpg`| Public park, pink slatted bench |
| `03-stone-wall.jpg`| Against a stone wall with a white arched niche |

`.png`, `.webp`, `.avif` and `.tif` are accepted as well as `.jpg`.

Tips:

- The **primary portrait** is what appears in the hero, the social card and the
  schema.org `Person.image`. Override it at any time by dropping the preferred
  image at `assets/source/portrait.jpg` — that always takes priority.
- **Not renaming anything?** Then either use `autoMap` (recommended) or `--auto`:

  - `autoMap` in `src/content/gallery.config.json` is an exact
    filename → id table. It is **already filled in** for the four WhatsApp
    files (`IMG-20260923-WA0000.jpg` → `04-stream`, and so on), so uploading them
    under their original names works with no renaming at all. Add an entry for
    any new filename.
  - `npm run photos -- --auto` is the positional fallback: ids are assigned in
    sorted filename order and the mapping is printed. Check that printout — a
    positional assignment can put the wrong caption on a photograph.
- Originals are never modified; everything generated lands in `public/images/`.
