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
let btnContainer = document.querySelector(".add-btn-container");
let sheetList = document.querySelector(".sheet-list")
let firstSheet = document.querySelector(".sheet");
let formulaBar = document.querySelector(".formula-input");
let sheetArray = [];
// current sheet
let sheetDB;
firstSheet.addEventListener("click",makeMeActive);

firstSheet.click(); //click krwa diya first sheet pe
btnContainer.addEventListener("click",function () {
    //create sheet
    let allSheets = document.querySelectorAll(".sheet");
    let lastSheet = allSheets[allSheets.length-1];  //allsheet mein se last sheet nikalni
    let lastIdx = lastSheet.getAttribute("idx");    // last index ki value nikaal li
    lastIdx = Number(lastIdx);                      //index ko string to number me chang krdiya
    let Newsheet = document.createElement("div");
    Newsheet.setAttribute("class","sheet");
    Newsheet.setAttribute("idx",`${lastIdx+1}`); // indx ka no.
    Newsheet.innerText = `sheet ${lastIdx+2}`;     // sheet ka no. 
    sheetList.appendChild(Newsheet);
    for(let i=0;i<allSheets.length;i++){
        allSheets[i].classList.remove("active");   // saare sheets se remove .active krdiya
    }
    Newsheet.classList.add("active");              // new sheet pe remove krdiya  
    //new sheet create
    createSheet();
    sheetDB = sheetArray[Lastidx+1];
    Newsheet.addEventListener("click",handleSheet)
})
function makeMeActive(e) {
    //evnt listener add
    let sheet = e.currentTarget;                     // jis cheej pe click karoge wo e.currentTarget se milega
    let allSheets = document.querySelectorAll(".sheet");   // saari sheet list is se mil jaayegi
    for(let i=0;i<allSheets.length;i++){
        allSheets[i].classList.remove("active");         // sab se ht jaayegi actibe class
    }
    sheet.classList.add("active");                      // jispe click kiya uspe active ho jaayegi
    let idx = sheet.getAttribute("idx");
    if(!sheetArray[idx]){
        //only when you init the workbook
        createSheet();
    }
    // when clicked on addsheet
    sheetDB = sheetArray[idx];
    setUI();
}
function createSheet(){
    let NewDB=[];
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
                value:"",
                formula: "",
                children: []
            }
            let elem = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            elem.innerText = "";       // to clear UI
            row.push(cell);                //row ke andar cells
        }
        NewDB.push(row);                //sheet ke andar rows 
    }                                       //2D array reprensents sheet and object represents cell
    sheetArray.push(NewDB);
}
function setUI() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let elem = 
            document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            let value = sheetDB[i][j].value;
            elem.innerText = value;
        }
    }
}        
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
        // to clear formulabar area
        if (cellObject.formula){                                 
            formulaBar.value = cellObject.formula;
        }
        else{
            formulaBar.value="";
        }
    })
}
// *********formatting******//
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