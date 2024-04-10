const lineWidth = 1;
const arrowWidth = 5;
const arrowLengthInLine = 16;
const arrowLengthInEllipse = 16;
const matrixLength = 10;
const vertexRadius = 18;
const radiusOfCircleOfVertexes = 200
const distanceBetweenLinesInDirectedGraph = 10;
const textAreaFontSize = 24;
const countOfVertexes = 10;
const distanceFromTopToFirstGraphs = 90;
const distanceFromTopToFirstTextAreas = 90
const k = 0.745;
const seedRandom = new Math.seedrandom(3401);


const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'absolute';
canvas.style.top='0px';
canvas.style.left='0px';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = 'canvas';
const ctx = canvas.getContext('2d');

export {lineWidth, ctx, k, seedRandom, vertexRadius, textAreaFontSize, radiusOfCircleOfVertexes,
    distanceFromTopToFirstTextAreas, distanceFromTopToFirstGraphs, distanceBetweenLinesInDirectedGraph,
    countOfVertexes, arrowLengthInLine, arrowLengthInEllipse, arrowWidth, matrixLength,}
