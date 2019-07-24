var size = 5;
var board = new Array(size);
var minimeTable = new Array(size);
var leftEdge = new Array(2);
var topEdge = new Array(2);
var rightEdge = new Array(3);
var bottomEdge = new Array(3);

for (var i  = 0; i < size; i++){
    board[i] = new Array(size);
    minimeTable[i] = new Array(size);
}

for (var i  = 0; i < size; i++){
    for (var j = 0; j < size; j++){
        board[i][j] = "v";
        minimeTable[i][j] = new Array(3);
    }
}

//Pruebas:

/*board[4][0] = "B";
board[3][1] = "B";
board[2][2] = "B";
board[0][2] = "B";
board[1][3] = "B";
board[2][4] = "B";
board[3][4] = "B";
board[0][3] = "B";
board[4][1] = "B";
board[3][2] = "B";

board[0][0] = "B";
board[0][1] = "B";
board[0][2] = "R";
board[0][3] = "R";
board[2][4] = "B";*/

 

/*for (var i  = 0; i < size; i++){
    for (var j = 0; j < size; j++){
        console.log((minimeTable[i][j][0]));
    }
}*/

console.log(minimax(0, true, -Infinity, Infinity));


function initMinimeTable(blue){
    rightEdge[0] = Infinity;
    bottomEdge[0] = Infinity;
    for (var i  = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            minimeTable[i][j][0] = Infinity;
            if (blue){
                let value = isAvaible(board[i][j], blue);
                if ((j == 0) && (value)){
                    minimeTable[i][j][0] = obtainValue(board[i][j], blue);
                }
            }
            else{
                let value = isAvaible(board[i][j], blue);
                if ((i == 0) && (value)){
                    minimeTable[i][j][0] = obtainValue(board[i][j], blue);
                }
            }
        }
    }
}

function isAvaible(item, blue){
    if(blue){
        if ((item == "v") || (item == "B")){
            return true;
        }
        else return false;
    }
    else {
        if ((item == "v") || (item == "R")){
            return true;
        }
        else return false;
    } 
}

function obtainValue(item, blue){
    if (item == "v"){
        return 1;
    }
    if ((item == "B") && (blue)){
        return 0;
    }
    if ((item == "R") && (!blue)){
        return 0;
    }
}

function shortestPath(blue){
    initMinimeTable(blue);
    for (var i = 0; i < size - 1; i++){
        for (var j = 0; j < size - 1; j++){

            let crrentVal = minimeTable[i][j][0];

            //Izquierda
            if((j - 1 >= 0) && isAvaible(board[i][j-1], blue)){
                let num = crrentVal + obtainValue(board[i][j-1], blue);
                if (num < minimeTable[i][j-1][0]){
                    minimeTable[i][j-1][0] = num;
                    minimeTable[i][j-1][1] = i;
                    minimeTable[i][j-1][2] = j;
                }
            }

            //Arriba-izquierda
            if((i - 1 >= 0) && (j - 1 >= 0) && isAvaible(board[i-1][j-1], blue)){
                let num = crrentVal + obtainValue(board[i-1][j-1], blue);
                if (num < minimeTable[i-1][j-1][0]){
                    minimeTable[i-1][j-1][0] = num;
                    minimeTable[i-1][j-1][1] = i;
                    minimeTable[i-1][j-1][2] = j;
                }
            }

            //Arriba
            if((i - 1 >= 0) && isAvaible(board[i-1][j], blue)){
                let num = crrentVal + obtainValue(board[i-1][j], blue);
                if (num < minimeTable[i-1][j][0]){
                    minimeTable[i-1][j][0] = num;
                    minimeTable[i-1][j][1] = i;
                    minimeTable[i-1][j][2] = j;
                }
            }

            //Derecha
            if((j + 1 < size) && isAvaible(board[i][j+1], blue)){
                let num = crrentVal + obtainValue(board[i][j+1], blue);
                if (num < minimeTable[i][j+1][0]){
                    minimeTable[i][j+1][0] = num;
                    minimeTable[i][j+1][1] = i;
                    minimeTable[i][j+1][2] = j;

                    if (blue && (j == size -2)){
                        if (num < rightEdge[0]){
                            rightEdge[0] = num;
                            rightEdge[1] = i;
                            rightEdge[2] = j + 1;
                        }
                    }
                }
            }

            //Abajo derecha
            if((i + 1 < size) && (j + 1 < size) && isAvaible(board[i+1][j+1], blue)){
                let num = crrentVal + obtainValue(board[i+1][j+1], blue);
                if (num < minimeTable[i+1][j+1][0]){
                    minimeTable[i+1][j+1][0] = num;
                    minimeTable[i+1][j+1][1] = i;
                    minimeTable[i+1][j+1][2] = j;

                    if (blue && (j == size -2)){
                        if (num < rightEdge[0]){
                            rightEdge[0] = num;
                            rightEdge[1] = i + 1;
                            rightEdge[2] = j + 1;
                        }
                    }
                    else if (!blue && (i == size -2)){
                        if (num < bottomEdge[0]){
                            bottomEdge[0] = num;
                            bottomEdge[1] = i + 1;
                            bottomEdge[2] = j + 1;
                        }
                    }
                }
            }

            //Abajo
            if((i + 1 < size) && isAvaible(board[i+1][j], blue)){
                let num = crrentVal + obtainValue(board[i+1][j], blue);
                if (num < minimeTable[i+1][j][0]){
                    minimeTable[i+1][j][0] = num;
                    minimeTable[i+1][j][1] = i;
                    minimeTable[i+1][j][2] = j;

                    if (!blue && (i == size -2)){
                        if (num < bottomEdge[0]){
                            bottomEdge[0] = num;
                            bottomEdge[1] = i + 1;
                            bottomEdge[2] = j;
                        }
                    }
                }
            }
        }
    }

    if (blue){
        return rightEdge[0];
    }
    else {
        return bottomEdge[0];
    }
}

function calculateHeuristic(){
    let blueShorPath = shortestPath(true);
    let redShorPath = shortestPath(false);

    return redShorPath - blueShorPath
}

function minimax(depth, isMaximizing, alpha, beta){ //Aún no funciona
    if (depth == 3){
        return calculateHeuristic();
    }

    if (isMaximizing){
        let bestVal = -Infinity;
        for (var i = 0; i < size - 1; i++){
            for (var j = 0; j < size - 1; j++){
                let value = minimax(depth++, false, alpha, beta);
                bestVal = Math.max(bestVal, value);
                alpha = max(alpha, bestVal);
                if (beta <= alpha){
                    break;
                }
            }
        }
        return bestVal;
    }

    else {
        bestVal = Infinity;
        
        for (var i = 0; i < size - 1; i++){
            for (var j = 0; j < size - 1; j++){
                let value = minimax(depth++, true, alpha, beta);
                bestVal = Math.min(bestVal, value);
                alpha = max(alpha, bestVal);
                if (beta <= alpha){
                    break;
                }
            }
        }
        return bestVal;
    }
}
