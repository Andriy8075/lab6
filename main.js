
const field = document.getElementById("body");
const radius = 150;
const createVertixes = (count, radius, left) => {
    const vertixes = [];
    const step = 2*Math.PI / count;
    let angle = 0;
    for(let i = 0; i < count; i++) {
        const vertix = document.createElement('h2');
        let x = left + Math.cos(angle)*radius;
        let y = 140 + radius + Math.sin(angle)*radius;
        vertix.innerHTML = i.toString();
        vertix.style.border= '3px solid #000';
        vertix.style.textAlign = 'center';
        vertix.style.borderRadius = '50%';
        vertix.style.position = 'absolute';
        vertix.style.width = '1em';
        vertix.style.height = '1em';
        vertix.style.left = `${x}px`;
        vertix.style.top = `${y}px`;
        vertix.style.zIndex = 4;
        field.appendChild(vertix);
        vertixes.push(vertix);
        angle += step;
    }
    return vertixes
}

const vertixes = createVertixes(10, radius, window.innerWidth/4);

// const vertixesArrays = [
//     createVertixes(10, 150, window.innerWidth/4),
//     createVertixes(10, 150, window.innerWidth*3/4)
// ]

//let previousWindowSize = window.innerWidth;
// const onResize = () => {
//     //const x = (screen.width - window.innerWidth);
//     //console.log(x);
//     for (const array of vertixesArrays) {
//         //console.log(array)
//         for (const vertix of array) {
//             const currentSize = vertix.style.left.slice(0, vertix.style.left.length);
//             console.log(currentSize, previousWindowSize, window.innerWidth);
//             vertix.style.left = `${(currentSize/previousWindowSize * window.innerWidth)}px`;
//             //console.log(vertix.style.left);
//         }
//     }
//     previousWindowSize = window.innerWidth;
// }
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top=0;
canvas.style.left=0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

const lineShorter = 13;
const createLine = (x1, y1, x2, y2) => {
    const dx = x1 - x2;
    const dy= y1 - y2;
    const dLength = Math.sqrt(dx*dx + dy*dy);
    const xShorter = lineShorter*dx/dLength;
    const yShorter = lineShorter*dy/dLength;
    ctx.strokeStyle = 'black';
    ctx.moveTo(x1-xShorter, y1-yShorter);
    ctx.lineTo(x2+xShorter, y2+yShorter);
    ctx.lineWidth = 4;
}

const createMatrix = (size) => {
    let matrix = [];
    // for(let i = 0; i < size; i++) {
    //     matrix[i] = [];
    //     for(let j = 0; j <= i; j++) {
    //         const number = Math.random()*2
    //         const k = 0.745;
    //         const resultNumber = number * k;
    //         const oneOrZero = resultNumber < 1 ? 0 : 1;
    //         matrix[i][j] = oneOrZero;
    //     }
    // }
    const textArea = document.createElement('textarea');
    textArea.rows = size;
    textArea.cols = 21;
    textArea.style.marginTop = `${250 + radius * 2}px`;
    textArea.style.marginLeft = `${window.innerWidth/4 - textArea.cols*4}px`;
    for(let row = 0; row < size; row++) {
        matrix[row] = [];
        for(let column = 0; column < row; column++) {
            const number = Math.random()*2
            const k = 0.745;
            const resultNumber = number * k;
            const oneOrZero = resultNumber < 1 ? 0 : 1;
            matrix[row][column] = oneOrZero;
            if(matrix[row][column] === 1) {
                 const magicTop = 14;
                 const magicLeft = 14;
                 createLine(vertixes[row].offsetLeft+magicLeft, vertixes[row].offsetTop+magicTop,
                     vertixes[column].offsetLeft+magicLeft, vertixes[column].offsetTop+magicTop);
            }
            textArea.textContent += `${matrix[row][column]} `;
        }
        textArea.textContent += '\n';
    }
    document.body.appendChild(textArea);

    return matrix;
}

console.log(createMatrix(10));
canvas.style.zIndex = 3;
ctx.stroke();
document.body.appendChild(canvas);
//window.onresize = onResize;