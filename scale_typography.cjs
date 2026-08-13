const fs = require('fs');
let css = fs.readFileSync('client/global.css', 'utf8');

css = css.replace(/clamp\((\d+)px,\s*([\d.]+)vw,\s*(\d+)px\)/g, (match, min, vw, max) => {
    const newMin = Math.round(parseInt(min) * 0.65);
    const newVw = (parseFloat(vw) * 0.65).toFixed(1);
    const newMax = Math.round(parseInt(max) * 0.55);
    return `clamp(${newMin}px, ${newVw}vw, ${newMax}px)`;
});

css = css.replace(/font-size:\s*(\d+)px/g, (match, size) => {
    const val = parseInt(size);
    return val > 50 ? `font-size: ${Math.round(val * 0.6)}px` : match;
});

fs.writeFileSync('client/global.css', css);
console.log('Typography scaled down successfully.');
