# -*- coding: utf-8 -*-
"""「东土百宝箱」图标第二轮：DT 字母方向 + 百宝箱图形方向。"""
import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

S = 1024
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "build", "icon_variants2")
os.makedirs(OUT, exist_ok=True)

LATIN_FONTS = [r"C:\Windows\Fonts\ariblk.ttf", r"C:\Windows\Fonts\seguibl.ttf",
               r"C:\Windows\Fonts\arialbd.ttf", r"C:\Windows\Fonts\verdanab.ttf"]
CJK_FONTS = [r"C:\Windows\Fonts\msyhbd.ttc", r"C:\Windows\Fonts\simhei.ttf"]

USED = {}


def load_font(px, kind="latin", index=0):
    cands = LATIN_FONTS if kind == "latin" else CJK_FONTS
    for p in cands:
        if os.path.exists(p):
            try:
                f = ImageFont.truetype(p, px, index=index)
                USED[kind] = os.path.basename(p)
                return f
            except Exception:
                continue
    raise RuntimeError("no font: " + kind)


def rounded_mask(size, radius, ss=3):
    m = Image.new("L", (size * ss, size * ss), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size * ss - 1, size * ss - 1],
                                        radius=int(radius * ss), fill=255)
    return m.resize((size, size), Image.LANCZOS)


def diag_grad(size, c1, c2, tx=0.6, ty=0.4):
    x = np.linspace(0, 1, size)[None, :]
    y = np.linspace(0, 1, size)[:, None]
    t = np.clip(x * tx + y * ty, 0, 1)
    a = np.array(c1, float)[None, None, :]
    b = np.array(c2, float)[None, None, :]
    return Image.fromarray((a + (b - a) * t[:, :, None]).astype("uint8"), "RGB").convert("RGBA")


def gloss(img, strength=38, span=0.42):
    gl = Image.new("L", (S, S), 0)
    d = ImageDraw.Draw(gl)
    n = int(S * span)
    for i in range(n):
        d.line([(0, i), (S, i)], fill=int(strength * (1 - i / n) ** 2))
    img.paste(Image.new("RGBA", (S, S), (255, 255, 255, 255)), (0, 0), gl)


def star4(d, cx, cy, r, fill, waist=0.30):
    pts = []
    for i in range(4):
        a = math.radians(90 * i)
        pts.append((cx + r * math.cos(a), cy - r * math.sin(a)))
        a2 = math.radians(90 * i + 45)
        pts.append((cx + r * waist * math.cos(a2), cy - r * waist * math.sin(a2)))
    d.polygon(pts, fill=fill)


def draw_track(base, text, f, fill, track, dy):
    d = ImageDraw.Draw(base)
    boxes = [d.textbbox((0, 0), ch, font=f) for ch in text]
    widths = [b[2] - b[0] for b in boxes]
    total = sum(widths) + track * (len(text) - 1)
    x = (S - total) / 2
    for ch, b, w in zip(text, boxes, widths):
        d.text((x - b[0], (S - (b[3] - b[1])) / 2 - b[1] + dy), ch, font=f, fill=fill)
        x += w + track


# ------------------------------- 百宝箱图形 -------------------------------

def chest_layer(gold, gold_dark, gold_light, lock_c, detailed=True):
    """返回 (图层, 遮罩)：一个带穹顶盖的宝箱。"""
    cx = S / 2
    hw = S * 0.295
    top = S * 0.300
    body_top = top + hw
    body_bottom = S * 0.795
    r = int(S * 0.045)

    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    dl = ImageDraw.Draw(layer)
    dl.rounded_rectangle([cx - hw, body_top, cx + hw, body_bottom], radius=r, fill=gold)
    dl.rectangle([cx - hw, body_top, cx + hw, body_top + r], fill=gold)
    dl.pieslice([cx - hw, top, cx + hw, top + 2 * hw], 180, 360, fill=gold)

    mask = layer.split()[3]

    def clip_paste(lay):
        clip = Image.composite(lay.split()[3], Image.new("L", (S, S), 0), mask)
        layer.paste(lay, (0, 0), clip)

    if detailed:
        st = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ds = ImageDraw.Draw(st)
        sw = S * 0.050
        for sx in (cx - hw + S * 0.108, cx + hw - S * 0.108 - sw):
            ds.rectangle([sx, top, sx + sw, body_bottom], fill=gold_dark)
        clip_paste(st)

        jn = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ImageDraw.Draw(jn).rectangle([cx - hw, body_top - S * 0.020, cx + hw, body_top + S * 0.020],
                                     fill=gold_dark)
        clip_paste(jn)

        # 盖子左侧高光
        hl = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        dh = ImageDraw.Draw(hl)
        dh.pieslice([cx - hw + S * 0.055, top + S * 0.055, cx + hw - S * 0.020, top + 2 * hw - S * 0.020],
                    185, 262, fill=gold_light)
        clip_paste(hl)

    # 锁扣
    lk = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    dlk = ImageDraw.Draw(lk)
    lw, lh = S * 0.108, S * 0.140
    dlk.rounded_rectangle([cx - lw / 2, body_top - lh / 2, cx + lw / 2, body_top + lh / 2],
                          radius=int(S * 0.026), fill=lock_c)
    dlk.ellipse([cx - S * 0.017, body_top - S * 0.014, cx + S * 0.017, body_top + S * 0.020],
                fill=(255, 236, 186, 255))
    clip_paste(lk)

    return layer, mask


def build_chest(name, bg1, bg2, gold, gold_dark, gold_light, lock_c,
                detailed=True, sparkles=True, radius=0.225, glow=True):
    base = diag_grad(S, bg1, bg2)
    if glow:
        cx, hw = S / 2, S * 0.295
        g = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ImageDraw.Draw(g).ellipse([cx - hw * 1.55, S * 0.16, cx + hw * 1.55, S * 0.94],
                                  fill=(255, 208, 96, 58))
        base.alpha_composite(g.filter(ImageFilter.GaussianBlur(S * 0.065)))
    gloss(base, 34, 0.40)
    layer, mask = chest_layer(gold, gold_dark, gold_light, lock_c, detailed)
    base.paste(layer, (0, 0), mask)
    if sparkles:
        d = ImageDraw.Draw(base)
        star4(d, S * 0.205, S * 0.295, S * 0.052, (255, 242, 200, 255))
        star4(d, S * 0.800, S * 0.250, S * 0.036, (255, 242, 200, 235))
        star4(d, S * 0.788, S * 0.760, S * 0.028, (255, 242, 200, 205))
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(base, (0, 0), rounded_mask(S, S * radius))
    out.save(os.path.join(OUT, name + ".png"))
    return out


# -------------------------------- DT 字母 --------------------------------

def build_dt(name, c1, c2, glyph_fill=(255, 255, 255, 255), border=None,
             f_ratio=0.655, track=-0.036, radius=0.225, use_gloss=True,
             accent=None):
    base = diag_grad(S, c1, c2)
    if use_gloss:
        gloss(base)
    if accent:
        accent(base)
    f = load_font(int(S * f_ratio), "latin")
    draw_track(base, "DT", f, glyph_fill, S * track, -S * 0.012)
    if border:
        ring = Image.new("L", (S, S), 0)
        inset, wdt = int(S * 0.052), int(S * 0.015)
        ImageDraw.Draw(ring).rounded_rectangle([inset, inset, S - 1 - inset, S - 1 - inset],
                                              radius=int(S * (radius - 0.028)), outline=255, width=wdt)
        base.paste(Image.new("RGBA", (S, S), border), (0, 0), ring)
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(base, (0, 0), rounded_mask(S, S * radius))
    out.save(os.path.join(OUT, name + ".png"))
    return out


def make_sheet(icons, bg, path):
    n = len(icons)
    big, small, tiny, gap, m = 260, 64, 28, 22, 26
    w = m * 2 + n * big + (n - 1) * gap
    h = m + big + 34 + 40 + small + 30 + tiny + m
    sh = Image.new("RGB", (w, h), bg)
    f_lab = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 19)
    d = ImageDraw.Draw(sh)
    fg = (40, 42, 48) if sum(bg) > 380 else (232, 234, 240)
    for i, (nm, im) in enumerate(icons):
        x = m + i * (big + gap)
        sh.paste(im.convert("RGBA").resize((big, big), Image.LANCZOS), (x, m))
        label = nm.split("_", 1)[1].replace("_", " ")
        d.text((x + big / 2 - d.textlength(label, font=f_lab) / 2, m + big + 8), label, font=f_lab, fill=fg)
        y2 = m + big + 34 + 40
        sh.paste(im.convert("RGBA").resize((small, small), Image.LANCZOS), (x, y2))
        y3 = y2 + small + 30
        sh.paste(im.convert("RGBA").resize((tiny, tiny), Image.LANCZOS), (x, y3))
    sh.save(path, quality=93)


def main():
    GOLD = (243, 197, 74, 255)
    GOLD_D = (170, 116, 26, 255)
    GOLD_L = (255, 234, 158, 255)
    LOCK = (104, 66, 12, 255)

    icons = []
    icons.append(("G1_DT紫青渐变", build_dt("G1_DT紫青渐变", (34, 211, 238), (146, 68, 240), use_gloss=False)))
    icons.append(("G2_DT墨青印章", build_dt("G2_DT墨青印章", (30, 46, 80), (9, 14, 28),
                                          border=(255, 255, 255, 62))))
    icons.append(("G3_DT玄黑金", build_dt("G3_DT玄黑金", (34, 31, 26), (13, 12, 11),
                                        glyph_fill=(243, 197, 74, 255))))
    icons.append(("G4_百宝箱朱红金", build_chest("G4_百宝箱朱红金", (172, 44, 36), (92, 16, 13),
                                              GOLD, GOLD_D, GOLD_L, LOCK)))
    icons.append(("G5_百宝箱墨青金", build_chest("G5_百宝箱墨青金", (32, 48, 82), (9, 14, 28),
                                              GOLD, GOLD_D, GOLD_L, LOCK)))
    icons.append(("G6_宝箱极简白", build_chest("G6_宝箱极简白", (34, 211, 238), (146, 68, 240),
                                             (255, 255, 255, 255), (255, 255, 255, 255),
                                             (255, 255, 255, 255), (255, 255, 255, 255),
                                             detailed=False, sparkles=False, glow=False)))

    for nm, im in icons:
        print("saved", nm)

    make_sheet(icons, (246, 246, 248), os.path.join(ROOT, "_qa_icon2_light.jpg"))
    make_sheet(icons, (22, 23, 27), os.path.join(ROOT, "_qa_icon2_dark.jpg"))
    print("fonts:", USED)
    print("sheets ok")


if __name__ == "__main__":
    main()
