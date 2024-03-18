const radius = 200;
const lineWidth = 1;
const arrowWidth = 5;
const arrowLengthInLine = 16;
const arrowLengthInElipse = 16;
const countOfVertixes = 10;
const vertixRadius = 18;
const distanceBetweenLines = 10;
const textAreaFontSize = 20;
const k = 0.745;

const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top=0;
canvas.style.left=0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = 'canvas';
const ctx = canvas.getContext('2d');
let matrix = [];
const textAreas = [document.createElement('textarea'),
    document.createElement('textarea')];
for(let i = 0; i < textAreas.length; i++) {
    const textArea = textAreas[i]
    textArea.style.position = 'absolute';
    textArea.rows = countOfVertixes+1;
    textArea.cols = countOfVertixes*3-6;
    textArea.style.top = `${190 + radius * 2}px`;
    textArea.style.left = `${window.innerWidth/(i ? 4/3 : 4) - textArea.cols*5}px`;
    textArea.style.fontSize = `${textAreaFontSize}px`;
}
const createVertixes = (count, radius, left) => {
    const vertixes = [];
    const step = 2*Math.PI / count;
    let angle = 0;
    for(let i = 0; i < count; i++) {
        const vertix = document.createElement('h1');
        let x = left + Math.cos(angle)*radius;
        let y = 90 + radius + Math.sin(angle)*radius;
        vertix.innerHTML = (i+1).toString();
        vertix.style.border= '3px solid #000';
        vertix.style.textAlign = 'center';
        vertix.style.borderRadius = '100%';
        vertix.style.position = 'absolute';
        vertix.style.width = '32px';
        vertix.style.height = '32px';
        vertix.style.left = `${x}px`;
        vertix.style.top = `${y}px`;
        document.body.appendChild(vertix);
        vertixes.push(vertix);
        angle += step;
    }
    return vertixes
}

const createLine = (x1, y1, x2, y2, arrow) => {
    const dx = x1 - x2;
    const dy= y1 - y2;
    const lineLength = Math.sqrt(dx*dx + dy*dy);
    const lineCos = dx/lineLength;
    const lineSin = dy/lineLength;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = lineWidth;
    if(!arrow) {
        const xForwardShift = vertixRadius*lineCos;
        const yForwardShift = vertixRadius*lineSin;
        ctx.moveTo(x1-xForwardShift, y1-yForwardShift);
        ctx.lineTo(x2+xForwardShift, y2+yForwardShift);
        ctx.stroke();
    }
    else {
        const xForwardShift = (vertixRadius*Math.cos(Math.asin(distanceBetweenLines/vertixRadius)))*lineCos;
        const yForwardShift = (vertixRadius*Math.sin(Math.acos(distanceBetweenLines/vertixRadius)))*lineSin;
        const xSideShift = distanceBetweenLines*lineSin;
        const ySideShift = distanceBetweenLines*lineCos;
        let lastPositionX = x2+xForwardShift+arrowLengthInLine*lineCos+xSideShift;
        let lastPositionY= y2+yForwardShift+arrowLengthInLine*lineSin-ySideShift;
        ctx.moveTo(x1-xForwardShift+xSideShift, y1-yForwardShift-ySideShift);
        ctx.lineTo(lastPositionX, lastPositionY);
        ctx.stroke();
        for(let i = arrowWidth; i > 0; i--) {
            ctx.beginPath();
            ctx.moveTo(lastPositionX, lastPositionY);
            ctx.lineWidth = i;
            lastPositionX = x2+xForwardShift+xSideShift+arrowLengthInLine*lineCos-arrowLengthInLine*lineCos/i;
            lastPositionY = y2+yForwardShift-ySideShift+arrowLengthInLine*lineSin-arrowLengthInLine*lineSin/i;
            ctx.lineTo(lastPositionX, lastPositionY);
            ctx.stroke();
        }
    }
}

const createEllipse = (x, y, number) => {
    const extraAngle = 0.28
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.ellipse(x, y, 50, 10, Math.PI*number/5,
        -Math.PI/2+extraAngle, Math.PI/2-extraAngle-0.05*lineWidth*2);
    ctx.stroke();
    for(let i = arrowWidth; i > 0; i--) {
        ctx.beginPath();
        ctx.lineWidth = i;
        ctx.ellipse(x, y, 50, 10, Math.PI*number/5,
            Math.PI/2 - extraAngle - arrowLengthInElipse*(i)/(64*arrowWidth),
            Math.PI/2 - extraAngle - arrowLengthInElipse*(i-1)/(64*arrowWidth));
        ctx.stroke();
    }
    ctx.lineWidth = lineWidth;
}
const vertixes = [createVertixes(countOfVertixes, radius, window.innerWidth/4),
    createVertixes(countOfVertixes, radius, window.innerWidth*3/4)];
const createGraphs = () => {
    for(let i = 0; i < textAreas.length; i++) {
        const circleOfVertixes = vertixes[i];
        const textArea = textAreas[i];
        for(let row = 0; row < countOfVertixes; row++) {
            matrix[row] = [];
            const columnsToLoop = i ? countOfVertixes : row+1;
            for(let column = 0; column < columnsToLoop; column++) {
                const number = Math.random()*2;
                const resultNumber = number * k;
                const oneOrZero = resultNumber < 1 ? 0 : 1;
                matrix[row][column] = oneOrZero;
                if(!i) {
                    matrix[column][row] = oneOrZero;
                }
                if(matrix[row][column] === 1) {
                    if(row === column) {
                        createEllipse(circleOfVertixes[row].offsetLeft+vertixRadius,
                            circleOfVertixes[row].offsetTop+vertixRadius, row);
                    }
                    else {
                        createLine(circleOfVertixes[row].offsetLeft+vertixRadius,
                            circleOfVertixes[row].offsetTop+vertixRadius,
                            circleOfVertixes[column].offsetLeft+vertixRadius,
                            circleOfVertixes[column].offsetTop+vertixRadius,
                            i);
                    }
                }
            }
        }
        for(let row = 0; row < countOfVertixes; row++) {
            textArea.textContent += `${row+1}. `;
            if(row < 9) textArea.textContent += ' '
            for(let column = 0; column < countOfVertixes; column++) {
                if(column > 9) textArea.textContent += ' '
                textArea.textContent += `${matrix[row][column]} `;
            }
            textArea.textContent += `\n`;
        }
        textArea.textContent += '    '
        for(let column = 1; column <= countOfVertixes; column++) {
            textArea.textContent += `${column} `
        }
    }
}

createGraphs();
for(const textArea of textAreas) {
    document.body.appendChild(textArea);
}

document.body.appendChild(canvas);
