# Source assets

Drop the subject's photograph here as **`portrait.jpg`** (or `.png` / `.webp`),
then regenerate the artwork:

```bash
npm run assets
```

The generator will:

1. crop it to a 4:5 portrait (keeping the top of the frame, i.e. head and
   shoulders) at 1200×1500,
2. write it to `public/portrait.jpg`, which the site then uses everywhere —
   hero plate, Open Graph card and schema.org `Person.image`,
3. rebuild `public/og-image.jpg` with the real photograph inside the plate.

Until a photograph is supplied, `public/portrait.jpg` is a neutral placeholder
plate. No synthetic or AI-generated likeness is ever produced for a real person.
