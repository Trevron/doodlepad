let canvasWidth = 0;
let canvasHeight = 0;
let isCanvas = false;
let currentColor = 'black';
let isClicking = false;
let drawing = true;
let erasing = false;
let filling = false;

const newButton = document.getElementById('newCanvas');
const colorInput = document.getElementById('colorInput');
const brushButton = document.getElementById('brushTool');
const fillButton = document.getElementById('fillTool');
const eraserButton = document.getElementById('eraserTool');
const saveButton = document.getElementById('saveImage');
const colorDiv = document.getElementById('currentColor');
const canvas = document.querySelector('.canvas');


function createNewCanvas() {
    if (isCanvas) {
        if (confirm('You will lose any changes. Are you sure you want to continue?')) {
            location.reload();
        } else {
            return;
        }
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
    currentColor = colorInput.value;
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
    if (filling) {
        const selectedColor = pixelTarget.style.backgroundColor;
        const gridSquares = document.querySelectorAll('.gridSquare');
    
        for (let i = 0; i < gridSquares.length; i++) {
            if (gridSquares[i].style.backgroundColor === selectedColor) {
                gridSquares[i].style.backgroundColor = currentColor;
            }
        }
        
    }   
}

function toolSelect(tool) {
    switch (tool) {
        case 'brush':
            drawing = true;
            erasing = false;
            filling = false;
            brushButton.classList.add('selected');
            eraserButton.classList.remove('selected');
            fillButton.classList.remove('selected');
            break;
        case 'eraser':
            drawing = false;
            erasing = true;
            filling = false;
            eraserButton.classList.add('selected');
            brushButton.classList.remove('selected');
            fillButton.classList.remove('selected');
            break;
        case 'fill':
            drawing = false;
            erasing = false;
            filling = true;
            fillButton.classList.toggle('selected');
            brushButton.classList.remove('selected');
            eraserButton.classList.remove('selected');
            break;
        default:
            alert('There was an error!');
    }
}

function saveImage() {
    const renderer = document.createElement('canvas');
    const context = renderer.getContext('2d');
    const gridSquares = document.querySelectorAll('.gridSquare');
    let selectedColor = 'green';
    renderer.setAttribute('width', canvasWidth * 16);
    renderer.setAttribute('height', canvasHeight * 16)
    
    // Convert drawing into a canvas element that opens in a new window
    for (let i = 0; i < gridSquares.length; i++) {
        if (gridSquares[i].style.backgroundColor === '') {
            selectedColor = 'white';
        } else {
            selectedColor = gridSquares[i].style.backgroundColor; 
        }
        context.fillStyle = selectedColor;
        context.fillRect(i % canvasWidth * 16, Math.trunc(i / canvasWidth) * 16, 16, 16);   
    }

    let newWindow = window.open('', '', 'width = ' + canvasWidth * 16 + ', height = ' + canvasHeight * 16);
    newWindow.document.body.appendChild(renderer);
}
// Initial
canvas.addEventListener('mousedown', (e) => {
    isClicking = true;
    if(e.target.classList[0] === 'gridSquare') {
        drawPixel(e.target);
    }
});

canvas.addEventListener('mouseup', () => isClicking = false);

// Hover enable and line painting
canvas.addEventListener('mouseover', function (e) {
    if(e.target.classList[0] === 'gridSquare' && isClicking) {
        e.target.classList.add('hovering');
        drawPixel(e.target);
    } else if (e.target.classList[0] === 'gridSquare') {
        e.target.classList.add('hovering');
    }
});

// Hover disable
canvas.addEventListener('mouseout', function (e) {
    if(e.target.classList[0] === 'gridSquare') {
        e.target.classList.remove('hovering');
    }
});

// Button events
newButton.addEventListener('click', createNewCanvas);

colorInput.addEventListener('change', changeColor);

brushButton.addEventListener('click', function () {
    toolSelect('brush');
});

eraserButton.addEventListener('click', function () {
    toolSelect('eraser');
});

fillButton.addEventListener('click', function () {
    toolSelect('fill');
});

saveButton.addEventListener('click', saveImage);

