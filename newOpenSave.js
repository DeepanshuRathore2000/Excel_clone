let save = document.querySelector(".save");
let open = document.querySelector(".open");
//functionality -> download excel representations

save.addEventListener("click",function(){
    //ad array save file
    const data = JSON.stringify(sheetDB);
    //convert it into blob
    //data -> file like object convert
    const blob = new Blob([data],{type:`application/json`});
    //convert any type file into url
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    //to download file
    a.download = "file.json";
    a.href = url;
    a.click();
})

//to open downloaded file
open.addEventListener("change",function(){
    //files array -> file accept
    let filesArray = open.files;
    let fileObj = filesArray[0];
    //file reader
    let fr = new FileReader(fileObj);
    fr.readAsText(fileObj);
    fr.onload = function(){
        console.log(fr.result);
    }
})