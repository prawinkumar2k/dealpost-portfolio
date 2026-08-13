import sys
from PIL import Image, ImageDraw

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Crop out 5 pixels from all sides to remove any screenshot borders/lines
    width, height = img.size
    img = img.crop((5, 5, width-5, height-5))
    
    width, height = img.size
    temp = img.copy()
    
    # Floodfill from the 4 corners to find contiguous outer white background.
    # We fill it with a distinct color (magenta).
    ImageDraw.floodfill(temp, (0, 0), (255, 0, 255, 255), thresh=55)
    ImageDraw.floodfill(temp, (width-1, 0), (255, 0, 255, 255), thresh=55)
    ImageDraw.floodfill(temp, (0, height-1), (255, 0, 255, 255), thresh=55)
    ImageDraw.floodfill(temp, (width-1, height-1), (255, 0, 255, 255), thresh=55)
    
    datas = img.getdata()
    temp_datas = temp.getdata()
    
    newData = []
    for i, item in enumerate(temp_datas):
        # if pixel was filled with magenta, make it transparent
        if item == (255, 0, 255, 255):
            newData.append((255, 255, 255, 0))
        else:
            newData.append(datas[i])
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if len(sys.argv) == 3:
    remove_white_bg(sys.argv[1], sys.argv[2])
