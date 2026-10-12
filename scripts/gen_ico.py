# -*- coding: utf-8 -*-
"""
把选定的图标候选 (G3_DT玄黑金) 转成:
  1. build/icon.ico        —— electron-builder 打包用 (256/128/64/48/32/16)
  2. build/icon_preview.png —— 预览图 (大图 + 小尺寸自查)
  3. src/renderer/assets/logo.png —— 侧栏品牌 logo
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "build", "icon_variants2", "G3_DT玄黑金.png")
BUILD = os.path.join(ROOT, "build")
ASSETS = os.path.join(ROOT, "src", "renderer", "assets")


def main():
    img = Image.open(SRC).convert("RGBA")
    print("source:", SRC.split(os.sep)[-1], img.size)

    # ---------- 1. 多尺寸 ICO ----------
    sizes = [(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
    ico_path = os.path.join(BUILD, "icon.ico")
    # Pillow 会按 sizes 里最大的尺寸作为主图，先重采样到 256 保证质量
    img.resize((256, 256), Image.LANCZOS).save(ico_path, format="ICO", sizes=sizes)
    print("OK  icon.ico  (%.1f KB)" % (os.path.getsize(ico_path) / 1024))

    # ---------- 2. 预览图 ----------
    pad, big, small, tiny = 28, 256, 64, 32
    w = pad * 4 + big + small + tiny
    h = pad * 2 + big + 30
    sheet = Image.new("RGB", (w, h), (246, 246, 248))
    d = ImageDraw.Draw(sheet)
    font = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 17)
    x = pad
    for label, sz in (("256px", big), ("64px", small), ("32px", tiny)):
        sheet.paste(img.resize((sz, sz), Image.LANCZOS), (x, pad + 30))
        d.text((x + sz / 2 - d.textlength(label, font=font) / 2, pad + 6),
               label, font=font, fill=(40, 42, 48))
        x += sz + pad
    prev = os.path.join(BUILD, "icon_preview.png")
    sheet.save(prev)
    print("OK  icon_preview.png")

    # ---------- 3. 侧栏 logo ----------
    os.makedirs(ASSETS, exist_ok=True)
    logo = os.path.join(ASSETS, "logo.png")
    img.resize((72, 72), Image.LANCZOS).save(logo)
    print("OK  src/renderer/assets/logo.png")


if __name__ == "__main__":
    main()
