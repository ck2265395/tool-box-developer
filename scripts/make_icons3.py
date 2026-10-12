# -*- coding: utf-8 -*-
"""「东土百宝箱」图标第三轮：修正宝箱比例/高光/星光 + 极简版 + DT工具版。"""
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

# ---- 宝箱几何（统一常量，保证同族图标比例一致）----
CX = S / 2
HW = S * 0.278          # 半宽
TOP = S * 0.215         # 盖子顶点
BODY_TOP = TOP + HW     # 盖底 = 箱体顶
BODY_BOT = S * 0.778
STW = S * 0.050         # 竖带宽度
STX = S * 0.155         # 竖带中心偏移


def load_font(px, kind="latin", index=0):
    cands = LATIN_FONTS if kind == "latin" else [r"C:\Windows\Fonts\msyhbd.ttc"]
    for p in cands:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, px, index=index)
            except Exception:
                continue
    raise RuntimeError("no font")


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


def gloss(img, strength=34, span=0.42):
    if strength <= 0:
        return
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


def draw_track(base, text, f, fill, track, dy, dx=0):
    d = ImageDraw.Draw(base)
    boxes = [d.textbbox((0, 0), ch, font=f) for ch in text]
    widths = [b[2] - b[0] for b in boxes]
    total = sum(widths) + track * (len(text) - 1)
    x = (S - total) / 2 + dx
    for ch, b, w in zip(text, boxes, widths):
        d.text((x - b[0], (S - (b[3] - b[1])) / 2 - b[1] + dy), ch, font=f, fill=fill)
        x += w + track


# ------------------------------- 百宝箱图形 -------------------------------

def lighten(c, k):
    return tuple(int(v + (255 - v) * k) for v in c[:3]) + (c[3],)


def chest_shapes(dl, body_fill, lid_fill):
    """箱体 + 穹顶盖，盖子用更浅一档的颜色做分色。"""
    r = int(S * 0.042)
    dl.rounded_rectangle([CX - HW, BODY_TOP, CX + HW, BODY_BOT], radius=r, fill=body_fill)
    dl.rectangle([CX - HW, BODY_TOP, CX + HW, BODY_TOP + r], fill=body_fill)
    dl.pieslice([CX - HW, TOP, CX + HW, TOP + 2 * HW], 180, 360, fill=lid_fill)


def chest_layer(gold, gold_dark, gold_light, lock_c, detailed=True):
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    chest_shapes(ImageDraw.Draw(layer), gold, lighten(gold, 0.16))
    mask = layer.split()[3]

    def clip_paste(lay):
        clip = Image.composite(lay.split()[3], Image.new("L", (S, S), 0), mask)
        layer.paste(lay, (0, 0), clip)

    if detailed:
        st = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ds = ImageDraw.Draw(st)
        for c in (CX - STX - STW / 2, CX + STX - STW / 2):
            ds.rectangle([c, TOP, c + STW, BODY_BOT], fill=gold_dark)
        clip_paste(st)

        jn = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ImageDraw.Draw(jn).rectangle(
            [CX - HW, BODY_TOP - S * 0.020, CX + HW, BODY_TOP + S * 0.020], fill=gold_dark)
        clip_paste(jn)

    # 锁扣
    lk = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    dlk = ImageDraw.Draw(lk)
    lw, lh = S * 0.104, S * 0.132
    dlk.rounded_rectangle([CX - lw / 2, BODY_TOP - lh / 2, CX + lw / 2, BODY_TOP + lh / 2],
                          radius=int(S * 0.024), fill=lock_c)
    dlk.ellipse([CX - S * 0.016, BODY_TOP - S * 0.013, CX + S * 0.016, BODY_TOP + S * 0.019],
                fill=(255, 238, 196, 255))
    clip_paste(lk)
    return layer, mask


def build_chest(name, bg1, bg2, gold, gold_dark, gold_light, lock_c,
                detailed=True, sparkles=True, radius=0.225):
    base = diag_grad(S, bg1, bg2)
    if detailed:
        g = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ImageDraw.Draw(g).ellipse([CX - HW * 1.55, S * 0.10, CX + HW * 1.55, S * 0.90],
                                  fill=(255, 208, 96, 56))
        base.alpha_composite(g.filter(ImageFilter.GaussianBlur(S * 0.065)))
    gloss(base, 32 if detailed else 30, 0.40)
    layer, mask = chest_layer(gold, gold_dark, gold_light, lock_c, detailed)
    base.paste(layer, (0, 0), mask)
    if sparkles:
        d = ImageDraw.Draw(base)
        star4(d, S * 0.196, S * 0.272, S * 0.050, (255, 242, 200, 255))
        star4(d, S * 0.806, S * 0.236, S * 0.033, (255, 242, 200, 232))
        star4(d, S * 0.152, S * 0.648, S * 0.026, (255, 242, 200, 200))
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(base, (0, 0), rounded_mask(S, S * radius))
    out.save(os.path.join(OUT, name + ".png"))
    return out


def build_chest_minimal(name, bg1, bg2, radius=0.225):
    """白色宝箱剪影 + 镂空线条（把底色透出来），小尺寸最清楚。"""
    base = diag_grad(S, bg1, bg2)
    gloss(base, 30, 0.40)
    W = (255, 255, 255, 255)
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    chest_shapes(ImageDraw.Draw(layer), W, W)
    mask = layer.split()[3]
    base.paste(layer, (0, 0), mask)

    lines = Image.new("L", (S, S), 0)
    dl = ImageDraw.Draw(lines)
    for c in (CX - STX - STW / 2, CX + STX - STW / 2):
        dl.rectangle([c, TOP, c + STW, BODY_BOT], fill=255)
    dl.rectangle([CX - HW, BODY_TOP - S * 0.020, CX + HW, BODY_TOP + S * 0.020], fill=255)
    lw, lh = S * 0.104, S * 0.132
    dl.rounded_rectangle([CX - lw / 2, BODY_TOP - lh / 2, CX + lw / 2, BODY_TOP + lh / 2],
                         radius=int(S * 0.024), fill=255)
    lines = Image.composite(lines, Image.new("L", (S, S), 0), mask)
    base.paste(diag_grad(S, bg1, bg2), (0, 0), lines)

    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(base, (0, 0), rounded_mask(S, S * radius))
    out.save(os.path.join(OUT, name + ".png"))
    return out


# -------------------------------- DT 字母 --------------------------------

def screwdriver(img, x, y0, y1, w, handle_c, shaft_c):
    """竖直螺丝刀：胶囊手柄 + 金属箍 + 杆 + 一字刀头。"""
    L = y1 - y0
    d = ImageDraw.Draw(img)
    hh = L * 0.30
    d.rounded_rectangle([x - w * 0.78, y0, x + w * 0.78, y0 + hh],
                        radius=int(w * 0.70), fill=handle_c)
    fh = L * 0.055
    d.rectangle([x - w * 0.46, y0 + hh - w * 0.10, x + w * 0.46, y0 + hh + fh], fill=shaft_c)
    d.rectangle([x - w * 0.16, y0 + hh + fh, x + w * 0.16, y1 - L * 0.055], fill=shaft_c)
    d.polygon([(x - w * 0.30, y1 - L * 0.055), (x + w * 0.30, y1 - L * 0.055),
               (x + w * 0.10, y1), (x - w * 0.10, y1)], fill=shaft_c)


def build_dt(name, c1, c2, glyph_fill=(255, 255, 255, 255), border=None,
             f_ratio=0.655, track=-0.036, radius=0.225, use_gloss=True,
             extra=None, dx=0):
    base = diag_grad(S, c1, c2)
    if use_gloss:
        gloss(base)
    if extra:
        extra(base)
    draw_track(base, "DT", load_font(int(S * f_ratio), "latin"), glyph_fill, S * track, -S * 0.012, S * dx)
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
    big, small, tiny, gap, m = 250, 64, 28, 20, 24
    w = m * 2 + n * big + (n - 1) * gap
    h = m + big + 32 + 38 + small + 28 + tiny + m
    sh = Image.new("RGB", (w, h), bg)
    f_lab = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 18)
    d = ImageDraw.Draw(sh)
    fg = (40, 42, 48) if sum(bg) > 380 else (232, 234, 240)
    for i, (nm, im) in enumerate(icons):
        x = m + i * (big + gap)
        sh.paste(im.convert("RGBA").resize((big, big), Image.LANCZOS), (x, m))
        label = nm.split("_", 1)[1].replace("_", " ")
        d.text((x + big / 2 - d.textlength(label, font=f_lab) / 2, m + big + 6), label, font=f_lab, fill=fg)
        y2 = m + big + 32 + 38
        sh.paste(im.convert("RGBA").resize((small, small), Image.LANCZOS), (x, y2))
        y3 = y2 + small + 28
        sh.paste(im.convert("RGBA").resize((tiny, tiny), Image.LANCZOS), (x, y3))
    sh.save(path, quality=93)


def main():
    GOLD, GOLD_D = (243, 197, 74, 255), (170, 116, 26, 255)
    GOLD_L, LOCK = (255, 234, 158, 255), (104, 66, 12, 255)

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
    icons.append(("G6_宝箱极简白", build_chest_minimal("G6_宝箱极简白", (30, 58, 120), (10, 14, 30))))
    icons.append(("G7_DT加工具", build_dt(
        "G7_DT加工具", (26, 32, 48), (10, 12, 20), f_ratio=0.52, track=-0.030, dx=-0.115,
        extra=lambda im: screwdriver(im, S * 0.815, S * 0.300, S * 0.700, S * 0.052,
                                     (34, 211, 238, 255), (240, 244, 252, 255)))))

    for nm, im in icons:
        print("saved", nm)
    make_sheet(icons, (246, 246, 248), os.path.join(ROOT, "_qa_icon2_light.jpg"))
    make_sheet(icons, (22, 23, 27), os.path.join(ROOT, "_qa_icon2_dark.jpg"))
    print("sheets ok")


if __name__ == "__main__":
    main()
