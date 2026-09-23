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
- If you would rather not rename anything, run `npm run photos -- --auto` and the
  script will assign ids in sorted filename order, printing the mapping it used.
  Check the printed mapping: a wrong assignment puts the wrong caption on a
  photograph.
- Originals are never modified; everything generated lands in `public/images/`.
