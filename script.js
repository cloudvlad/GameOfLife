var timeoutId = null;
var SPEED = 1;
var SCALE = 1;
var status = false;
var matrix;
var run = false;

var table = document.getElementById("grid-table");
var start_button = document.getElementById("start-button");
start_button.addEventListener("click", function () {execute();}, false);


var maxWidth = (Math.floor((window.innerWidth - 20) / 20));
var maxHeight = (Math.floor((window.innerHeight - 20) / 20));
var maxHeight = (maxHeight - 4);

window.onload = function () {
    draw();
    matrix = new Array(maxHeight);
    for (let i = 0; i < maxHeight; i++) {
        matrix[i] = new Array(maxWidth);
        matrix[i].fill(false);
    }
};






var setCell = function () {
    var x = parseInt(this.id.split("-")[0]);
    var y = parseInt(this.id.split("-")[1]);
    if (matrix[x][y])
    {
        matrix[x][y] = false;
        this.style.backgroundColor = "#B2B2B2";
        return;
    }
    matrix[x][y] = true;
    this.style.backgroundColor = "black";
};

function draw() {
    for (let i = 0; i < maxHeight; i++) {
        var row = table.insertRow(i);
        for (let j = 0; j < maxWidth; j++) {
            var cell = row.insertCell(j);
            cell.setAttribute("id", (i.toString() + "-" + j.toString()));
            cell.addEventListener("click", this.setCell, false);
        }
    }
}

function deadOrAlive(x, y) {
    // Map of the spots around the the cell with coordinatex x and y
    var xmap = [0, 1, 1, 1, 0, -1, -1, -1];
    var ymap = [-1, -1, 0, 1, 1, 1, 0, -1];

    var aliveCells = 0;
    for (let i = 0; i < 8; i++) {
        // If out of boundaries
        if ((x + xmap[i]) < 0 || (y + ymap[i]) < 0 || (x + xmap[i]) == maxHeight || (y + ymap[i]) == maxWidth) {
            continue;
        }

        if (matrix[x + xmap[i]][y + ymap[i]]) {
            aliveCells += 1;
        }
    }

    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    if (matrix[x][y] && aliveCells < 2) {
        return false;
    }

    // Any live cell with two or three live neighbours lives on to the next generation.
    if (matrix[x][y] && (aliveCells == 2 || aliveCells == 3)) {
        return true;
    }

    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    if (matrix[x][y] && aliveCells > 3) {
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
    calculate();
    for (var i = 0; i < maxHeight; i++) {
        for (var j = 0; j < maxWidth; j++) {
            var cell = document.getElementById(i + "-" + j);
            if (matrix[i][j]) {
                cell.style.backgroundColor = "black";
            }
            else {
                cell.style.backgroundColor = "#B2B2B2";
            }
        }
    }

    if (run) {
        timeoutId = setTimeout(update, 500 / SPEED);
    }
    
}

function execute() {
    SPEED = document.getElementById("speed-range").value;
    run = !run;
    console.log(run);
    if (run) {
        start_button.value = "| |";
        update();
        return;
    }
    start_button.value= ">";
}