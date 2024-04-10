import {countOfVertexes, distanceFromTopToFirstTextAreas} from "./data.js";
import {lightEdge, lightVertex} from "./createGraph.js";
import {writeSymbolDefinition, writeDone, createVisitedVertexes, createTraversalTreeMatrix} from "./interface.js";
import {writeMatrixInTextArea} from "./createMatrix.js";

let firstVertex = true;
const opened = [];
let openingFrom;
let currentVertex;
const newVertexes = [];
for(let i = 0; i < countOfVertexes; i++) {
    newVertexes.push(i);
}
let visitedVertexes;
let firstOpen = true;
let traversalTreeMatrix;
let traversalTreeTextArea;

const close = () => {
    lightVertex(openingFrom, 'yellow');
    currentVertex = undefined;
    openingFrom = undefined;
}
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


const openFrom = {
    currentVertex: (matrix) => {
        while (currentVertex++ < countOfVertexes) {
            if (matrix[openingFrom][currentVertex] && newVertexes.includes(currentVertex) && openingFrom !== currentVertex) {
                open({from: openingFrom, vertex: currentVertex});
                const index = newVertexes.indexOf(currentVertex);
                newVertexes.splice(index, 1);
                return;
            }
        }
        close()
    },
    openedVertex: () => {
        currentVertex = -1;
        openingFrom = opened.shift();
        lightVertex(openingFrom, 'blue');
    },
    newVertex: () => {
        const openingFrom = newVertexes.shift();
        open({vertex: openingFrom});
    }
}

const BFSFunction = (matrix, unDisplayAtStart, unDisplayAtEnd) => () => {
    if (!newVertexes.length) {
        lightVertex(openingFrom, 'yellow');
        for (const vertex of opened) {
            lightVertex(vertex, 'yellow');
        }
        unDisplayAtEnd.style.display = 'none';
        writeDone();
        return;
    }
    if (firstVertex) {
        const matrixAndTextArea = createTraversalTreeMatrix(
            window.innerWidth * 5 / 6, distanceFromTopToFirstTextAreas);
        traversalTreeMatrix = matrixAndTextArea['matrixOfZeros'];
        traversalTreeTextArea = matrixAndTextArea['textArea'];
        visitedVertexes = createVisitedVertexes();
        writeSymbolDefinition('blue', ' - opening from (current)')
        firstVertex = false;
        unDisplayAtStart.style.display = 'none';
    }
    openFrom[currentVertex ? 'currentVertex' : opened.length ? 'openedVertex' : 'newVertex'](matrix);

}

export {BFSFunction}
