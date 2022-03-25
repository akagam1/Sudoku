let grid = document.getElementById("board");
cells = [];

function drawGrid(loop=9){
    for (let i = 0; i<loop; i++){
        tempRow = [];
        for (let j = 0; j<loop; j++) {
            tempRow[j] = document.createElement('div');
            tempRow[j].classList.add('square');
            tempRow[j].style.width = "60px";
            tempRow[j].style.height = "60px";
            tempRow[j].style.border = "2px solid #000000";
            if (j==2 || j==5) {
                tempRow[j].style.borderRightColor = "#ff0000";
            }
            if (i==2 || i==5) {
                tempRow[j].style.borderBottomColor = "#ff0000";
            }
            grid.appendChild(tempRow[j]);
        }
        cells[i] = tempRow;
    }
}

drawGrid(9);