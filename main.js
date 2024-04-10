import {countOfVertexes, k, distanceFromTopToFirstTextAreas} from "./data.js";
import {createGraph, vertexes} from "./createGraph.js";
import {createDirectedMatrix, createTextAreaForMatrix} from "./createMatrix.js";
import {createButton, writeSymbolDefinition} from "./interface.js";
import {BFSFunction} from "./BFS.js";
import {DFSFunction} from "./DFS.js";

const texDivs = document.getElementsByClassName('textDiv');
for(const textDiv of texDivs) {
    textDiv.style.width = `${window.innerWidth /3}px`;
}

const matrix = createDirectedMatrix(k, countOfVertexes);
createTextAreaForMatrix(window.innerWidth * 3/6,
    distanceFromTopToFirstTextAreas, matrix);
createGraph(matrix, vertexes);

const BFSButton = createButton(window.innerWidth /6, 580, 'BFS', 'orange');
const DFSButton = createButton(window.innerWidth /6, 700,'DFS', 'lightblue');

writeSymbolDefinition('yellow', ' - closed');
writeSymbolDefinition('green', ' - opened');

BFSButton.addEventListener('click', BFSFunction(matrix, DFSButton, BFSButton));
DFSButton.addEventListener('click', DFSFunction(matrix, BFSButton, DFSButton));


