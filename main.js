const field = document.getElementById("body");
const radius = 200;
const lineWidth = 3;
const size = 10

const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top=0;
canvas.style.left=0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = 'canvas';
const ctx = canvas.getContext('2d');
let matrix = [];
const textAreas = [document.createElement('textarea'),
    document.createElement('textarea')];
for(let i = 0; i < textAreas.length; i++) {
    const textArea = textAreas[i]
    textArea.style.position = 'absolute';
    textArea.rows = size+1;
    textArea.cols = 23;
    textArea.style.top = `${190 + radius * 2}px`;
    textArea.style.left = `${window.innerWidth/(i ? 4/3 : 4) - textArea.cols*5}px`;
    textArea.style.fontSize = '20px';
    textArea.id = 'textArea1';
}
const createVertixes = (count, radius, left) => {
    const vertixes = [];
    const step = 2*Math.PI / count;
    let angle = 0;
    for(let i = 0; i < count; i++) {
        const vertix = document.createElement('h1');
        let x = left + Math.cos(angle)*radius;
        let y = 90 + radius + Math.sin(angle)*radius;
        vertix.innerHTML = (i+1).toString();
        vertix.style.border= '3px solid #000';
        vertix.style.textAlign = 'center';
        vertix.style.borderRadius = '50%';
        vertix.style.position = 'absolute';
        vertix.style.width = '1em';
        vertix.style.height = '1em';
        vertix.style.left = `${x}px`;
        vertix.style.top = `${y}px`;
        field.appendChild(vertix);
        vertixes.push(vertix);
        angle += step;
    }
    return vertixes
}

const createLine = (x1, y1, x2, y2, arrow) => {
    const lineShorter = 18;
    const dx = x1 - x2;
    const dy= y1 - y2;
    const dLength = Math.sqrt(dx*dx + dy*dy);
    const xShorter = lineShorter*dx/dLength;
    const yShorter = lineShorter*dy/dLength;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1-xShorter, y1-yShorter);
    if(!arrow) {
        ctx.lineTo(x2+xShorter, y2+yShorter);
        ctx.stroke();
    }
    else {
        let lastPositionX = x2+xShorter+20*dx/dLength;
        let lastPositionY = y2+yShorter+20*dy/dLength;
        ctx.lineTo(lastPositionX, lastPositionY);
        ctx.stroke();
        for(let i = 0; lineWidth*3-i > 0; i++) {
            ctx.beginPath();
            ctx.moveTo(lastPositionX, lastPositionY);
            ctx.lineWidth = lineWidth*3-i;
            lastPositionX = x2+xShorter+(20*(lineWidth*3 - i)/(lineWidth*3))*dx/dLength;
            lastPositionY = y2+yShorter+(20*(lineWidth*3 - i)/(lineWidth*3))*dy/dLength;
            ctx.lineTo(lastPositionX, lastPositionY)
            ctx.stroke();
        }
    }
}

const createEllipse = (x, y, number) => {
    const extraAngle = 0.28
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.ellipse(x, y, 50, 10, Math.PI*number/5,
        -Math.PI/2+extraAngle, Math.PI/2-extraAngle-0.05*lineWidth*2);
    ctx.stroke();
    for(let i = 0; lineWidth*3-i > 0; i++) {
        ctx.beginPath();
        const currentWidth = lineWidth*3-i;
        ctx.lineWidth = currentWidth;
        ctx.ellipse(x, y, 50, 10, Math.PI*number/5,
            Math.PI/2 - extraAngle - 0.1*(currentWidth), Math.PI/2 - extraAngle - 0.1*(currentWidth-1));
        ctx.stroke();
    }
    ctx.lineWidth = lineWidth;
}
const vertixes = [createVertixes(10, radius, window.innerWidth/4),
    createVertixes(10, radius, window.innerWidth*3/4)];
const createGraphs = () => {
    for(let i = 0; i < textAreas.length; i++) {
        const circleOfVertixes = vertixes[i];
        const textArea = textAreas[i];
        for(let row = 0; row < size; row++) {
            matrix[row] = [];
            textArea.textContent += `${row+1}. `;
            if(row < 9) textArea.textContent += ' '
            const columnsToLoop = i ? size : row+1;
            for(let column = 0; column < columnsToLoop; column++) {
                const number = Math.random()*2
                const k = 0.745;
                const resultNumber = number * k;
                matrix[row][column] = resultNumber < 1 ? 0 : 1;
                if(matrix[row][column] === 1) {
                    const magicTop = 18;
                    const magicLeft = 18;
                    if(row === column) {
                        createEllipse(circleOfVertixes[row].offsetLeft+magicLeft,
                            circleOfVertixes[row].offsetTop+magicTop, row);
                    }
                    else {
                        createLine(circleOfVertixes[row].offsetLeft+magicLeft,
                            circleOfVertixes[row].offsetTop+magicTop,
                            circleOfVertixes[column].offsetLeft+magicLeft,
                            circleOfVertixes[column].offsetTop+magicTop,
                            i);
                    }
                }
                textArea.textContent += `${matrix[row][column]} `;
            }
            textArea.textContent += `\n`;
        }
        textArea.textContent += '    '
        for(let column = 1; column <= size; column++) {
            textArea.textContent += `${column} `
        }
    }
}

createGraphs();
for(const textArea of textAreas) {
    document.body.appendChild(textArea);
}

document.body.appendChild(canvas);
