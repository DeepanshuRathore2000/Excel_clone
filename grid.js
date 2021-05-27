let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
// current clicked cell address
let addressInput = document.querySelector(".address-input");
let boldBtn = document.querySelector(".bold");
let underlineBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");
let alignBtn = document.querySelectorAll(".align-container>*");
let fontSizeElem = document.querySelector(".font-size");
let formulaBar = document.querySelector(".formula-input");
let rows = 100;
let cols = 26;
/*leftcol*/
for(let i = 0; i < rows; i++){
    let colBox = document.createElement("div");
    colBox.innerText = i+1;
    colBox.setAttribute("class","box");
    leftCol.appendChild(colBox);
}
/*toprow*/
for(let i=0;i<cols;i++){
    let cell = document.createElement("div");
    cell.innerText = String.fromCharCode(65+i);
    cell.setAttribute("class","cell");
    topRow.appendChild(cell);
}

/*grid*/
// ui uniquely identify
for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.setAttribute("class","row");
    for (let j = 0; j < cols ; j++) {
        let cell = document.createElement("div");
        // cell.innerText=`${String.fromCharCode(65 + j )} ${i+1}`;
        cell.setAttribute("class","cell");
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("contenteditable","true");           // cell div the islye usme likhne ke liye contenteditable ka use kiya. ya fir sbko input type ka banana pdta.
        row.appendChild(cell);
    }
    grid.appendChild(row);   
}
//database
let sheetDB = [];
for(let i=0;i<rows;i++){
    let row = [];
    for(let j=0;j<cols;j++){
        let cell = {
            bold: "normal",
            italic:"normal",
            underline:"none",
            hAlign:"center",
            fontFamily:"sans-serif",              // cells object ka data
            fontSize:"16",
            color:"black",
            bgColor:"none",
            value:  "",
            formula: ""
        }
        row.push(cell);                //row ke andar cells
    }
    sheetDB.push(row);                //sheet ke andar rows 
}                                       //2D array reprensents sheet and object represents cell


// we have to write this below because cell will be created later and we can take action on them afterwards only
let allCells = document.querySelectorAll(".grid .cell");
for(let i=0; i<allCells.length ;i++){
    allCells[i].addEventListener("click",function () {
        // get address of current cell
        let rid = allCells[i].getAttribute("rid");
        let cid = allCells[i].getAttribute("cid");
        rid  = Number(rid);                                 // string to number;
        cid = Number(cid);
        let address = `${String.fromCharCode(65 + cid )}${rid + 1}`;    // to change in ascii value
       
        addressInput.value = address;
        let cellObject = sheetDB[rid][cid];
        if(cellObject.bold =="normal" ){
            boldBtn.classList.remove("active-btn");

        } else{
            boldBtn.classList.add("active-btn");
        }
        if(cellObject.underline =="none" ){
            underlineBtn.classList.remove("active-btn");

        } else{
            underlineBtn.classList.add("active-btn");
        }
        if(cellObject.italic =="normal" ){
            italicBtn.classList.remove("active-btn");

        } else{
            italicBtn.classList.add("active-btn");
        }
    })
}

// bold,underline,italic
boldBtn.addEventListener("click", function (){
    // jispe click krein -> usey bold krdo
    let uiCellElement = findUICellElement();
    let cid = uiCellElement.getAttribute("cid");
    let rid = uiCellElement.getAttribute("rid");
    let cellObject = sheetDB[rid][cid];
    if(cellObject.bold == "normal"){
        uiCellElement.style.fontWeight = "bold";
        boldBtn.classList.add("active-btn");
        cellObject.bold = "bold";
    }else{
        boldBtn.classList.remove("active-btn");
        uiCellElement.style.fontWeight = "normal";
        cellObject.bold="normal";
    }
    
})
underlineBtn.addEventListener("click", function (){
    let uiCellElement = findUICellElement();
    let cid = uiCellElement.getAttribute("cid");
    let rid = uiCellElement.getAttribute("rid");
    let cellObject = sheetDB[rid][cid];
    if(cellObject.underline == "none"){
        uiCellElement.style.textDecoration = "underline";
        underlineBtn.classList.add("active-btn");
        cellObject.underline = "underline";
    }else{
        underlineBtn.classList.remove("active-btn");
        uiCellElement.style.textDecoration = "none";
        cellObject.underline="none";
    }
})
italicBtn.addEventListener("click", function (){
   
    let uiCellElement = findUICellElement();
    let cid = uiCellElement.getAttribute("cid");
    let rid = uiCellElement.getAttribute("rid");
    let cellObject = sheetDB[rid][cid];
    if(cellObject.bold == "normal"){
        uiCellElement.style.fontStyle = "italic";
        italicBtn.classList.add("active-btn");
        cellObject.italic = "italic";
    }else{
        italicBtn.classList.remove("active-btn");
        uiCellElement.style.fontStyle = "normal";
        cellObject.italic="normal";
    }
})
// horizontal alignment
for(let i=0;i<alignBtn.length;i++){
    alignBtn[i].addEventListener("click",function(){
        let alignment = alignBtn[i].getAttribute("class");
        let uiCellElement = findUICellElement();
        uiCellElement.style.textAlign = alignment ;
    })
}
//font-size
fontSizeElem.addEventListener("change",function(){
    let val = fontSizeElem.value;
    let uiCellElement = findUICellElement();
    uiCellElement.style.fontSize=val+"px";
})
allCells[0].click();