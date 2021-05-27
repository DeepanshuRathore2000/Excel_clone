for(let i=0;i<allCells.length;i++){
    //to save the user entered value into db for later use
    allCells[i].addEventListener("blur",function () {
        let data = allCells[i].innerText;
        let address = addressInput.value;
        let { rid, cid } = getRIDCIDfromAddress(address);
        sheetDB[rid][cid].value = data;
    })

}
formulaBar.addEventListener("keydown",function(e){
    if(e.key =  "Enter" && formulaBar.value){
        // user input formula
        let cFormula = formulaBar.value;
        //formula-> value get
        let value = evaluateFormula(cFormula);
        //given for which we are setting the formula -> ui,db update
        setCell(value,cFormula);
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
            formulaTokens[i] = value;
        }
    }
    // [(,10,+,20,)]
    let evaluatedFormula = formulaTokens.join(" ");
    // ( 10 + 20 )
    return eval(evaluatedFormula);
}
function setCell(value, formula){
    let uiCellElem = findUICellElement();
    uiCellElem.innerText = value;
    //db update
    let {rid, cid} = getRIDCIDfromAddress(addressInput.value);
    sheetDB[rid][cid].value = value;
    sheetDB[rid][cid].formula = formula;
}
function findUICellElement(){
    let address = addressInput.value;
    let ridcidObj = getRIDCIDfromAddress(address);
    let rid = ridcidObj.rid;
    let cid = ridcidObj.cid;
    let uiCellElement = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    return uiCellElement;
}
function getRIDCIDfromAddress(address){
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return  { "rid":rid,"cid":cid };
}