var SCALE = 1;
var SPEED = 1;
var matrix;

var table = document.getElementById("grid-table");
var start_button = document.getElementById("start-button");
var status = false;



var maxWidth = (Math.floor((window.innerWidth - 20) / 20)) / SCALE;
var maxHeight = (Math.floor((window.innerHeight - 20) / 20)) / SCALE;
var maxHeight = (maxHeight - 5) / SCALE;
var colorChange = function () {
    cell_set(this);
};

window.onload = function () {
    draw();
    matrix = new Array(maxHeight);
    for (let i = 0; i < maxHeight; i++) {
        matrix[i] = new Array(maxWidth);
        matrix[i].fill(false);
    }
};

function cell_set(el) {
    var x = parseInt(el.id.split("-")[0]);
    var y = parseInt(el.id.split("-")[1]);
    matrix[x][y] = true;
    el.style.backgroundColor = "black";
}

function draw() {
    for (let i = 0; i < maxHeight; i++) {
        var row = table.insertRow(i);
        for (let j = 0; j < maxWidth; j++) {
            var cell = row.insertCell(j);
            cell.setAttribute("id", (i.toString() + "-" + j.toString()));
            cell.addEventListener("click", this.colorChange, false);
        }
    }
}




function deadOrAlive(x, y) {
    var xmap = [-1, 0, 1, 1, 1, 0, -1, -1];
    var ymap = [1, 1, 1, 0, -1, -1, -1, 0];

    var aliveCells = 0;
    for (let i = 0; i < 8; i++) {
        if (x + xmap[i] < 0 || y + ymap[i] < 0)
        {
            continue;
        }

        if (matrix[x + xmap[i]][y + ymap[i]]) {
            aliveCells += 1;
        }
    }
    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    if (aliveCells < 2)
    {
        return false;
    }

    // Any live cell with two or three live neighbours lives on to the next generation.
    if (aliveCells == 2 || aliveCells == 3) {
        return true;
    }

    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    if (aliveCells > 3) {
        return false;
    }

    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    if (!matrix[x][y] && aliveCells == 3)
    {
        return true;
    }
}


function calculate() {
    var overlay = new Array(maxHeight);
    for (let i = 0; i < maxHeight; i++) {
        overlay[i] = new Array(maxWidth);
        overlay[i].fill(false);
    }

    for (let i = 0; i < maxHeight; i++) {
        for (let j = 0; j < maxWidth; j++) {
            overlay[i][j] = deadOrAlive(i, j);
        }
    }

    matrix = overlay;
}

function update() {
    for (let i = 0; i < maxHeight; i++) {
        for (let j = 0; j < maxWidth; j++) {
            if (matrix[i][j]) {
                document.getElementById(toString(i) + "-" + toString(j)).style.backgroundColor = "black";
            }
            else {
                document.getElementById(toString(i) + "-" + toString(j)).style.backgroundColor = "white";
            }
        }
    }
}

function execute() {
    calculate();
    draw();
}

start_button.addEventListener("click", execute(), false);