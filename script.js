toSolve = true; //converted to false when board is solved. becomes true again when clear button is clicked

let grid = document.getElementById("board");
let but = document.getElementById("button");
let clear = document.getElementById("button-clear");
cell_grid = [];

class Cell {
    constructor(value=0,box,type){
        this.value = value;
        this.box = box;
        this.type = null;
    }
}

function drawGrid(loop=1){
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
                cell_grid[i][j].type = 1;
            }
        });
    });
});

/* SOLVER CODE */

function solution(board){
    let voidCell = findVoid(board);
    if (!voidCell){
        return true;
    }
    else{
        row = voidCell[0];
        col = voidCell[1];
    }

    for (let i = 1; i<=9; i++){
        if (valid(board,i,[row,col])){
            board[row][col].value = i;
        
            if (solution(board)){
                return true;
            }

            board[row][col].value = 0;
        }    
          
    }
    return false;
}

function findVoid(board){
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            if (board[i][j].value == 0) {
                return [i,j];
            }
        }
    }
    return null;
}

function valid(board,num,position){
    for (let i=0;i<9;i++) {
        if (board[position[0]][i].value == num && position[1] != i){
            return false;
        }
    }
    for (let i=0;i<9;i++){
        if (board[i][position[1]].value == num && position[0] != i){
            return false;
        }
    }

    let yBlock = Math.floor(position[0]/3);
    let xBlock = Math.floor(position[1]/3);

    for (let i = yBlock*3;i < yBlock*3 + 3; i++){
        for (let j = xBlock*3;j < xBlock*3 + 3; j++){
            if ((board[i][j].value == num) && ((i!=position[0]) && (j!=position[1]))) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(board, row, col){
    if (row == 8 && col == 9) {
        return true;
    }

    if (col==9){
        row++;
        col=0;
    }

    if(board[row][col].value!=0){
        return solveSudoku(board,row,col+1);
    }

    for (let i=1;i<=9;i++){
        if (isSafe(board,row,col,i)){
            board[row][col].value = i;
            board[row][col].type = 0;

            if (solveSudoku(board,row,col+1)){
                return true;
            }
        }
        board[row][col].value = 0;
    }
    return false;
}

function isSafe(board,row,col,num){
    for (let i=0; i<=8; i++){
        if (board[row][i].value == num){
            return false;
        }
    }

    for (let i=0; i<=8; i++){
        if (board[i][col].value == num){
            return false;
        }
    }

    let x = col - col%3;
    let y = row - row%3;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if (board[i + y][j + x] == num){
                return false;
            }
        }
    }
    return true;
}

clear.addEventListener('click', ()=>{
    toSolve = true;
    for (let i = 0; i<9; i++) {
        for (let j = 0; j<9; j++) {
            cell_grid[i][j].value = 0;
            cell_grid[i][j].type = null;
            cell_grid[i][j].box.innerHTML = null;

        }
    }
});

but.addEventListener('click', ()=>{
    if (toSolve){
        solveSudoku(cell_grid,0,0);
        toSolve = false;
        for (let i = 0; i<9; i++) {
            for (let j = 0; j<9; j++){
                if (cell_grid[i][j].type == 0){
                    tempElement = document.createElement('div');
                    tempElement.style.width = '60px';
                    tempElement.style.height = '60px';
                    tempElement.style.color = 'rgb(0,205,0)';
                    tempElement.innerHTML = `${cell_grid[i][j].value}`;
                    cell_grid[i][j].box.appendChild(tempElement);
            //cell_grid[i][j].box.innerHTML = `${cell_grid[i][j].value}`;
                }
            }
        }
    }
});

//disable solve button until board is cleared again
