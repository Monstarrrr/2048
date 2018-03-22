let grid;

// - SETUP - //
function setup() {
    createCanvas(400, 400);
    grid = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
    ];
    console.table(grid);
    addNumber();
    addNumber();
    console.table(grid);
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

// - DRAW - //
function draw() {
    background(220);
    drawGrid();
}

function drawGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            noFill(0);
            strokeWeight(2);
            stroke(0);
            rect(i * 100, j * 100, 100, 100);

            let val = grid[i][j];
            if (grid[i][j] !== 0) {
                textAlign(CENTER);
                textSize(64);
                fill(0);
                noStroke();
                text(val, i * 100 - 100 / 2, j * 100 - 100 / 2);
            }
        }
    }
}
