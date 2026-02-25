const bookmarkName = document.getElementById("bookmark-name");
const bookmarkUrl = document.getElementById("bookmark-url");
const submitButtom = document.getElementById("add-bookmark");
const container = document.getElementById("bookmark-list");

submitButtom.addEventListener("click",(e)=>{
    let name = bookmarkName.value;
    let url = bookmarkUrl.value;

    let li = document.createElement("li");
    li.id = "bookmark-list";
    container.appendChild(li)

})