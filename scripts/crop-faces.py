"""Recorta las 8 caras de la foto grupal (izquierda → derecha)."""
from pathlib import Path

from PIL import Image

SOURCE = Path(__file__).resolve().parent.parent / "public/photos/group.jpg"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public/photos"

# Orden en la foto: izquierda → derecha
# Verificar que coincida con PAME, ANA, LU, VERO, GABI, YANI, EVE, SIL
NAMES = ["pame", "ana", "lu", "vero", "gabi", "yani", "eve", "sil"]

# Ajustado para foto 1200×1600 (retrato, 8 personas en fila)
TOP_Y_RATIO = 0.305
CROP_SCALE = 1.15  # multiplicador del ancho de columna
MARGIN_X_RATIO = 0.02


def crop_faces() -> None:
    img = Image.open(SOURCE)
    width, height = img.size

    margin_x = int(width * MARGIN_X_RATIO)
    usable_w = width - 2 * margin_x
    col_w = usable_w / len(NAMES)
    crop_size = int(col_w * CROP_SCALE)
    top_y = int(height * TOP_Y_RATIO)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for i, name in enumerate(NAMES):
        center_x = margin_x + col_w * (i + 0.5)
        left = int(center_x - crop_size / 2)
        top = top_y
        right = left + crop_size
        bottom = top + crop_size

        # Mantener dentro de la imagen
        if left < 0:
            left = 0
            right = crop_size
        if right > width:
            right = width
            left = width - crop_size

        face = img.crop((left, top, right, bottom))
        face.save(OUTPUT_DIR / f"{name}.jpg", quality=92, optimize=True)
        print(f"  {name}.jpg  ->  ({left}, {top}, {right}, {bottom})")

    preview = Image.new("RGB", (crop_size * len(NAMES), crop_size), "#f3f1ed")
    for i, name in enumerate(NAMES):
        face = Image.open(OUTPUT_DIR / f"{name}.jpg")
        preview.paste(face, (i * crop_size, 0))
    preview.save(OUTPUT_DIR / "_preview-crops.jpg", quality=90)
    print(f"\nPreview: public/photos/_preview-crops.jpg")


if __name__ == "__main__":
    print(f"Source: {SOURCE} ({Image.open(SOURCE).size})")
    crop_faces()
