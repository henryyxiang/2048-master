var rows = 4;
var cells = CreateCells(rows);
var oddOftwo = 8; //1~10,8 means 80% of possibility to generate 2
var updated = false;

//create cells map
function CreateCells(rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
       arr[i] = new Array(rows);
    }

    return arr;
}

//set all cells to 0
function init(arr) {
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr[i].length;j++){
            arr[i][j] = 0;
        }
    }
}

// select available cell and give value of 2
// return false while only on cell left in the map
function generate(arr) {
    var cellsAvailable = [];

    for (var i=0;i<arr.length;i++) {
        for (var j=0;j<arr[i].length;j++) {
            if (arr[i][j] === 0) {
                cellsAvailable.push([i,j]);
            }
        }
    }

    var l = cellsAvailable.length;
    if (l === 1) {
        //select the only one left
        cells[cellsAvailable[0][0]][cellsAvailable[0][1]] = 2;
        // call judger
        if (!judger(cells)) {
            alert('Game Over!');  
        }
    } else {
        var index = Math.floor(Math.random() * l);
        var x = cellsAvailable[index][0];
        var y = cellsAvailable[index][1];

        var dice = Math.ceil(Math.random() * 10);
        if (dice <= oddOftwo ) {
            cells[x][y] = 2;
        } else {
            cells[x][y] = 4;
        }
    }
}

function moveUp(arr) {
    updated = false;

    for (var j=0;j<arr.length;j++) {
        for (var i=1;i<rows;i++) {
            if (arr[i][j] === 0) {
                continue;
            } else {
                if(moveOneStep([i,j], 'up')) {
                    updated = true;
                }
            }
        }
    }
    
    if (updated) {
        return true;
    } else {
        return false;
    }
}

function moveDown(arr) {
    updated = false;
    for (var j=0;j<arr.length;j++) {
        for (var i=rows-2;i>=0;i--) {
            if (arr[i][j] === 0) {
                continue;
            } else {
                if(moveOneStep([i,j], 'down')) {
                    updated = true;
                }
            }
        }
    }
    if (updated) {
        return true;
    } else {
        return false;
    }
}

function moveLeft(arr) {
    updated = false;

    for (var i=0;i<arr.length;i++) {
        for (var j=1;j<arr[i].length;j++) {
            if (arr[i][j] === 0) {
                continue;
            } else {
                if(moveOneStep([i,j], 'left')) {
                    updated = true;
                }
                
            }
        }
    }

    if (updated) {
        return true;
    } else {
        return false;
    }
}

function moveRight(arr) {
    updated = false;
    
    for (var i=0;i<arr.length;i++) {
        for (var j=arr[i].length-2;j>=0;j--) {
            if (arr[i][j] === 0) {
                continue;
            } else {
                if(moveOneStep([i,j], 'right')) {
                    updated = true;
                }
            }
        }
    }

    if (updated) {
        return true;
    } else {
        return false;
    }
}

function moveOneStep(cell, direction) {

    var x = cell[0];
    var y = cell[1];
    //move up statement
    switch (direction) {
        case 'up':
            _x = x - 1;
            if (cells[_x][y] === 0) {
                cells[_x][y] = cells[x][y];
                cells[x][y] = 0;
                if (_x == 0) {
                    return true;
                } else {
                    moveOneStep([_x,y], 'up');
                    return true;
                }
            } else if (cells[_x][y] === cells[x][y]) {
                cells[_x][y] *= 2;
                cells[x][y] = 0;
                return true;
            } else {
                return false;
            }
            break;
        case 'down':
            _x = x + 1;
            if (cells[_x][y] === 0) {
                cells[_x][y] = cells[x][y];
                cells[x][y] = 0;
                if (_x == rows-1) {
                    return true;
                } else {
                    moveOneStep([_x,y], 'down');
                    return true;
                }
            } else if (cells[_x][y] === cells[x][y]) {
                cells[_x][y] *= 2;
                cells[x][y] = 0;
                return true;
            } else {
                return false;
            }
            break;
        case 'left':
            var _y = y - 1;
            if (cells[x][_y] === 0) {
                cells[x][_y] = cells[x][y];
                cells[x][y] = 0;
                if (_y == 0) {
                    return true;
                } else {
                    moveOneStep([x,_y], 'left');
                    return true;
                }
            } else if (cells[x][_y] === cells[x][y]) {
                cells[x][_y] *= 2;
                cells[x][y] = 0;
                return true;
            } else {
                return false;
            }
            break;
        case 'right':
            var _y = y + 1;
            if (cells[x][_y] === 0) {
                cells[x][_y] = cells[x][y];
                cells[x][y] = 0;
                if (_y == rows-1) {
                    return true;
                } else {
                    moveOneStep([x,_y], 'right');
                    return true;
                }
            } else if (cells[x][_y] === cells[x][y]) {
                cells[x][_y] *= 2;
                cells[x][y] = 0;
                return true;
            } else {
                return false;
            }
            break;
        default:
            break;
    }
}

function display(arr) {
    for (var i=0;i<arr.length;i++) {
        for (var j=0;j<arr[i].length;j++) {

            var id = 'i-' + i + '-' + j;
            var cell = document.getElementById(id);
            if (arr[i][j] === 0) {
                cell.textContent = '';
            } else {
                cell.textContent = arr[i][j];
            }

        }
    }
}

function judger(arr) {
    // X direction
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length - 1; j++) {
            if ( (arr[i][j] === arr[i][j+1]) ) {
                return true; // Continue game
            }
        }
    }

    // Y direction
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if ( (arr[i][j] === arr[i+1][j]) ) {
                return true; // Continue game
            }
        }
    }

    // Otherwise
    return false; // Game over
}