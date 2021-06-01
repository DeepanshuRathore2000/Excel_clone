for(let i=0;i<allCells.length;i++){
    //to save the user entered value into db for later use
    allCells[i].addEventListener("focusout",function () {
        // console.log("blur");                 // to check if blur event is working
        let data = allCells[i].innerText;
        let address = addressInput.value;
        //console.log(address);
        // console.log(allCells[i]);
        let rid = allCells[i].getAttribute("rid");
        let cid = allCells[i].getAttribute("cid");
        // console.log(data,address);           // to check the data and address
         //let { rid , cid } = getRIDCIDfromAddress(address);   //event dusre cell pe click  hone se pehle hi chal jaata hai isliye code aise nhi likh skte hai thiss is also correct
        let cellObject = sheetDB[rid][cid];
        if (cellObject.value == data){
            return;
        }
        // formula to maulally set value
        //cell click -> no change
        if (cellObject.formula){
            removeFormula(cellObject,address);
        }
        // to make entry of value (entered in cell) into db.
        cellObject.value = data;
        // if you are updating your value then someone may have
        // included in their formula so you need to tell them to evaluate their value
        updateChildren(cellObject);
        
    })

}
// code runs when we set formula in formula bar
formulaBar.addEventListener("keydown",function(e){
    if(e.key ==  "Enter" && formulaBar.value){
        // user input formula
        let cFormula = formulaBar.value;
        let address = addressInput.value;
        let { rid, cid } = getRIDCIDfromAddress(address);
        let cellObject = sheetDB[rid][cid];
       // remove formula when we updating formula
        if(cFormula != cellObject.formula){
            removeFormula(cellObject,address);
            formulaBar.value = "";
        }
        //formula-> value get
        let value = evaluateFormula(cFormula);  
        //given for which we are setting the formula -> ui,db update
        setCell(value,cFormula);
        // formula cell -> cell object -> name address
        setParentCHArray(cFormula,address);
        updateChildren(cellObject);
    }
})
function evaluateFormula(formula){
    //( A1 + A2 )
    //split
    // [(,A1,+,A2,)]
    // a-> z
   
    let formulaTokens = formula.split(" ");
    for (let i=0; i < formulaTokens.length;i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if(ascii >=65 && ascii <=90){
            let {rid,cid} = getRIDCIDfromAddress(formulaTokens[i]);
            let value = sheetDB[rid][cid].value;
            if (value == ""){
                value = 0;
            }
            formulaTokens[i] = value;
        }
    }
    // [(,10,+,20,)]
    
    let evaluatedFormula = formulaTokens.join("");

    
    // ( 10 + 20 )
    return eval(evaluatedFormula);
}

//setcell-> updating the value of calculated cell in db and ui
function setCell(value, formula){
    let uiCellElem = findUICellElement();
    uiCellElem.innerText = value;
    //db update
    let {rid, cid} = getRIDCIDfromAddress(addressInput.value);
    sheetDB[rid][cid].value = value;
    sheetDB[rid][cid].formula = formula;
}
// dom element reference that is inside address bar
function findUICellElement(){
    let address = addressInput.value;
    let ridcidObj = getRIDCIDfromAddress(address);
    let rid = ridcidObj.rid;
    let cid = ridcidObj.cid;
    let uiCellElement = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    
    return uiCellElement;
}
// address (string) -> rid/cid
function getRIDCIDfromAddress(address){
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return  { rid,cid };
}
// register yourself as children of the parent (cell that are appearing in the formula)
function setParentCHArray(formula, chAddress){
    let formulaTokens = formula.split(" ");
    for(let i=0;i< formulaTokens.length;i++){
        let ascii = formulaTokens[i].charCodeAt(0);
        if(ascii >=65 && ascii <=90){
            let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);
            let parentObj = sheetDB[rid][cid];
            parentObj.children.push(chAddress);
        }
    }
}

function updateChildren(cellObject){
    let children = cellObject.children;
    for (let i=0;i< children.length;i++){
        // children name
        let chAddress = children[i];
        let { rid, cid } = getRIDCIDfromAddress(chAddress);
        // 2d array
        let childObj = sheetDB[rid][cid];
        // get formula of children
        let chFormula = childObj.formula;
        let newValue = evaluateFormula(chFormula);
        setChildrenCell(newValue, chFormula,rid,cid);
        updateChildren(childObj);
    }
}
function setChildrenCell(value,formula,rid,cid){
    // let uicellElem = findUICellElement();
     // db update
    let uiCellElement = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCellElement.innerText = value;
    sheetDB[rid][cid].value = value;
    // sheetDB[rid][cid].formula = formula;
}
// parent -> children ->remove
// formula clear
function removeFormula(cellObject, myName){
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    for(let i=0;i< formulaTokens.length;i++){
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii>=65 && ascii <=90) {
            let {rid ,cid } = getRIDCIDfromAddress(formulaTokens[i]);
            let parentObj = sheetDB[rid][cid];
            let idx = parentObj.children.indexOf(myName);
            parentObj.children.splice(idx,1);
        }
    }
    cellObject.formula="";
}