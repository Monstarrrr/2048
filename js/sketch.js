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
        alert("GAME OVER");
        alert("SCORE : " + score);
    }

    let gamewon = isGameWon();
    if (gamewon) {
        alert("GAME WON !");
        alert("SCORE : " + score);
    }
}

// --- DRAW --- //

function updateCanvas() {
    background(187, 173, 160);
    drawGrid();
    document.getElementById('score').innerHTML = score;
}


// The Grid //
function drawGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            noFill(0);
            strokeWeight(2);
            let val = grid[i][j];
            let s = val.toString();
            stroke(0);
            if (grid_new[i][j] === 1) {
                stroke('rgba(87,114,59,0.25)');
                grid_new[i][j] = 0;
                strokeWeight(2);
            } else {
                strokeWeight(3);
                stroke(0);
            }
            if (val != 0) {
                fill(colorsSizes[s].color);
            } else {
                noFill();
            }
            rect(i * 100 + 5, j * 100 + 5, 95, 95, 20, 20);
            if (val !== 0) {
                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                textSize(colorsSizes[s].size);
                text(val, (i * 100 + 100 / 2) + 2, (j * 100 + 100 / 2) + 4);
            }
        }
    }
}
