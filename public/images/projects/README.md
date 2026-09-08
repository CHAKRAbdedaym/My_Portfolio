# Project screenshots

Drop project screenshots in this folder, then reference them from
`src/data/projects.ts` by uncommenting the `image` field of the project:

```ts
image: "/images/projects/agrisure.png",
```

The path always starts at `/images/…` — never `/public/images/…`.

## Recommended

| | |
|---|---|
| Aspect ratio | 16:10 for grid cards, 16:9 for the featured card |
| Dimensions | 1600 × 1000 px (minimum 1200 × 750) |
| Format | `.png` for interfaces, `.jpg` for photographs |
| File size | under 500 KB (compress at https://squoosh.app) |

Suggested filenames: `agrisure.png`, `ecommerce.png`, `taskmaster.png`,
`mindkeeper.png`, `ai-system-designer.png`, `fstracker.png`.

## Screenshots are optional

Every project already renders original generated artwork designed for its
subject. A screenshot is an upgrade, not a requirement — and if a referenced
file is missing or fails to load, the site silently falls back to that
artwork rather than showing a broken image.

Filenames are **case-sensitive** on Linux and on Vercel: `Agrisure.PNG` and
`agrisure.png` are different files.

See `guide.txt`, section 6.
