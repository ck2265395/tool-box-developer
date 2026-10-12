# -*- coding: utf-8 -*-
"""生成「东土」工具箱图标的候选方案（纯程序绘制，输出多尺寸与对照表）。"""
import os
from PIL import Image, ImageDraw, ImageFont
import numpy as np

S = 1024
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "build", "icon_variants")
os.makedirs(OUT, exist_ok=True)

FONTS = [
    r"C:\Windows\Fonts\msyhbd.ttc",
    r"C:\Windows\Fonts\simhei.ttf",
    r"C:\Windows\Fonts\Dengb.ttf",
    r"C:\Windows\Fonts\msyh.ttc",
]


def load_font(px, index=0):
    for p in FONTS:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, px, index=index)
            except Exception:
                continue
    raise RuntimeError("no CJK font found")


def rounded_mask(size, radius, ss=3):
    m = Image.new("L", (size * ss, size * ss), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        [0, 0, size * ss - 1, size * ss - 1], radius=int(radius * ss), fill=255
    )
    return m.resize((size, size), Image.LANCZOS)


def diag_grad(size, c1, c2, tx=0.6, ty=0.4):
    x = np.linspace(0, 1, size)[None, :]
    y = np.linspace(0, 1, size)[:, None]
    t = np.clip(x * tx + y * ty, 0, 1)
    a = np.array(c1, float)[None, None, :]
    b = np.array(c2, float)[None, None, :]
    return Image.fromarray((a + (b - a) * t[:, :, None]).astype("uint8"), "RGB")


def gloss(img, strength=40, span=0.42):
    gl = Image.new("L", (S, S), 0)
    d = ImageDraw.Draw(gl)
    n = int(S * span)
    for i in range(n):
        d.line([(0, i), (S, i)], fill=int(strength * (1 - i / n) ** 2))
    img.paste(Image.new("RGBA", (S, S), (255, 255, 255, 255)), (0, 0), gl)


def draw_track(base, text, f, fill, track, dy):
    d = ImageDraw.Draw(base)
    boxes = [d.textbbox((0, 0), ch, font=f) for ch in text]
    widths = [b[2] - b[0] for b in boxes]
    total = sum(widths) + track * (len(text) - 1)
    x = (S - total) / 2
    for ch, b, w in zip(text, boxes, widths):
        ty = (S - (b[3] - b[1])) / 2 - b[1] + dy
        d.text((x - b[0], ty), ch, font=f, fill=fill)
        x += w + track


def build(name, c1, c2, radius=0.225, glyph=None, f_ratio=0.60,
          glyph_fill=(255, 255, 255, 255), border=None, dy=-0.012,
          use_gloss=True, extra=None, track=0):
    base = diag_grad(S, c1, c2).convert("RGBA")
    if use_gloss:
        gloss(base)
    if extra:
        extra(base)
    if glyph:
        f = load_font(int(S * f_ratio))
        if track:
            draw_track(base, glyph, f, glyph_fill, track, S * dy)
        else:
            d = ImageDraw.Draw(base)
            b = d.textbbox((0, 0), glyph, font=f)
            d.text(((S - (b[2] - b[0])) / 2 - b[0],
                    (S - (b[3] - b[1])) / 2 - b[1] + S * dy), glyph, font=f, fill=glyph_fill)
    if border:
        ring = Image.new("L", (S, S), 0)
        inset, wdt = int(S * 0.052), int(S * 0.015)
        ImageDraw.Draw(ring).rounded_rectangle(
            [inset, inset, S - 1 - inset, S - 1 - inset],
            radius=int(S * (radius - 0.028)), outline=255, width=wdt)
        base.paste(Image.new("RGBA", (S, S), border), (0, 0), ring)
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(base, (0, 0), rounded_mask(S, S * radius))
    out.save(os.path.join(OUT, name + ".png"))
    return out


def box_extra(img):
    """工具箱图形：提手 + 箱盖 + 箱体 + 彩色卡扣（呼应取色功能）。"""
    d = ImageDraw.Draw(img)
    W = (255, 255, 255, 255)
    # 彩色顶边，暗示取色
    d.rounded_rectangle([int(S * 0.155), int(S * 0.355), int(S * 0.845), int(S * 0.383)],
                        radius=int(S * 0.014), fill=(34, 211, 238, 255))
    # 提手
    d.rounded_rectangle([int(S * 0.400), int(S * 0.245), int(S * 0.600), int(S * 0.400)],
                        radius=int(S * 0.048), outline=W, width=int(S * 0.032))
    # 箱盖
    d.rounded_rectangle([int(S * 0.150), int(S * 0.383), int(S * 0.850), int(S * 0.487)],
                        radius=int(S * 0.030), fill=W)
    # 箱体
    d.rounded_rectangle([int(S * 0.185), int(S * 0.487), int(S * 0.815), int(S * 0.790)],
                        radius=int(S * 0.042), fill=W)
    # 卡扣
    d.rounded_rectangle([int(S * 0.452), int(S * 0.447), int(S * 0.548), int(S * 0.560)],
                        radius=int(S * 0.020), fill=(34, 211, 238, 255))


def make_sheet(icons, bg, path):
    n = len(icons)
    big, small, tiny, gap, m = 260, 64, 28, 22, 26
    w = m * 2 + n * big + (n - 1) * gap
    h = m + big + 34 + 40 + small + 30 + tiny + m
    sh = Image.new("RGB", (w, h), bg)
    f_lab = load_font(20)
    d = ImageDraw.Draw(sh)
    fg = (40, 42, 48) if sum(bg) > 380 else (232, 234, 240)
    for i, (nm, im) in enumerate(icons):
        x = m + i * (big + gap)
        sh.paste(im.convert("RGBA").resize((big, big), Image.LANCZOS), (x, m), im.resize((big, big), Image.LANCZOS))
        label = nm.split("_", 1)[1].replace("_", " ")
        d.text((x + big / 2 - d.textlength(label, font=f_lab) / 2, m + big + 8), label, font=f_lab, fill=fg)
        y2 = m + big + 34 + 40
        sh.paste(im.convert("RGBA").resize((small, small), Image.LANCZOS), (x, y2), im.resize((small, small), Image.LANCZOS))
        y3 = y2 + small + 30
        sh.paste(im.convert("RGBA").resize((tiny, tiny), Image.LANCZOS), (x, y3), im.resize((tiny, tiny), Image.LANCZOS))
    sh.save(path, quality=93)
    return path


def main():
    icons = []
    icons.append(("A_墨青印章", build("A_墨青印章_东", (30, 46, 80), (9, 14, 28),
                                     border=(255, 255, 255, 62), glyph="东", f_ratio=0.60)))
    icons.append(("B_朱红印章", build("B_朱红印章_东", (198, 52, 44), (114, 22, 19),
                                     border=(255, 255, 255, 74), glyph="东", f_ratio=0.60)))
    icons.append(("C_紫青渐变", build("C_紫青渐变_东", (34, 211, 238), (146, 68, 240),
                                     glyph="东", f_ratio=0.60, use_gloss=False)))
    icons.append(("D_宣纸米白", build("D_宣纸米白_东", (247, 245, 238), (213, 205, 189),
                                     glyph="东", f_ratio=0.60, glyph_fill=(26, 30, 38, 255),
                                     border=(26, 30, 38, 46), dy=-0.012, use_gloss=False)))
    icons.append(("E_玄黑工具箱", build("E_玄黑工具箱", (26, 30, 40), (11, 13, 19),
                                     extra=box_extra)))
    icons.append(("F_玄黑东土", build("F_玄黑东土", (28, 31, 39), (12, 13, 17),
                                     glyph="东土", f_ratio=0.40, track=int(S * 0.018))))

    for nm, im in icons:
        im.save(os.path.join(OUT, nm + ".png"))
        print("saved", nm)

    make_sheet(icons, (246, 246, 248), os.path.join(ROOT, "_qa_icon_light.jpg"))
    make_sheet(icons, (22, 23, 27), os.path.join(ROOT, "_qa_icon_dark.jpg"))
    print("sheets ok")


if __name__ == "__main__":
    main()
