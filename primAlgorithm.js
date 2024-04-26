import { countOfVertexes, colorOfCellInTable } from './data.js';
import { lightEdge, lightVertex } from "./createGraph.js";
import { writeSumOfValues } from "./interface.js";

const vertexColor = 'green';
const edgeColor = 'red';
const edgeWidth = 3;

const newVertexes = Array(countOfVertexes).fill(true);

const openVertex = ({from, to}) => {
    lightVertex(to, vertexColor);
    if(typeof from === 'number') lightEdge(from, to, edgeColor, edgeWidth);
    newVertexes[to] = false;
}

let sumOfValues = 0;

const primAlgorithm = (edgeValuesMatrix, primButton) => {
    let minValue = 0;
    const minEdge = {
        from: -1,
        to: -1
    };
    for(let fromVertex = 0; fromVertex < countOfVertexes;
        fromVertex++) {
        if (newVertexes[fromVertex]) continue;
        for(let toVertex = 0; toVertex < countOfVertexes; toVertex++) {
            if(fromVertex === toVertex) continue;
            if(!newVertexes[toVertex]) continue;
            const currentValue = edgeValuesMatrix[fromVertex][toVertex];
            if(!currentValue) continue;
            if(!minValue || minValue > currentValue) {
                minValue = currentValue;
                minEdge.from = fromVertex;
                minEdge.to = toVertex;
            }
        }
    }
    if(minValue) {
        openVertex(minEdge);
        sumOfValues += minValue;
        for(let vertex = 0; vertex < countOfVertexes; vertex++) {
            if(newVertexes[vertex]) continue;
            const td1 = document.getElementById(
                `tableId${vertex}${minEdge.to}`
            );
            td1.style.backgroundColor = colorOfCellInTable;
            const td2 = document.getElementById(
                `tableId${minEdge.to}${vertex}`
            );
            td2.style.backgroundColor = colorOfCellInTable;
        }
        return;
    }
    for(let vertex = 0; vertex < countOfVertexes; vertex++) {
        if(!newVertexes[vertex]) continue;
        openVertex({to: vertex});
        return;
    }
    writeSumOfValues(sumOfValues);
    primButton.style.display = 'none';
}

export { primAlgorithm };
