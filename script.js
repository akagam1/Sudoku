let grid = document.getElementById("board");
cells = [];

class Cell {
    constructor(value=0,square){
        this.value = value
        this.square = square
    }
}

function drawGrid(loop=9){
    for (let i = 0; i<loop; i++){
        tempRow = [];
        for (let j = 0; j<loop; j++) {
            tempElement = document.createElement('div');
            tempRow[j] = new Cell(0,tempElement)
            tempRow[j].square.classList.add('square');
            tempRow[j].square.style.width = "60px";
            tempRow[j].square.style.height = "60px";
            tempRow[j].square.style.border = "2px solid #000000";
            if (j==2 || j==5) {
                tempRow[j].square.style.borderRightColor = "#ff0000";
            }
            if (i==2 || i==5) {
                tempRow[j].square.style.borderBottomColor = "#ff0000";
            }
            grid.appendChild(tempRow[j].square);
        }
        cells[i] = tempRow;
    }
}

drawGrid(9);