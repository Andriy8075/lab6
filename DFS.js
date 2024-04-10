import {countOfVertexes, distanceFromTopToFirstTextAreas} from "./data.js";
import {lightEdge, lightVertex} from "./createGraph.js";
import {createTraversalTreeMatrix, createVisitedVertexes, writeDone} from "./interface.js";
import {writeMatrixInTextArea} from "./createMatrix.js";

let openingFrom;
let currentVertex;
const newVertexes = [];
for (let i = 0; i < countOfVertexes; i++) {
    newVertexes.push(i);
}
const opened = [];
let firstVertex = true;
let visitedVertexes;
let firstOpen = true;
let traversalTreeMatrix;
let traversalTreeTextArea;

const close = () => lightVertex(currentVertex, 'yellow');

const open = ({from, vertex}) => {
    lightVertex(vertex, 'green');
    visitedVertexes.innerText += `${firstOpen ? '': ','} ${vertex+1}`;
    firstOpen = false;
    if (typeof from === 'number') {
        lightEdge(from, vertex, 'red');
        traversalTreeMatrix[from][vertex] = 1;
        traversalTreeTextArea.innerText = '';
        writeMatrixInTextArea(traversalTreeTextArea, traversalTreeMatrix);
    }
    opened.push(vertex);
}

const openNextVertex = (matrix) => {
    while (currentVertex++ < countOfVertexes) {
        if (matrix[opened.at(-1)][currentVertex] && newVertexes.includes(currentVertex)
            && openingFrom !== currentVertex) {
            open({from: opened.at(-1), vertex: currentVertex});
            const index = newVertexes.indexOf(currentVertex);
            newVertexes.splice(index, 1);
            currentVertex = -1;
            return;
        }
    }
    currentVertex = opened.pop();
    close();
}

const DFSFunction = (matrix, unDisplayAtStart, unDisplayAtEnd) => () => {
    if(!newVertexes.length) {
        for(const vertex of opened) {
            lightVertex(vertex, 'yellow');
        }
        unDisplayAtEnd.style.display = 'none';
        writeDone();
        return;
    }
    if (opened.length) {
        openNextVertex(matrix);
    }
    else {
        if(firstVertex) {
            const matrixAndTextArea = createTraversalTreeMatrix(
                window.innerWidth * 5 / 6, distanceFromTopToFirstTextAreas);
            traversalTreeMatrix = matrixAndTextArea['matrixOfZeros'];
            traversalTreeTextArea = matrixAndTextArea['textArea'];
            unDisplayAtStart.style.display = 'none';
            visitedVertexes = createVisitedVertexes();
        }
        open({vertex: newVertexes.shift()});
        currentVertex = -1;
    }
}

export {DFSFunction}
