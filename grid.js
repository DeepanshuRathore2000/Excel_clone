let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
let rows = 100;
let cols = 26;
for(let i=0;i<rows;i++){
    let colBox = document.createElement("div");
    colBox.innerText = i+1;
    colBox.setAttribute("class","box");
    leftCol.appendChild(colBox);
}
for(let i=0;i<cols;i++){
    let cell = document.createElement("div");
    cell.innerText = String.fromCharCode(65+i);
    cell.setAttribute("class","cell");
    topRow.appendChild(cell);
}
// raw idea of html of grid 
// <div class="grid">
    // <div class="row">
    // <div class="cell">A1</div>
    // <div class="cell">A2</div>
    // <div class="cell">A3</div>
    // <div class="cell">A4</div>

    // </div>
    // <div class="row">
    // <div class="cell">B1</div>
    // <div class="cell">B2</div>
    // <div class="cell">B3</div>
    // <div class="cell">B4</div>
    // </div>
// </div>
for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.setAttribute("class","row");
    for (let j = 0; j < cols ; j++) {
        
        let cell = document.createElement("div");
        cell.innerText=`${String.fromCharCode(65 + j )} ${i+1}`;
        cell.setAttribute("class","cell");
        row.appendChild(cell);
    }
    grid.appendChild(row);
    
    
}
