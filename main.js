const radius = 200;
const lineWidth = 1;
const arrowWidth = 5;
const arrowLengthInLine = 16;
const arrowLengthInEllipse = 16;
const countOfVertexes = 10;
const vertexRadius = 18;
const distanceBetweenLines = 10;
const textAreaFontSize = 20;
const k = 0.745;
const seedRandom = new Math.seedrandom(3401);


const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top='0px';
canvas.style.left='0px';
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
    textArea.rows = countOfVertexes+1;
    textArea.cols = countOfVertexes*3-6;
    textArea.style.top = `${190 + radius * 2}px`;
    textArea.style.left = `${window.innerWidth/(i ? 4/3 : 4) - textArea.cols*5}px`;
    textArea.style.fontSize = `${textAreaFontSize}px`;
}
const createVertexes = (count, radius, left) => {
    const vertexes = [];
    const step = 2*Math.PI / count;
    let angle = 0;
    for(let i = 0; i < count; i++) {
        const vertex = document.createElement('h1');
        let x = left + Math.cos(angle)*radius;
        let y = 90 + radius + Math.sin(angle)*radius;
        vertex.innerHTML = (i+1).toString();
        vertex.style.border= '3px solid #000';
        vertex.style.textAlign = 'center';
        vertex.style.borderRadius = '100%';
        vertex.style.position = 'absolute';
        vertex.style.width = '32px';
        vertex.style.height = '32px';
        vertex.style.left = `${x}px`;
        vertex.style.top = `${y}px`;
        document.body.appendChild(vertex);
        vertexes.push(vertex);
        angle += step;
    }
    return vertexes
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
        const xForwardShift = vertexRadius*lineCos;
        const yForwardShift = vertexRadius*lineSin;
        ctx.moveTo(x1-xForwardShift, y1-yForwardShift);
        ctx.lineTo(x2+xForwardShift, y2+yForwardShift);
        ctx.stroke();
    }
    else {
        const xForwardShift = (vertexRadius*Math.cos(Math.asin(distanceBetweenLines/vertexRadius)))*lineCos;
        const yForwardShift = (vertexRadius*Math.sin(Math.acos(distanceBetweenLines/vertexRadius)))*lineSin;
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
            Math.PI/2 - extraAngle - arrowLengthInEllipse*(i)/(64*arrowWidth),
            Math.PI/2 - extraAngle - arrowLengthInEllipse*(i-1)/(64*arrowWidth));
        ctx.stroke();
    }
    ctx.lineWidth = lineWidth;
}
const vertexes = [createVertexes(countOfVertexes, radius, window.innerWidth/4),
    createVertexes(countOfVertexes, radius, window.innerWidth*3/4)];
const createGraphs = () => {
    for(let i = 0; i < textAreas.length; i++) {
        const circleOfVertexes = vertexes[i];
        const textArea = textAreas[i];
        for(let row = 0; row < countOfVertexes; row++) {
            matrix[row] = [];
            const columnsToLoop = i ? countOfVertexes : row+1;
            for(let column = 0; column < columnsToLoop; column++) {
                const number = seedRandom()*2;
                const resultNumber = number * k;
                const oneOrZero = resultNumber < 1 ? 0 : 1;
                matrix[row][column] = oneOrZero;
                if(!i) {
                    matrix[column][row] = oneOrZero;
                }
                if(matrix[row][column] === 1) {
                    if(row === column) {
                        createEllipse(circleOfVertexes[row].offsetLeft+vertexRadius,
                            circleOfVertexes[row].offsetTop+vertexRadius, row);
                    }
                    else {
                        createLine(circleOfVertexes[row].offsetLeft+vertexRadius,
                            circleOfVertexes[row].offsetTop+vertexRadius,
                            circleOfVertexes[column].offsetLeft+vertexRadius,
                            circleOfVertexes[column].offsetTop+vertexRadius,
                            i);
                    }
                }
            }
        }
        for(let row = 0; row < countOfVertexes; row++) {
            textArea.textContent += `${row+1}. `;
            if(row < 9) textArea.textContent += ' '
            for(let column = 0; column < countOfVertexes; column++) {
                if(column > 9) textArea.textContent += ' '
                textArea.textContent += `${matrix[row][column]} `;
            }
            textArea.textContent += `\n`;
        }
        textArea.textContent += '    '
        for(let column = 1; column <= countOfVertexes; column++) {
            textArea.textContent += `${column} `
        }
    }
}

createGraphs();
for(const textArea of textAreas) {
    document.body.appendChild(textArea);
}

document.body.appendChild(canvas);
