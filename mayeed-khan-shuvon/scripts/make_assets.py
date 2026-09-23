#!/usr/bin/env python3
"""
Brand asset generator for mks.bsdc.info.bd — `npm run assets`

Produces every raster asset the site ships, deterministically and from source:

    public/portrait.jpg        4:5 profile plate. Uses assets/source/portrait.*
                               when a real photograph is supplied; otherwise a
                               neutral placeholder plate (never a synthetic
                               likeness of a real person).
    public/og-image.jpg        1200x630 social / Knowledge-Panel card
    public/favicon.ico         16px + 32px PNG-in-ICO
    public/favicon-16.png, favicon-32.png, apple-touch-icon.png,
    public/logo-192.png, logo-512.png

Why Python: the three site typefaces need real glyph rasterisation (kerning,
hinting, proper vertical metrics). Pillow + FreeType does that correctly, and
Pillow/draw handles the rounded plates, rules and gradients. The alternative —
pushing text through SVG -> libvips -> Pango — silently drops glyphs on some
builds, which is exactly the class of failure a build script must not have.

Requirements (only needed to REGENERATE artwork; the committed files in
public/ are what the site build actually consumes):

    python3 -m pip install --break-system-packages Pillow numpy fonttools \
        brotli freetype-py

Typo advice: drop "MD MAYEED KHAN SHUVON" — the display name is rendered from
the same Fraunces optical-size axis the website uses.
"""

from __future__ import annotations

import os
import sys
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "scripts" / "fonts"
PUBLIC = ROOT / "public"
SOURCE = ROOT / "assets" / "source"

# ----------------------------------------------------------------- palette
PAPER = (251, 250, 247)
INK = (14, 23, 38)
INK_SOFT = (44, 58, 78)
MUTED = (83, 97, 122)
LINE = (227, 222, 210)
LINE_COOL = (219, 226, 234)
ACCENT = (15, 118, 110)
ACCENT_DEEP = (10, 92, 86)
ACCENT_SOFT = (231, 242, 240)
NAVY = (16, 29, 49)

DISPLAY = FONTS / "Fraunces-Display.ttf"
SANS = FONTS / "Inter-Regular.ttf"
SANS_MEDIUM = FONTS / "Inter-Medium.ttf"
MONO = FONTS / "PlexMono-Regular.ttf"

# Supersampling factor: artwork is composed large and resampled down, which is
# what keeps hairlines and small caps crisp in the final JPEG/PNG.
SS = 2


# ----------------------------------------------------------------- helpers
def rgba(color: tuple[int, int, int], alpha: int = 255) -> tuple[int, int, int, int]:
    return (*color, alpha)


def new_canvas(width: int, height: int, color=PAPER) -> Image.Image:
    return Image.new("RGBA", (width, height), rgba(color))


def paper_background(width: int, height: int, grid_step: int, glow: bool = True) -> Image.Image:
    """Paper stock: warm base, faint rule grid, teal glow in the top-right."""
    try:
        import numpy as np
    except ImportError:  # pragma: no cover - numpy is a documented requirement
        np = None

    image = new_canvas(width, height, PAPER)
    draw = ImageDraw.Draw(image, "RGBA")

    if np is not None and glow:
        ys, xs = np.mgrid[0:height, 0:width]
        # Radial falloff centred slightly outside the top-right corner.
        cx, cy = width * 0.86, -height * 0.10
        radius = max(width, height) * 0.85
        distance = np.sqrt((xs - cx) ** 2 + (ys - cy) ** 2) / radius
        falloff = np.clip(1.0 - distance, 0.0, 1.0) ** 2
        alpha = (falloff * 46).astype("uint8")  # ~18% teal wash at its peak
        glow_layer = Image.new("RGBA", (width, height), rgba(ACCENT, 0))
        glow_layer.putalpha(Image.fromarray(alpha, mode="L"))
        glow_layer = Image.new("RGBA", (width, height), rgba(ACCENT, 0))
        glow_layer.putalpha(Image.fromarray(alpha, mode="L"))
        image = Image.alpha_composite(image, glow_layer)
        draw = ImageDraw.Draw(image, "RGBA")

    for x in range(grid_step, width, grid_step):
        draw.line([(x, 0), (x, height)], fill=rgba(INK, 9), width=1)
    for y in range(grid_step, height, grid_step):
        draw.line([(0, y), (width, y)], fill=rgba(INK, 9), width=1)

    return image


def linear_gradient(size: tuple[int, int], top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    """Vertical two-stop gradient, used for the monogram and accent bar."""
    try:
        import numpy as np
    except ImportError:  # pragma: no cover
        return new_canvas(*size, top)

    width, height = size
    ramp = np.linspace(0.0, 1.0, height)[:, None]
    top_arr = np.array(top, dtype="float32")
    bottom_arr = np.array(bottom, dtype="float32")
    rows = (top_arr * (1 - ramp) + bottom_arr * ramp).astype("uint8")
    pixels = np.repeat(rows[:, None, :], width, axis=1)
    return Image.fromarray(pixels, mode="RGB").convert("RGBA")


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([(0, 0), (size[0] - 1, size[1] - 1)], radius=radius, fill=255)
    return mask


def paste_alpha(base: Image.Image, layer: Image.Image, position: tuple[int, int]) -> Image.Image:
    base.alpha_composite(layer, dest=position)
    return base


def text_layer(
    text: str,
    font_path: Path,
    size: int,
    color: tuple[int, int, int],
    tracking: float = 0.0,
) -> tuple[Image.Image, int, int]:
    """
    Rasterises one line of text and returns (image, width, height) where the
    image is cropped to the ink box. `tracking` is extra letter spacing in px,
    applied per character (mono labels only — proportional runs keep their
    kerning by being drawn as a single string).
    """
    from PIL import ImageFont

    font = ImageFont.truetype(str(font_path), size)

    if tracking:
        # Draw glyph by glyph: FreeType advance + requested tracking.
        advances = [font.getlength(ch) + tracking for ch in text]
        width = int(round(sum(advances))) + 4
        canvas = Image.new("RGBA", (width, size * 3), rgba(color, 0))
        draw = ImageDraw.Draw(canvas)
        x = 2.0
        for char, advance in zip(text, advances):
            draw.text((x, size), char, font=font, fill=rgba(color, 255))
            x += advance
    else:
        width = int(font.getlength(text)) + 4
        canvas = Image.new("RGBA", (max(width, 1), size * 3), rgba(color, 0))
        draw = ImageDraw.Draw(canvas)
        draw.text((2, size), text, font=font, fill=rgba(color, 255))

    return crop_ink(canvas)


def crop_ink(image: Image.Image) -> tuple[Image.Image, int, int]:
    """Trims transparent margins and returns the tight ink box."""
    bbox = image.getbbox()
    if not bbox:
        return Image.new("RGBA", (1, 1), (0, 0, 0, 0)), 1, 1
    trimmed = image.crop(bbox)
    return trimmed, trimmed.width, trimmed.height


def measure(text: str, font_path: Path, size: int) -> float:
    from PIL import ImageFont

    return ImageFont.truetype(str(font_path), size).getlength(text)


def fit_size(text: str, font_path: Path, max_width: int, start: int, floor: int = 14) -> int:
    size = start
    while size > floor and measure(text, font_path, size) > max_width:
        size -= 1
    return size


# ------------------------------------------------------------ compositions
def build_monogram(size: int) -> Image.Image:
    """Rounded square, navy->teal gradient, hairline inset, 'MK' monogram."""
    radius = int(size * 0.235)
    mark = linear_gradient((size, size), NAVY, ACCENT_DEEP)
    mark.putalpha(rounded_mask((size, size), radius))

    inset = int(size * 0.055)
    ImageDraw.Draw(mark, "RGBA").rounded_rectangle(
        [(inset, inset), (size - inset - 1, size - inset - 1)],
        radius=int(radius * 0.78),
        outline=rgba((255, 255, 255), 56),
        width=max(1, int(size * 0.012)),
    )

    initials, width, height = text_layer("MK", DISPLAY, int(size * 0.42), (255, 255, 255))
    paste_alpha(mark, initials, ((size - width) // 2, int(size * 0.5 - height / 2)))
    return mark


def portrait_plate(width: int = 1200, height: int = 1500) -> Image.Image:
    """Neutral placeholder plate — deliberately not a fabricated likeness."""
    plate = paper_background(width, height, width // 20, glow=False)

    frame = int(width * 0.06)
    ImageDraw.Draw(plate, "RGBA").rectangle(
        [(frame, int(height * 0.05)), (width - frame, int(height * 0.95))],
        outline=rgba(LINE_COOL, 255),
        width=max(2, int(width * 0.004)),
    )

    # Microscope-slide corner brackets.
    draw = ImageDraw.Draw(plate, "RGBA")
    arm = int(width * 0.02)
    stroke = max(2, int(width * 0.006))
    for (cx, cy, dx, dy) in (
        (width * 0.09, height * 0.09, 1, 1),
        (width * 0.91, height * 0.09, -1, 1),
        (width * 0.09, height * 0.91, 1, -1),
        (width * 0.91, height * 0.91, -1, -1),
    ):
        draw.line([(cx, cy), (cx + dx * arm, cy)], fill=rgba(ACCENT, 200), width=stroke)
        draw.line([(cx, cy), (cx, cy + dy * arm)], fill=rgba(ACCENT, 200), width=stroke)

    mark = build_monogram(int(width * 0.46))
    paste_alpha(plate, mark, ((width - mark.width) // 2, int(height * 0.20)))

    label, lw, lh = text_layer("PORTRAIT PLATE — MKS", MONO, int(width * 0.022), INK, tracking=width * 0.0035)
    paste_alpha(plate, label, ((width - lw) // 2, int(height * 0.63)))

    sub_font_size = int(width * 0.0145)
    sub, sw, _ = text_layer("REPLACE WITH PHOTOGRAPH", MONO, sub_font_size, MUTED, tracking=width * 0.0028)
    paste_alpha(plate, sub, ((width - sw) // 2, int(height * 0.63) + lh + int(height * 0.016)))

    draw = ImageDraw.Draw(plate, "RGBA")
    draw.line(
        [(width * 0.24, height * 0.755), (width * 0.76, height * 0.755)],
        fill=rgba(LINE, 255),
        width=max(2, int(width * 0.004)),
    )

    url, uw, _ = text_layer("mks.bsdc.info.bd", SANS, int(width * 0.02), ACCENT_DEEP)
    paste_alpha(plate, url, ((width - uw) // 2, int(height * 0.865)))
    return plate


def build_portrait() -> Image.Image:
    """Returns the 1200x1500 portrait plate, using the real photo when present."""
    if SOURCE.exists():
        for candidate in sorted(SOURCE.iterdir()):
            if candidate.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"}:
                photo = Image.open(candidate).convert("RGB")
                target_ratio = 1200 / 1500
                ratio = photo.width / photo.height
                if ratio > target_ratio:  # too wide -> crop sides
                    new_width = int(photo.height * target_ratio)
                    left = (photo.width - new_width) // 2
                    photo = photo.crop((left, 0, left + new_width, photo.height))
                else:  # too tall -> keep the top (head and shoulders)
                    new_height = int(photo.width / target_ratio)
                    photo = photo.crop((0, 0, photo.width, new_height))
                photo = photo.resize((1200, 1500), Image.LANCZOS)
                print(f"portrait.jpg      <- {candidate.relative_to(ROOT)}")
                return photo.convert("RGBA")

    print("portrait.jpg      <- placeholder plate (drop a photo at assets/source/portrait.jpg)")
    return portrait_plate()


def build_social_card(portrait: Image.Image) -> Image.Image:
    """1200x630 Open Graph / Knowledge Panel card, composed at 2x."""
    W, H = 1200 * SS, 630 * SS
    canvas = paper_background(W, H, 68 * SS)

    draw = ImageDraw.Draw(canvas, "RGBA")
    # Outer hairline frame + accent spine.
    draw.rounded_rectangle(
        [(20 * SS, 20 * SS), (W - 20 * SS, H - 20 * SS)],
        radius=16 * SS,
        outline=rgba(LINE, 255),
        width=2 * SS,
    )
    spine = linear_gradient((8 * SS, H - 40 * SS), NAVY, ACCENT_DEEP)
    spine.putalpha(rounded_mask((8 * SS, H - 40 * SS), 4 * SS))
    paste_alpha(canvas, spine, (20 * SS, 20 * SS))

    # Portrait plate card.
    card_w, card_h = 372 * SS, 452 * SS
    card_x, card_y = W - 78 * SS - card_w, 92 * SS
    draw.rounded_rectangle(
        [(card_x, card_y), (card_x + card_w, card_y + card_h)],
        radius=22 * SS,
        fill=rgba((255, 255, 255), 255),
        outline=rgba(LINE_COOL, 255),
        width=2 * SS,
    )

    bracket = 18 * SS
    bracket_stroke = 3 * SS
    for (px, py, dx, dy) in (
        (card_x + 14 * SS, card_y + 34 * SS, 1, -1),
        (card_x + card_w - 14 * SS, card_y + 34 * SS, -1, -1),
        (card_x + 14 * SS, card_y + card_h - 34 * SS, 1, 1),
        (card_x + card_w - 14 * SS, card_y + card_h - 34 * SS, -1, 1),
    ):
        draw.line([(px, py), (px + dx * bracket, py)], fill=rgba(ACCENT, 210), width=bracket_stroke)
        draw.line([(px, py), (px, py + dy * bracket)], fill=rgba(ACCENT, 210), width=bracket_stroke)

    # Portrait inside the plate, rounded on all corners.
    inner_w, inner_h = card_w - 30 * SS, card_h - 30 * SS
    portrait_fit = portrait.convert("RGB").resize((inner_w, inner_h), Image.LANCZOS).convert("RGBA")
    portrait_fit.putalpha(rounded_mask((inner_w, inner_h), 14 * SS))
    paste_alpha(canvas, portrait_fit, (card_x + 15 * SS, card_y + 15 * SS))

    # Typography column.
    pad_x = 84 * SS
    text_width_max = card_x - pad_x - 40 * SS

    eyebrow_size = 17 * SS
    eyebrow_tracking = 0.14 * eyebrow_size
    eyebrow, ew, eh = text_layer(
        "OFFICIAL PROFILE — MKS.BSDC.INFO.BD",
        MONO,
        eyebrow_size,
        ACCENT_DEEP,
        tracking=eyebrow_tracking,
    )

    name_size = fit_size("Khan Shuvon", DISPLAY, text_width_max, int(62 * SS))
    name1, n1w, n1h = text_layer("Md Mayeed", DISPLAY, name_size, INK)
    name2, n2w, n2h = text_layer("Khan Shuvon", DISPLAY, name_size, INK)

    role_size = fit_size(
        "LL.B (Honours) · IELTS Preparation Specialist", SANS_MEDIUM, text_width_max, int(21 * SS), 12
    )
    role, rw, rh = text_layer(
        "LL.B (Honours) · IELTS Preparation Specialist", SANS_MEDIUM, role_size, ACCENT_DEEP
    )

    edu_size = fit_size(
        "North East University Bangladesh · Sylhet, Bangladesh", SANS, text_width_max, int(18 * SS), 11
    )
    education, edw, edh = text_layer(
        "North East University Bangladesh · Sylhet, Bangladesh", SANS, edu_size, MUTED
    )

    meta_size = 16 * SS
    meta, mw, mh = text_layer(
        "BANGLA · ENGLISH · HINDI      +880 1825-723887",
        MONO,
        meta_size,
        MUTED,
        tracking=0.08 * meta_size,
    )

    url, uw, uh = text_layer("mks.bsdc.info.bd", MONO, int(17 * SS), INK, tracking=0.1 * 17 * SS)

    y = 120 * SS
    paste_alpha(canvas, eyebrow, (pad_x, y))
    y += eh + 26 * SS
    paste_alpha(canvas, name1, (pad_x, y))
    y += n1h + int(0.02 * name_size)
    paste_alpha(canvas, name2, (pad_x, y))
    y += n2h

    # Accent rule sits between the name and the descriptor lines.
    rule_y = y + 18 * SS
    draw.rounded_rectangle(
        [(pad_x, rule_y), (pad_x + 96 * SS, rule_y + 5 * SS)], radius=2 * SS, fill=rgba(ACCENT, 255)
    )

    y = rule_y + 5 * SS + 30 * SS
    paste_alpha(canvas, role, (pad_x, y))
    y += rh + 14 * SS
    paste_alpha(canvas, education, (pad_x, y))
    y += edh + 26 * SS
    paste_alpha(canvas, meta, (pad_x, y))

    paste_alpha(canvas, url, (pad_x, H - 60 * SS - uh))

    return canvas.resize((1200, 630), Image.LANCZOS)


# ------------------------------------------------------------------- output
def save_icons(mark: Image.Image) -> None:
    for size, name in ((512, "logo-512.png"), (192, "logo-192.png"), (180, "apple-touch-icon.png"), (32, "favicon-32.png"), (16, "favicon-16.png")):
        mark.resize((size, size), Image.LANCZOS).save(PUBLIC / name, optimize=True)

    mark.resize((256, 256), Image.LANCZOS).save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    print("icons             <- favicon.ico (16+32+48), favicon-16/32.png, apple-touch-icon.png, logo-192/512.png")


def main() -> int:
    PUBLIC.mkdir(parents=True, exist_ok=True)

    portrait = build_portrait()
    portrait.convert("RGB").save(PUBLIC / "portrait.jpg", quality=88, optimize=True, progressive=True)

    card = build_social_card(portrait)
    card.convert("RGB").save(PUBLIC / "og-image.jpg", quality=90, optimize=True, progressive=True)
    card_size = (PUBLIC / "og-image.jpg").stat().st_size / 1024
    print(f"og-image.jpg      <- 1200x630 social card ({card_size:.1f} KB)")

    save_icons(build_monogram(512))

    print("\nDone. Re-run with a photograph at assets/source/portrait.jpg to swap the placeholder.")
    return 0


if __name__ == "__main__":
    if not FONTS.exists():
        print(f"Font directory missing: {FONTS}", file=sys.stderr)
        sys.exit(1)
    sys.exit(main())
