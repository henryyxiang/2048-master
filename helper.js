newGame();

function newGame() {
    init(cells);
    generate(cells);
    generate(cells);
    display(cells);
}


var keyMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    87: 'up',
    83: 'down',
    65: 'left',
    68: 'right'
};


document.addEventListener('keydown', (e) => {
    var key = keyMap[e.keyCode];
    switch (key) {
        case 'up':
            if (moveUp(cells)) {
                generate(cells);
            }
            break;
        case 'down':
            if (moveDown(cells)) {
                generate(cells);
            }
            break;
        case 'left':
            if (moveLeft(cells)) {
                generate(cells);
            }
            break;
        case 'right':
            if (moveRight(cells)) {
                generate(cells);
            }
            break;
        default:
            break;
    }
    display(cells);
}, false);

document.getElementById('btn-new-game').addEventListener('click', newGame, false);