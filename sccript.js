let btnContainer = document.querySelector(".add-btn-container");
let sheetList = document.querySelector(".sheet-list")
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click",handleSheet);

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
    Newsheet.addEventListener("click",handleSheet)
})
function handleSheet(e) {
    //evnt listener add
    let sheet = e.currentTarget;                     // jis cheej pe click karoge wo e.currentTarget se milega
    let allSheets = document.querySelectorAll(".sheet");   // saari sheet list is se mil jaayegi
    for(let i=0;i<allSheets.length;i++){
        allSheets[i].classList.remove("active");         // sab se ht jaayegi actibe class
    }
    sheet.classList.add("active");                      // jispe click kiya uspe active ho jaayegi
}