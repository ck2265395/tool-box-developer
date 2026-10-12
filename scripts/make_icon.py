# -*- coding: utf-8 -*-
"""Generate the app icon (gradient tile + pipette glyph) -> build/icon.ico"""
import math
import numpy as np
from PIL import Image, ImageDraw

S = 1024
OUT_ICO = r"C:\Users\Backend\WorkBuddy\2026-10-10-16-36-57\toolbox\build\icon.ico"
OUT_PNG = r"C:\Users\Backend\WorkBuddy\2026-10-10-16-36-57\toolbox\build\icon_preview.png"

# ---------- 渐变底 ----------
yy, xx = np.mgrid[0:S, 0:S]
t = (xx + yy) / (2.0 * (S - 1))
c1 = np.array([91, 140, 255], dtype=float)     # 5B8CFF
c2 = np.array([138, 108, 255], dtype=float)    # 8A6CFF
rgb = c1[None, None, :] * (1 - t[..., None]) + c2[None, None, :] * t[..., None]

arr = np.zeros((S, S, 4), dtype=np.uint8)
arr[..., :3] = rgb.astype(np.uint8)
arr[..., 3] = 255
grad = Image.fromarray(arr, "RGBA")

mask = Image.new("L", (S, S), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.225), fill=255)

icon = Image.new("RGBA", (S, S), (0, 0, 0, 0))
icon.paste(grad, (0, 0), mask)

# ---------- 滴管图形 ----------
layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(layer)
cx = cy = S // 2

w = S * 0.135                     # 管身宽度
x1, y1 = cx + 0.185 * S, cy - 0.185 * S     # 尾端(右上)
x2, y2 = cx - 0.245 * S, cy + 0.245 * S     # 尖端(左下)
dx, dy = x2 - x1, y2 - y1
L = math.hypot(dx, dy)
ux, uy = dx / L, dy / L
px, py = -uy * w / 2, ux * w / 2

tx, ty = x2 - ux * L * 0.24, y2 - uy * L * 0.24   # 锥体起点

WHITE = (255, 255, 255, 255)
SHADOW = (30, 40, 90, 70)

def body(draw, off=0):
    draw.polygon([
        (x1 + px + off, y1 + py + off),
        (tx + px + off, ty + py + off),
        (tx - px + off, ty - py + off),
        (x1 - px + off, y1 - py + off),
    ], fill=WHITE if off == 0 else SHADOW)
    draw.polygon([
        (tx + px + off, ty + py + off),
        (x2 + off, y2 + off),
        (tx - px + off, ty - py + off),
    ], fill=WHITE if off == 0 else SHADOW)

body(d, off=10)   # 阴影
body(d, off=0)

# 尾端胶囊
r = w * 0.72
d.ellipse([x1 - r, y1 - r, x1 + r, y1 + r], fill=WHITE)

# 管身分隔线(增加细节)
mx, my = x1 + ux * L * 0.30, y1 + uy * L * 0.30
d.line([(mx + px, my + py), (mx - px, my - py)], fill=(91, 140, 255, 255), width=int(S * 0.016))

icon.alpha_composite(layer)

# ---------- 输出 ----------
base = icon.resize((256, 256), Image.LANCZOS)
base.save(OUT_ICO, sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
icon.resize((512, 512), Image.LANCZOS).save(OUT_PNG, "PNG")
print("icon ok ->", OUT_ICO)
