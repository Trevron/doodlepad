const canvas = document.querySelector('.canvas');


for (let i = 0; i < 16; i++){
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('gridSquare');
    canvas.appendChild(gridSquare);
}
