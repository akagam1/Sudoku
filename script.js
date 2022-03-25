let grid = document.getElementById("board");
cell_grid = [];

class Cell {
    constructor(value=0,box){
        this.value = value;
        this.box = box;
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
            tempRow[j].box.id = `${i}${j}`;
            tempRow[j].box.style.textAlign = 'center';
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
                cell_grid[i][j].box.style.backgroundColor = 'rgb(255,255,255)';
            }
        }
        square.style.backgroundColor = 'rgba(255,0,0,0.2)';
        id = square.getAttribute('id');
        i = id[0];
        j = id[1];
        document.addEventListener('keydown', (e)=>{
            value = e.key;
            isNum = isFinite(e.key);
            if (isNum){
                cell_grid[i][j].box.innerHTML = `${value}`;
                cell_grid[i][j].value = value;
            }
        });
    });
});

/* SOLVER CODE */

function solution(board){
    let voidCell = findVoid(board);
    if (voidCell[2] != true){
        return true;
    }
    else{
        row = voidCell[0];
        col = voidCell[1];
    }

    for (let i = 1; i<10; i++){
        if (valid(board,i,[row,col])){
            board[row][col].value = i;

            if (solution(board)){
                return true;
            }

            board[row][col].value = 0;
        }       
    }
    return false
}

function findVoid(board){
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            if (board[i][j].value == 0) {
                return [i,j,true];
            }
        }
    }
    return [0,0,false];
}

function valid(board,num,position){
    for (let i=0;i<9;i++) {
        if (board[position[0]][i].value == num && i != position[1]){
            return false;
        }
    }
    for (let i=0;i<9;i++){
        if (board[i][position[1]].value == num && i != position[0]){
            return false;
        }
    }

    let yBlock = Math.floor(position[0]/3);
    let xBlock = Math.floor(position[1]/3);

    for (let i = yBlock*3;i<yBlock*3 + 3; i++){
        for (let j = xBlock*3;j<xBlock*3 + 3; j++){
            if (board[i][j].value == num && (i!=position[0] && j!=position[1])) {
                return false;
            }
        }
    }
    return true;
}

document.addEventListener('keydown', (e)=>{
    if (e.code == "Space"){
        solution(cell_grid);
        
        for (let i = 0; i<9; i++) {
            for (let j = 0; j<9; j++){
                cell_grid[i][j].box.innerHTML = `${cell_grid[i][j].value}`;
            }
        }
        
    }
});