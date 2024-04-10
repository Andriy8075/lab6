import {countOfVertexes} from "./data.js";
import {createTextArea, writeMatrixInTextArea} from "./createMatrix.js";

const createButton = (left, top,  label, color) => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    button.style.position = 'absolute';
    const width = 300;
    button.style.width = `${width}px`;
    button.style.height = '100px';
    button.style.left = `${left - width/2}px`;
    button.style.top = `${top}px`;
    button.innerText = label;
    button.style.fontSize = '48px';
    button.style.backgroundColor = color;
    return button;
}

const left = 700;

const createTextForColors = (top, text) => {
    const info = document.createElement('h1');
    document.body.appendChild(info);
    info.style.position = 'absolute';
    info.cols = 32;
    info.rows = 1;
    info.style.top = `${top}px`;
    const fontSize = 32;
    info.style.fontSize = `${fontSize}px`;
    info.style.left = `${left+50}px`;
    info.innerHTML = text;
}

const createColor = (top, color) => {
    const text = document.createElement('h1');
    text.innerHTML = ' ';
    text.style.backgroundColor = color;
    text.style.textAlign = 'center';
    text.style.borderRadius = '100%';
    text.style.position = 'absolute';
    text.style.width = '32px';
    text.style.height = '32px';
    text.style.left = `${left}px`;
    text.style.top = `${top}px`;
    document.body.appendChild(text);
}

let top = 420;

const writeSymbolDefinition = (color, text) => {
    createColor(top, color);
    createTextForColors(top, text);
    top += 50;
}

const writeDone = () => {
    const text = document.createElement('h1');
    text.innerHTML = 'Done!';
    text.style.textAlign = 'center';
    text.style.position = 'absolute';
    text.style.width = '32px';
    text.style.height = '32px';
    text.style.left = `${window.innerWidth / 6}px`;
    text.style.top = `650px`;
    document.body.appendChild(text);
}

const createVisitedVertexes = () => {
    const visitedVertexes = document.createElement('h1');
    visitedVertexes.style.position = 'absolute';
    visitedVertexes.style.left = `${left}px`;
    visitedVertexes.style.top = '600px';
    visitedVertexes.style.textAlign = 'center';
    visitedVertexes.innerText = 'visitedVertexes:\n';
    document.body.appendChild(visitedVertexes)
    return visitedVertexes;
}

const createMatrixOfZeros = (length) => {
    let matrix = [];
    for (let i = 0; i < length; i++) {
        matrix.push([]);
        for (let j = 0; j < length; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}
const createTraversalTreeMatrix = (left, top) => {
    const matrixOfZeros = createMatrixOfZeros(10)
    const textArea = createTextArea(left,
        top, countOfVertexes + 1, countOfVertexes * 3 - 6);
    console.log(matrixOfZeros)
    writeMatrixInTextArea(textArea, matrixOfZeros);
    textArea.style.resize = 'none';
    textArea.readOnly = true;
    return {matrixOfZeros, textArea};
}

export {writeSymbolDefinition, createButton, writeDone, createVisitedVertexes, createTraversalTreeMatrix}
