let grid = document.getElementById("board");
cell_grid = [];

class Cell {
    constructor(value=0,box){
        this.value = value
        this.box = box
    }
}

function drawGrid(loop=9){
    for (let i = 0; i<loop; i++){
        tempRow = [];
        for (let j = 0; j<loop; j++) {
            tempElement = document.createElement('div');
            tempRow[j] = new Cell(0,tempElement)
            tempRow[j].box.classList.add('square');
            tempRow[j].box.style.width = "60px";
            tempRow[j].box.style.height = "60px";
            tempRow[j].box.style.border = "2px solid #000000";
            if (j==2 || j==5) {
                tempRow[j].box.style.borderRightColor = "#ff0000";
            }
            if (j==3 || j==6) {
                tempRow[j].box.style.borderLeftColor = "#ff0000";
            }
            if (i==2 || i==5) {
                tempRow[j].box.style.borderBottomColor = "#ff0000";
            }
            if (i==3 || i==6) {
                tempRow[j].box.style.borderTopColor = "#ff0000";
            }
            grid.appendChild(tempRow[j].box);
        }
        cell_grid[i] = tempRow;
    }
}

drawGrid(9);
let cells = document.querySelectorAll('.square');
cells.forEach((square) => {
    square.addEventListener('click', ()=>{
        for (let i = 0; i<9; i++){
            for (let j = 0; j<9; j++) {
                cell_grid[i][j].box.style.backgroundColor = 'rgb(255,255,255)'
            }
        }
        square.style.backgroundColor = 'rgba(255,0,0,0.2)'
    });
});
