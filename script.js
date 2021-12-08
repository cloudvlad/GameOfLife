var maxWidth = 100;
var maxHeight = 100;

var table = document.getElementById("grid-table");

function cell_set(el)
{
    console.log(el.id);
    el.style.backgroundColor = "black";
}

for (let i = 0; i < maxHeight; i++) 
{
    var row = table.insertRow(i);
    for (let j = 0; j < maxWidth; j++) 
    {
        var cell = row.insertCell(j);
        cell.setAttribute("id", (i.toString() + "-" + j.toString()));
        cell.addEventListener("click", function () {cell_set(this);}, false);
    }
}

