import sys
import subprocess
try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Increase tolerance slightly to get rid of anti-aliasing gray pixels around logo
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if len(sys.argv) == 3:
    remove_white_bg(sys.argv[1], sys.argv[2])
