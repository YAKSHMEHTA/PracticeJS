const bookmarkName = document.getElementById("bookmark-name");
const bookmarkUrl = document.getElementById("bookmark-url");
const submitButtom = document.getElementById("add-bookmark");
const container = document.getElementById("bookmark-list");

submitButtom.addEventListener("click",(e)=>{
    let name = bookmarkName.value;
    let url = bookmarkUrl.value;

    let li = document.createElement("li");
    let a = document.createElement("a");
    let button = document.createElement("button");
    button.textContent = "DELETE";
    a.textContent = name;
    a.href = url
    button.addEventListener("click", () => {
    li.remove();
        });
    li.appendChild(a);
    li.appendChild(button);
    
    container.appendChild(li);

})