# Source assets

The original, full-resolution files. Nothing in the website reads from this
folder — it exists so the web versions can be regenerated later without
hunting for the originals.

| File | What it is |
|---|---|
| `Abdedaym-Chakra-CV-source.pdf` | The CV as exported from LaTeX (2.0 MB) |
| `profile-source.png` | The original headshot, 1086 × 1448 (1.9 MB) |

## What the website actually serves

| Served file | Made from | Size |
|---|---|---|
| `public/documents/Abdedaym-Chakra-CV.pdf` | the CV above, compressed | 53 KB |
| `public/images/profile/profile.jpg` | the headshot above, cropped to 4:5 | 171 KB |

`npm run build` checks both of these and prints a warning if either has grown
(see `scripts/check-assets.mjs`). It only warns — it never fails the build.

> **Do not export a new CV directly into `public/documents/`.** Put it here in
> `source/` first, then compress it across. An uncompressed 2 MB CV still
> "works", so nothing will tell you it is wrong except that warning.

## Regenerating them

**CV** — 2 MB is a slow download on a phone. Compress with ghostscript; the
text, layout and links come through unchanged, only the embedded photo is
re-encoded:

```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -dDetectDuplicateImages=true \
   -sOutputFile=public/documents/Abdedaym-Chakra-CV.pdf \
   source/Abdedaym-Chakra-CV-source.pdf
```

Check the text survived before committing:

```bash
diff <(pdftotext -layout source/Abdedaym-Chakra-CV-source.pdf -) \
     <(pdftotext -layout public/documents/Abdedaym-Chakra-CV.pdf -)
```

**Photo** — the About section renders a 4:5 portrait, so a 3:4 source needs
cropping. Never upscale: the largest rendered size is about 896 px wide
(28 rem at 2× DPR), so anything over ~1000 px wide is already enough.

```python
from PIL import Image
src = Image.open("source/profile-source.png").convert("RGB")
w, h = src.size
out = src.crop((0, 20, w, 20 + int(round(w / 0.8))))   # 4:5, biased to the top
out.save("public/images/profile/profile.jpg", "JPEG",
         quality=90, optimize=True, progressive=True)
```

See `guide.txt`, sections 5 and 7.
