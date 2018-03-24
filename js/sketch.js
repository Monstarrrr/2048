let grid;

// - SETUP - //
function setup() {
    createCanvas(405, 405);
    grid = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
    ];

    addNumber();
    addNumber();
}

function addNumber() {
    let options = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                options.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    if (options.length !== 0) {
        let spot = random(options);
        grid[spot.x][spot.y] = random(1) > 0.5 ? 2 : 4;
    }
}

function operate(row) {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
}

function compare(a, b) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (a[i][j] != b[i][j]) {
                return true;
            }
        }
    }
    return false;
}

function copyGrid(grid) {
    let extra = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            extra[i][j] = grid[i][j];
        }
    }
    return extra;
}

function flip(grid) {
    for (i = 0; i < 4; i++) {
        grid[i].reverse();
    }
}

function keyPressed() {
    let flipped = false;
    if (keyCode === DOWN_ARROW) {
        // DO NOTHING
    } else if (keyCode === UP_ARROW) {
        flip(grid);
        flipped = true;
    }

    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);

    if (flipped) {
        flip(grid);
    }

    if (changed) {
        addNumber();
    }
}

// --- DRAW --- //

function draw() {
    background(220);
    drawGrid();
}

function slide(row) {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

function combine(row) {
    for (i = 3; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];
        if (a == b) {
            row[i] = a + b;
            row[i - 1] = 0;
        }
    }
    return row;
}


// The Grid //
function drawGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            noFill(0);
            strokeWeight(2);
            stroke(0);
            rect(i * 100 + 5, j * 100 + 5, 95, 95);

            let val = grid[i][j];
            if (grid[i][j] !== 0) {
                textAlign(CENTER, CENTER);
                textSize(64);
                fill(0);
                noStroke();
                text(val, (i * 100 + 100 / 2) + 4, (j * 100 + 100 / 2) + 4);
            }
        }
    }
}
