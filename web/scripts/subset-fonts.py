"""Optional rebuild of committed fonts. Requires FontTools with WOFF support."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

root = Path(__file__).resolve().parent.parent
for part in ["latin", "latin-ext"]:
    font = TTFont(root / "node_modules/@fontsource-variable/roboto-flex/files" / f"roboto-flex-{part}-standard-normal.woff2")
    fixed_axes = {axis.axisTag: axis.defaultValue for axis in font["fvar"].axes if axis.axisTag not in ["wght", "wdth"]}
    instantiateVariableFont(font, fixed_axes, inplace=True)
    font["gvar"].variations = {glyph: font["gvar"].variations.get(glyph, []) for glyph in font.getGlyphOrder()}
    options = subset.Options()
    options.layout_features = ["*"]
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=list(range(0x20, 0x250)) + list(range(0x2000, 0x2070)) + list(range(0x2190, 0x2200)) + [0x20AC])
    sub.subset(font)
    font.flavor = "woff2"
    font.save(root / "public/fonts" / f"roboto-flex-{part}.woff2")
