function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
}

function drawGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            noFill(0);
            strokeWeight(2);
            let val = grid[i][j];
            let s = val.toString();
            stroke(0);
            if (grid_new[i][j] === 1) {
                stroke('rgb(237,207,114)');
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
    let extra = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            extra[i][j] = grid[i][j];
        }
    }
    return extra;
}

function flipGrid(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }
    return grid;
}

function transposeGrid(grid, direction) {
    let newGrid = blankGrid();
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (direction == 1) {
                newGrid[i][j] = grid[j][i];
            } else {
                newGrid[j][i] = grid[i][j];
            }
        }
    }
    return newGrid;
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
        grid[spot.x][spot.y] = random(1) > 0.1 ? 2 : 4;
        grid_new[spot.x][spot.y] = 1;
    }
}
