import sys
import subprocess
try:
    from rembg import remove
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "Pillow"])
    from rembg import remove
    from PIL import Image

def remove_bg(input_path, output_path):
    input_image = Image.open(input_path)
    # Using rembg to smartly remove only the background and preserve the white inside the logo
    output_image = remove(input_image)
    output_image.save(output_path, "PNG")

if len(sys.argv) == 3:
    remove_bg(sys.argv[1], sys.argv[2])
