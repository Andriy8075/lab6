import {countOfVertexes} from "./data.js";

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

const writeSumOfValues = (sumOfValues) => {
    const text = document.createElement('h1');
    text.innerHTML = `Сума ваг: ${sumOfValues}`;
    text.style.textAlign = 'center';
    text.style.position = 'absolute';
    text.style.height = '32px';
    text.style.left = `${window.innerWidth / 6}px`;
    text.style.top = `650px`;
    document.body.appendChild(text);
}

const createTable = (left, top, matrix, label, idText) => {
    const mainDiv = document.createElement('div');
    const textDiv = document.createElement('div');

    const table = document.createElement('table');
    const tblBody = document.createElement("tbody");
    mainDiv.style.position = 'absolute';
    mainDiv.style.left = `${left}px`;
    mainDiv.style.top = `${top}px`;
    table.style.border = '1px solid black';

    const topTr = document.createElement('tr');
    for(let i = 0; i <= countOfVertexes; i++) {
        const td = document.createElement('td');
        td.textContent = `${i === 0 ? '' : i}`;
        td.style.border = '1px solid black'
        topTr.appendChild(td);
    }
    table.appendChild(topTr)

    for(let i = 0; i < countOfVertexes; i++) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = `${i+1}`;
        td.style.border = '1px solid black'
        tr.appendChild(td)
        for(let j = 0; j < countOfVertexes; j++) {
            const td =
                document.createElement('td');
            td.textContent = `${matrix[i][j]}`;
            td.style.border = '1px solid black';
            td.id = `${idText}${i}${j}`
            tr.appendChild(td);
            td.style.width = '30px';
        }
        table.appendChild(tr)
    }

    table.style.fontSize = '20px';

    const text = document.createElement('h1');
    text.textContent = label;

    mainDiv.appendChild(textDiv);
    mainDiv.appendChild(table);
    textDiv.appendChild(text);
    textDiv.style.display = 'flex';
    textDiv.style.justifyContent = 'center';

    document.body.appendChild(mainDiv);
}

export {createButton, writeSumOfValues, createTable}
