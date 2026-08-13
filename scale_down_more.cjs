const fs = require('fs');

function scaleDown(filePath) {
    if (!fs.existsSync(filePath)) return;
    let css = fs.readFileSync(filePath, 'utf8');

    css = css.replace(/clamp\((\d+)px,\s*([\d.]+)vw,\s*(\d+)px\)/g, (match, min, vw, max) => {
        const newMin = Math.round(parseInt(min) * 0.5);
        const newVw = (parseFloat(vw) * 0.5).toFixed(1);
        const newMax = Math.round(parseInt(max) * 0.5);
        return `clamp(${newMin}px, ${newVw}vw, ${newMax}px)`;
    });

    css = css.replace(/font-size:\s*(\d+)px/g, (match, size) => {
        const val = parseInt(size);
        return val > 30 ? `font-size: ${Math.round(val * 0.5)}px` : match;
    });

    fs.writeFileSync(filePath, css);
    console.log('Scaled down ' + filePath);
}

scaleDown('client/global.css');
scaleDown('C:/Users/Hp/Downloads/mern-lms-platform-1cb/client/global.css');
