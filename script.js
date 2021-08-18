let canvasWidth = 0;
let canvasHeight = 0;
let isCanvas = false;
let currentColor = 'black';
let isClicking = false;
let drawing = true;
let erasing = false;
let filling = false;

const newButton = document.getElementById('newCanvas');
const colorButton = document.getElementById('colorButton')
const brushButton = document.getElementById('brushTool');
const fillButton = document.getElementById('fillTool');
const eraserButton = document.getElementById('eraserTool');
const colorDiv = document.getElementById('currentColor');
const canvas = document.querySelector('.canvas');


function createNewCanvas() {
    if (isCanvas) {
        location.reload();
    }

    canvasWidth = prompt('Enter canvas width:', 32);
    canvasHeight = prompt('Enter canvas height:', 32);

    // Add grid rules to css style
    canvas.setAttribute('style', 'grid-template-columns: repeat(' 
            + canvasWidth + ', 16px); grid-template-rows: repeat(' 
            + canvasHeight + ', 16px); width: ' 
            + canvasWidth * 16 + 'px;');
    
    // Populate divs
    for (let i = 0; i < canvasWidth * canvasHeight; i++){
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('gridSquare');
        canvas.appendChild(gridSquare);
    }

    newButton.textContent='Reload Page';
    isCanvas = true;
}


function changeColor() {
    currentColor = prompt('Enter a color name', currentColor);
    colorDiv.setAttribute('style', 'background-color: ' 
            + currentColor + ';');
}

function drawPixel(pixelTarget) {
    if (erasing) {
        pixelTarget.setAttribute('style', 'background-color: white;');
    }
    if (drawing) {
        pixelTarget.setAttribute('style', 'background-color: ' 
            + currentColor + ';' );
    }
    
}

canvas.addEventListener('mousedown', (e) => {
    isClicking = true;
    if(e.target.classList[0] === 'gridSquare') {
        drawPixel(e.target);
    }
});
canvas.addEventListener('mouseup', () => isClicking = false);

canvas.addEventListener('mouseover', function (e) {
    if(e.target.classList[0] === 'gridSquare' && isClicking) {
        drawPixel(e.target);
    }
});

function toolSelect(tool) {
    switch (tool) {
        case 'brush':
            drawing = true;
            erasing = false;
            filling = false;
            brushButton.classList.add('selected');
            eraserButton.classList.remove('selected');
            fillButton.classList.remove('selected');
            console.log('Brush selected');
            break;
        case 'eraser':
            drawing = false;
            erasing = true;
            filling = false;
            eraserButton.classList.add('selected');
            brushButton.classList.remove('selected');
            fillButton.classList.remove('selected');
            console.log('Eraser selected');
            break;
        case 'fill':
            drawing = false;
            erasing = false;
            filling = true;
            fillButton.classList.toggle('selected');
            brushButton.classList.remove('selected');
            eraserButton.classList.remove('selected');
            console.log('Fill selected');
            break;
        default:
            alert('There was an error!');
    }
}

newButton.addEventListener('click', createNewCanvas);
colorButton.addEventListener('click', changeColor);
brushButton.addEventListener('click', function () {
    toolSelect('brush');
});
eraserButton.addEventListener('click', function () {
    toolSelect('eraser');
});
fillButton.addEventListener('click', function () {
    toolSelect('fill');
});