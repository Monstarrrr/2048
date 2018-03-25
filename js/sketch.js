let grid;
let grid_new;
let score = 0;


// - SETUP - //
function setup() {
    createCanvas(405, 405);
    noLoop();
    grid = blankGrid();
    grid_new = blankGrid();

    addNumber();
    addNumber();
    updateCanvas();
}

function keyPressed() {
    let rotated = false;
    let flipped = false;
    let played = true;

    switch (keyCode) {
        case DOWN_ARROW:
            // DO NOTHING
            break;
        case UP_ARROW:
            grid = flipGrid(grid);
            flipped = true;
            break;
        case RIGHT_ARROW:
            grid = transposeGrid(grid, 1);
            rotated = true;
            break;
        case LEFT_ARROW:
            grid = transposeGrid(grid, 1);
            grid = flipGrid(grid);
            rotated = true;
            flipped = true;
            break;
        default:
            played = false;
    }

    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);

    if (flipped) {
        grid = flipGrid(grid);
    }

    if (rotated) {
        grid = transposeGrid(grid, -1);
    }

    if (changed) {
        addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    if (gameover) {
        console.log("GAME OVER");
        console.log("SCORE : " + score);
    }

    let gamewon = isGameWon();
    if (gamewon) {
        console.log("GAME WON !");
        console.log("SCORE : " + score);
    }
}

// --- DRAW --- //
function updateCanvas() {
    background(187, 173, 160);
    drawGrid();
    document.getElementById('score').innerHTML = score;
}
