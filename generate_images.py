import os

html = "<html><body style='display:flex; flex-wrap:wrap; font-family:sans-serif;'>"
for f in sorted(os.listdir("public")):
    if f.startswith("project") or f.startswith("pdf_img"):
        html += f"<div style='width:300px; padding:10px; border:1px solid #ccc; margin:5px;'><img src='{f}' width='250'><br><strong>{f}</strong></div>"
html += "</body></html>"

with open("public/all-images.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Done")
