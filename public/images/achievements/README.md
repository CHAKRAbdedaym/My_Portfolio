# Achievement images

Optional folder, reserved for images relating to achievements — a hackathon
photo, a certificate scan, an event picture.

Nothing in the site currently reads from this folder: the achievements section
renders icons and typography rather than images, which keeps it fast and
avoids showing low-resolution certificate scans.

If you want to display an image here, it needs a small code change in
`src/components/sections/Achievements.tsx`.

## Recommended, if you add any

| | |
|---|---|
| Dimensions | 1200 × 800 px |
| Format | `.jpg` for photos, `.png` for certificates |
| File size | under 400 KB |

See `guide.txt`, section 12.
