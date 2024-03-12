const field = document.getElementById("body");
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

const vertixes = createVertixes(10, 150, window.innerWidth/4);

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
const createLine = (x1, y1, x2, y2) => {
    ctx.strokeStyle = 'black';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 4;
}

const createMatrix = (size) => {
    let matrix = [];
    for(let i = 0; i < size; i++) {
        matrix[i] = [];
        for(let j = 0; j <= i; j++) {
            const number = Math.random()*2
            const k = 0.745;
            const resultNumber = number * k;
            const oneOrZero = resultNumber < 1 ? 0 : 1;
            matrix[i][j] = oneOrZero;
        }
    }
    for(let row = 0; row < matrix.length; row++) {
        for(let column = 0; column < matrix[row].length; column++) {
            if(matrix[row][column] === 1) {
                const coordinates = {
                    x1: vertixes[row].offsetLeft,
                    y1: vertixes[row].offsetTop,
                    x2: vertixes[column].offsetLeft,
                    y2: vertixes[column].offsetTop,
                }
                console.log(coordinates);
                const magicTop = 33;
                const magicLeft = 4;
                createLine(vertixes[row].offsetLeft+magicLeft, vertixes[row].offsetTop-magicTop,
                    vertixes[column].offsetLeft+magicLeft, vertixes[column].offsetTop-magicTop);
            }
        }
    }
    return matrix;
}

console.log(createMatrix(10));

canvas.style.zIndex = 5; // Ensure canvas is on top
canvas.style.position = 'absolute'; // Ensure canvas overlays other elements
ctx.stroke();
document.body.appendChild(canvas);