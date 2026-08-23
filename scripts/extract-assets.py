"""
Extract brand icons, decorative elements and hero imagery from the design references
into `public/`.

The reference sheets are the source of truth for the icon system; this script keeps the
extraction reproducible so assets can be regenerated if a sheet is ever updated.

Sources (all in `reference/`):
  * icon-reference-bg-removed.png  1536x1024 RGBA, true alpha channel
  * heroimage.png                  1544x1019 RGB, room right-weighted, cream wall left

Each entry below is a generous bounding box around one element; the script auto-trims to
the element's real alpha bounds so the boxes only need to avoid neighbours and labels.

Usage:  python scripts/extract-assets.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
REFERENCE = ROOT / "reference"
PUBLIC = ROOT / "public"

ALPHA_THRESHOLD = 10
PADDING = 4

# name -> (destination relative to public/, crop box on the icon sheet)
ICON_CROPS = {
    # Sheet 1 - core service icons
    "vastu": ("icons/services", (30, 20, 215, 186)),
    "astrology": ("icons/services", (285, 20, 440, 186)),
    "numerology": ("icons/services", (518, 20, 685, 186)),
    "combined": ("icons/services", (35, 275, 210, 415)),
    "healing": ("icons/services", (300, 275, 432, 410)),
    "tarot": ("icons/services", (520, 275, 685, 410)),
    # Sheet 2 (top row) - trust / credibility
    "experience": ("trust", (805, 25, 935, 178)),
    "clients": ("trust", (985, 25, 1130, 176)),
    "trusted": ("trust", (1170, 25, 1300, 175)),
    "worldwide": ("trust", (1335, 25, 1500, 165)),
    # Sheet 2 (bottom row) - hero feature icons
    "harmonize": ("icons/features", (798, 275, 935, 403)),
    "destiny": ("icons/features", (978, 275, 1132, 405)),
    "numbers": ("icons/features", (1138, 275, 1335, 414)),
    "align": ("icons/features", (1358, 275, 1500, 405)),
    # Sheet 3 - decorative & brand elements
    "lotus": ("decorative", (28, 478, 208, 665)),
    "sri-yantra": ("decorative", (210, 478, 380, 668)),
    "mandala": ("decorative", (388, 478, 566, 668)),
    "sunburst": ("decorative", (574, 472, 732, 672)),
    "divider-lotus": ("decorative", (176, 668, 227, 714)),
    "divider-diamond": ("decorative", (562, 668, 732, 714)),
    "botanical-1": ("decorative", (35, 730, 151, 915)),
    "botanical-2": ("decorative", (162, 730, 288, 915)),
    "botanical-3": ("decorative", (314, 730, 431, 915)),
    "botanical-4": ("decorative", (456, 730, 565, 915)),
    "pampas": ("decorative", (585, 730, 734, 915)),
    "lotus-large": ("decorative", (1205, 770, 1480, 1000)),
    # Header mark. The layered lotus from "Align Mind, Body & Soul" is the closest
    # match to the logo lotus and crops far cleaner than the low-res screenshot.
    # TODO: replace with the client's original logo file when available.
    "logo-mark": ("", (1358, 275, 1500, 405)),
}


def trim_to_alpha(image: Image.Image) -> Image.Image:
    """Crop away fully transparent margins, leaving a small even padding."""
    alpha = image.getchannel("A").point(lambda v: 255 if v > ALPHA_THRESHOLD else 0)
    bounds = alpha.getbbox()
    if bounds is None:
        raise ValueError("crop box contains no visible pixels")

    left, top, right, bottom = bounds
    return image.crop(
        (
            max(left - PADDING, 0),
            max(top - PADDING, 0),
            min(right + PADDING, image.width),
            min(bottom + PADDING, image.height),
        )
    )


def extract_icons() -> None:
    sheet = Image.open(REFERENCE / "icon-reference-bg-removed.png").convert("RGBA")

    for name, (folder, box) in ICON_CROPS.items():
        destination = PUBLIC / folder if folder else PUBLIC
        destination.mkdir(parents=True, exist_ok=True)

        icon = trim_to_alpha(sheet.crop(box))
        path = destination / f"{name}.png"
        icon.save(path, "PNG", optimize=True)
        print(f"  {path.relative_to(ROOT).as_posix():44s} {icon.width}x{icon.height}")


def extract_hero() -> None:
    hero = Image.open(REFERENCE / "heroimage.png").convert("RGB")

    # Desktop keeps the full frame: the flat cream wall on the left is what the
    # hero's left-to-right gradient dissolves into.
    hero.save(PUBLIC / "hero.jpg", "JPEG", quality=88, optimize=True, progressive=True)
    print(f"  {'public/hero.jpg':44s} {hero.width}x{hero.height}")

    # Mobile drops the empty wall and frames the yantra, sideboard, plant and armchair
    # so the photo still reads at portrait proportions.
    mobile = hero.crop((580, 0, hero.width, hero.height))
    mobile.save(
        PUBLIC / "hero-mobile.jpg", "JPEG", quality=88, optimize=True, progressive=True
    )
    print(f"  {'public/hero-mobile.jpg':44s} {mobile.width}x{mobile.height}")


if __name__ == "__main__":
    print("Extracting icons and decorative elements...")
    extract_icons()
    print("Extracting hero imagery...")
    extract_hero()
    print("Done.")
