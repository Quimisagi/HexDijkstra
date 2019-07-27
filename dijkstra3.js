var size = 3;
var board = new Array(size);
var minimeTable = new Array(size);
var leftEdge = new Array(2);
var topEdge = new Array(2);
var rightEdge = new Array(3);
var bottomEdge = new Array(3);
var Q = new Array();
var minNum

class node {
    constructor(coordinate, weigth) {
        this.coordinate = coordinate;
        this.weigth = weigth;
    }
}

for (var i  = 0; i < size; i++){
    board[i] = new Array(size);
    minimeTable[i] = new Array(size);
}

for (var i  = 0; i < size; i++){
    for (var j = 0; j < size; j++){
        board[i][j] = 0;
        minimeTable[i][j] = new Array(3);
    }
}

shortestPath(1);
/*console.log(getVecinos(0,0,1));

initPriorityQ(1);*/


for (var i = 0; i < Q.length; i++){
    console.log(Q[i]);
    }

function getItem(pos){
    let y = Math.floor(pos / board.length);
    let x = pos % board.length;
    //console.log(pos);
    let item = board[y][x];
    return item;
}

function obtainValue(player, item){
    if (item == player){
        return 0;
    }
    else if (item === 0){
        return 1;
    }
    else return Infinity
}

function initPriorityQ(player){
    minNum = Infinity;
    for (var i  = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            let pos = i * size + j;
            let item = getItem(pos);
            //Para el jugador 1 inicializa en la izquierda...
            if ((player === 1) && (j == 0)){
                if (item === 0){
                    let tempNode = new node(i * size + j, 1);
                    Q.push(tempNode);
                }
                else if(item === 1){
                    let tempNode = new node(i * size + j, 0);
                    Q.push(tempNode);
                }
            }
            //Para el jugador 2 inicializa arriba...
            else if ((player === 2) && (i == 0)){
                if (item === 0){
                    let tempNode = new node(i * size + j, 1);
                    Q.push(tempNode);
                }
                else if(item === 2){
                    let tempNode = new node(i * size + j, 0);
                    Q.push(tempNode);
                }
            }
            //Todas las demás posiciones se inicializan con infinito
            else{
                    let tempNode = new node(i * size + j, Infinity);
                    Q.push(tempNode);
            }
        }
    }
    Q = Q.sort(Comparator); //Ordenar por sí las moscas
}

function getVecinos(x,y, player){
    let vecinos = new Array();
    let tempX;
    let tempY;

    //Izquierda
    tempX = x-1
    if(tempX >= 0){
        let pos = y * size + tempX;
        let item = getItem[pos];
        if(player != obtainValue[player, item]){
            vecinos.push(pos)
        } 
    }
    //Arriba
    tempY = y-1
    if(tempY >= 0){
        let pos = tempY * size + x;
        let item = getItem[pos];
        if(player != obtainValue[player, item]){
        vecinos.push(pos)
        } 
    }
    //Derecha
    tempX = x+1
    if(tempX >= 0){
        let pos = y * size + tempX;
        let item = getItem[pos];
        if(player != obtainValue[player, item]){
        vecinos.push(pos)
        } 
    }
    //Abajo
    tempY = y+1
    if(tempY >= 0){
        let pos = tempY * size + x;
        let item = getItem[pos];
        if(player != obtainValue[player, item]){
        vecinos.push(pos)
        } 
    }

    return vecinos;
}

function shortestPath(player){
    initPriorityQ(player);
    while(Q.length > 0){
        let crrentNode = Q[0];
        Q.shift(); 
        let pos = crrentNode.coordinate
        let y = Math.floor(pos / board.length);
        let x = pos % board.length;
        let vecinos = getVecinos(x, y, player);

        for (var i = 0; i < vecinos.length; i++){
            let item = getItem(vecinos[i]);
            let num = crrentNode.weigth + obtainValue(player, item);
            console.log(crrentNode.coordinate);
            console.log("---------");
            console.log(vecinos[i]);

            for (var i = 0; i < Q.length; i++){
                console.log(Q[i]);
            }
            
            comparationNode = Q.findIndex(node => node.coordinate === 1);
            console.log(comparationNode);
            if (comparationNode != -1){
                console.log("***");
            }
                if(num < Q[comparationNode].weigth){  
                    console.log("Peso:");
                   console.log(Q[comparationNode].weigth);
                   Q[comparationNode].weigth = num;
                   console.log("OwO");
                   console.log(Q[comparationNode].weigth);
                }
            }
        }
        Q = Q.sort(Comparator);
}
    
function searchNode(pos){
    //console.log(pos);
    for (var i = 0; i < Q.length; i++){
        if(pos == Q[i].coordinate){
            let findedNode = Q[i]
            Q = Q.splice(i, 1);
            return findedNode;
        }
    }
    return false;
}

function updateCost(pos, value){
    for (var i = 0; i < Q.length; i++){
        if(pos == Q[i][0]){
            Q[i][1] = value
        }
    }
}


function Comparator(a, b) {
    if (a.weigth < b.weigth) return -1;
    if (a.weigth > b.weigth) return 1;
    return 0;
  }
