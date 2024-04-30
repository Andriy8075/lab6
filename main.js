import {countOfVertexes, k, colorOfCellInTable} from "./data.js";
import {createGraph, vertexes} from "./createGraph.js";
import {
    createDirectedMatrix,
    createFinalMatrixW, makeMatrixUndirected, deleteSelfEdges,
} from "./createMatrix.js";
import {primAlgorithm} from "./primAlgorithm.js";
import {createButton, createTable,} from "./interface.js";

const directedMatrix = createDirectedMatrix(k, countOfVertexes);

const undirectedMatrix = makeMatrixUndirected(directedMatrix);
const matrixA = deleteSelfEdges(undirectedMatrix);

const valueMatrix = createFinalMatrixW(matrixA);

createGraph(matrixA, vertexes)

createTable(window.innerWidth * 5 / 12, 0, matrixA,
    'Матриця суміжності', '');

createTable(window.innerWidth * 5 / 12, 420, valueMatrix,
    'Ваги ребер', 'tableId');

for(let vertex = 0; vertex < countOfVertexes; vertex++) {
    const td = document.getElementById(
        `tableId${vertex}${vertex}`
    );
    td.style.backgroundColor = colorOfCellInTable;
}

createGraph(matrixA, vertexes)

const primButton = createButton(window.innerWidth /6,
    600, 'start', 'orange');


primButton.addEventListener('click',
   () => primAlgorithm(valueMatrix, primButton));


