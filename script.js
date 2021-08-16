let canvasWidth = 0;
let canvasHeight = 0;
let isCanvas = false;
let currentColor = 'black';

const newButton = document.getElementById('newCanvas');
const canvas = document.querySelector('.canvas');


function createNewCanvas() {
    if (isCanvas) {
        
    }

    canvasWidth = prompt('Enter canvas width:', 32);
    canvasHeight = prompt('Enter canvas height:', 32);

    // Add grid rules to css style
    canvas.setAttribute('style', 'grid-template-columns: repeat(' 
            + canvasWidth + ', 16px); grid-template-rows: repeat(' 
            + canvasHeight + ', 16px);');
    
    // Populate divs
    for (let i = 0; i < canvasWidth * canvasHeight; i++){
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('gridSquare');
        canvas.appendChild(gridSquare);
    }

    isCanvas = true;
}

function drawPixel(pixelTarget) {
    pixelTarget.setAttribute('style', 'background-color: ' 
            + currentColor + ';' );
}

canvas.addEventListener('mousedown', function (e) {
    console.log(e.target.classList[0]);
    if (e.target.classList[0] === 'gridSquare') {
        drawPixel(e.target);
    }
    
});

newButton.addEventListener('click', createNewCanvas);
