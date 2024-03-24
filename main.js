const lineWidth = 1;
const arrowWidth = 5;
const arrowLengthInLine = 16;
const arrowLengthInEllipse = 16;
const matrixLength = 10;
const vertexRadius = 18;
const radiusOfCircleOfVertexes = 150
const distanceBetweenLinesInDirectedGraph = 10;
const textAreaFontSize = 24;
const countOfVertexes = 10;
const distanceFromTopToFirstGraphs = 90;
const distanceFromTopToFirstTextAreas = 190
const k = 0.745;
const seedRandom = new Math.seedrandom(3401);


const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top='0px';
canvas.style.left='0px';
canvas.width = window.innerWidth;
canvas.height = 3*window.innerHeight;
canvas.id = 'canvas';
const ctx = canvas.getContext('2d');
const createVertexes = (count, radius, left, top) => {
    const vertexes = [];
    const step = 2*Math.PI / count;
    let angle = 0;
    for(let i = 0; i < count; i++) {
        const vertex = document.createElement('h1');
        let x = left + Math.cos(angle)*radius;
        let y = top + radius + Math.sin(angle)*radius;
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
        const xForwardShift = (vertexRadius*Math.cos
        (Math.asin(distanceBetweenLinesInDirectedGraph/vertexRadius)))*lineCos;
        const yForwardShift = (vertexRadius*Math.sin
        (Math.acos(distanceBetweenLinesInDirectedGraph/vertexRadius)))*lineSin;
        const xSideShift = distanceBetweenLinesInDirectedGraph*lineSin;
        const ySideShift = distanceBetweenLinesInDirectedGraph*lineCos;
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

const createMatrix = (k, directed, size) => {
    let matrix = [];
    for(let row = 0; row < size; row++) {
        matrix[row] = [];
        const columnsToLoop = directed ? matrixLength : row + 1;
        for (let column = 0; column < columnsToLoop; column++) {
            const number = seedRandom() * 2;
            const resultNumber = number * k;
            const oneOrZero = resultNumber < 1 ? 0 : 1;
            matrix[row][column] = oneOrZero;
            if (!directed) {
                matrix[column][row] = oneOrZero;
            }
        }
    }
    return matrix
}

const createTextArea = (left, top, rows, cols) => {
    const textArea = document.createElement('textarea');
    textArea.style.position = 'absolute';
    textArea.rows = rows;
    textArea.cols = cols;
    textArea.style.top = `${top}px`;
    textArea.style.left = `${left - textArea.cols*textAreaFontSize/4}px`;
    textArea.style.fontSize = `${textAreaFontSize}px`;
    document.body.appendChild(textArea)
    return textArea
}

const writeMatrixInTextArea = (textArea, matrix) => {
    const matrixLength = matrix.length;
    for(let row = 0; row < matrixLength; row++) {
        textArea.textContent += `${row+1}. `;
        if(row < 9) textArea.textContent += ' '
        for(let column = 0; column < matrixLength; column++) {
            if(column > 9) textArea.textContent += ' '
            textArea.textContent += `${matrix[row][column]} `;
        }
        textArea.textContent += `\n`;
    }
    textArea.textContent += '    '
    for(let column = 1; column <= matrixLength; column++) {
        textArea.textContent += `${column} `
    }
}
const createGraphs = (matrix, directed, vertexes) => {
    const countOfVertexes = vertexes.length;
    for(let row = 0; row < vertexes.length; row++) {
        const columnsToLoop = directed ? countOfVertexes : row+1;
        for(let column = 0; column < columnsToLoop; column++) {
            if (matrix[row][column] === 1) {
                if (row === column) {
                    createEllipse(vertexes[row].offsetLeft + vertexRadius,
                        vertexes[row].offsetTop + vertexRadius, row);
                } else {
                    createLine(vertexes[row].offsetLeft + vertexRadius,
                        vertexes[row].offsetTop + vertexRadius,
                        vertexes[column].offsetLeft + vertexRadius,
                        vertexes[column].offsetTop + vertexRadius,
                        directed);
                }
            }
        }
    }
}
const createTextAreaForMatrix = (left, top, matrix) => {
    const firstDirectedGraphTextArea = createTextArea(left,
        top, countOfVertexes + 1, countOfVertexes * 3 - 6);
    writeMatrixInTextArea(firstDirectedGraphTextArea, matrix);
}

const firstUndirectedGraphVertexes = createVertexes(countOfVertexes, radiusOfCircleOfVertexes,
    window.innerWidth / 4, distanceFromTopToFirstGraphs);
const firstUndirectedGraphMatrix = createMatrix(k, false, countOfVertexes);
createTextAreaForMatrix(window.innerWidth / 4,
    distanceFromTopToFirstTextAreas + radiusOfCircleOfVertexes * 2, firstUndirectedGraphMatrix);
createGraphs(firstUndirectedGraphMatrix, false, firstUndirectedGraphVertexes);

const firstDirectedGraphVertexes = createVertexes(countOfVertexes, radiusOfCircleOfVertexes,
    window.innerWidth * 3 / 4, distanceFromTopToFirstGraphs);
const firstDirectedGraphMatrix = createMatrix(k, true, countOfVertexes);
createTextAreaForMatrix(window.innerWidth * 3 / 4,
    distanceFromTopToFirstTextAreas + radiusOfCircleOfVertexes * 2, firstDirectedGraphMatrix);
createGraphs(firstDirectedGraphMatrix, true, firstDirectedGraphVertexes);

document.body.appendChild(canvas);
