import { countOfVertexes, colorOfCellInTable, activeColor } from './data.js';
import { lightEdge, lightVertex } from "./createGraph.js";
import { writeSumOfValues } from "./interface.js";

const vertexColor = 'green';
const edgeColor = 'red';
const edgeWidth = 3;

const newVertexes = Array(countOfVertexes).fill(true);

const changeColor = (from, to, color) => {
    const edge = document.getElementById(`tableId${from}${to}`);
    edge.style.backgroundColor = color;
}
const openVertex = ({from, to}) => {
    lightVertex(to, vertexColor);
    if(typeof from === 'number') lightEdge(from, to, edgeColor, edgeWidth);
    newVertexes[to] = false;
}

let EdgeToMakeGreyOnNextIteration = null;
let sumOfValues = 0;

const primAlgorithm = (edgeValuesMatrix, primButton) => {
    if(EdgeToMakeGreyOnNextIteration) {
        changeColor(EdgeToMakeGreyOnNextIteration.from, EdgeToMakeGreyOnNextIteration.to, colorOfCellInTable)
    }
    let minValue = 0;
    const minEdge = {
        from: undefined,
        to: undefined
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
            changeColor(vertex, minEdge.to, colorOfCellInTable);
            changeColor(minEdge.to, vertex, colorOfCellInTable);
        }
        changeColor(minEdge.from, minEdge.to, activeColor);
        EdgeToMakeGreyOnNextIteration = minEdge;
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
