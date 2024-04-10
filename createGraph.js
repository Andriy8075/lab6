import {
    arrowLengthInEllipse,
    arrowLengthInLine,
    arrowWidth, countOfVertexes,
    ctx,
    distanceBetweenLinesInDirectedGraph, distanceFromTopToFirstGraphs,
    lineWidth, radiusOfCircleOfVertexes,
    vertexRadius
} from "./data.js";

const createVertexes = (count, radius, left, top) => {
    const vertexes = [];
    const step = 2*Math.PI / count;
    let angle = 0;
    for(let i = 0; i < count; i++) {
        const vertex = document.createElement('h1');
        let x = left + Math.cos(angle)*radius;
        let y = top + radius + Math.sin(angle)*radius;
        vertex.innerHTML = `${i+1}`;
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

const createLine = (x1, y1, x2, y2, color, width) => {
    const dx = x1 - x2;
    const dy= y1 - y2;
    const lineLength = Math.sqrt(dx*dx + dy*dy);
    const lineCos = dx/lineLength;
    const lineSin = dy/lineLength;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
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

const createGraph = (matrix, vertexes) => {
    const countOfVertexes = vertexes.length;
    for(let row = 0; row < vertexes.length; row++) {
        for(let column = 0; column < countOfVertexes; column++) {
            if (matrix[row][column] === 1) {
                if (row === column) {
                    createEllipse(vertexes[row].offsetLeft + vertexRadius,
                        vertexes[row].offsetTop + vertexRadius, row);
                } else {
                    createLine(vertexes[row].offsetLeft + vertexRadius,
                        vertexes[row].offsetTop + vertexRadius,
                        vertexes[column].offsetLeft + vertexRadius,
                        vertexes[column].offsetTop + vertexRadius, `#${'40'.repeat(3)}`, 1);
                }
            }
        }
    }
}

const vertexes = createVertexes(countOfVertexes, radiusOfCircleOfVertexes,
    window.innerWidth / 6, distanceFromTopToFirstGraphs);

const lightVertex = (vertexNumber, color) => {
    const vertex = vertexes[vertexNumber];
    vertex.style.backgroundColor = color;
}

const lightEdge = (vertexNumberFrom, vertexNumberTo, color) => {
    const vertexFrom = vertexes[vertexNumberFrom];
    const vertexTo = vertexes[vertexNumberTo];
    const fromX = vertexFrom.offsetLeft + vertexRadius;
    const fromY = vertexFrom.offsetTop + vertexRadius;
    const toX = vertexTo.offsetLeft + vertexRadius;
    const toY = vertexTo.offsetTop + vertexRadius;
    createLine(fromX, fromY, toX, toY, color, 2);
}

export {createGraph, vertexes, lightVertex, lightEdge}
