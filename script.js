let canvasWidth = 0;
let canvasHeight = 0;
let isCanvas = false;
let currentColor = 'black';
let isClicking = false;

const newButton = document.getElementById('newCanvas');
const colorButton = document.getElementById('colorButton')
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
    pixelTarget.setAttribute('style', 'background-color: ' 
            + currentColor + ';' );
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



newButton.addEventListener('click', createNewCanvas);
colorButton.addEventListener('click', changeColor);
