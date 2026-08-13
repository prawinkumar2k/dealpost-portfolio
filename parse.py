import sys
import subprocess

subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
import PyPDF2
reader = PyPDF2.PdfReader('Dealpost Portfolio.pdf')
text = '\n'.join(page.extract_text() for page in reader.pages)
with open('portfolio_text.txt', 'w', encoding='utf-8') as f:
    f.write(text)
