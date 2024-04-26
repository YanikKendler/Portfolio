window.addEventListener("mousemove", (e) => {
    let mouseblob = document.querySelector("div.mouseblob") as HTMLElement
    mouseblob.style.left = e.pageX + "px";
    mouseblob.style.top = Math.min(e.pageY, document.body.clientHeight - mouseblob.clientHeight) + "px";
})

function showProjectText(headerElem: HTMLElement){
    let projectElement = headerElem.parentElement
    /*if(projectElement.dataset.detailsShown == "true"){
        projectElement.style.maxHeight = ""
        projectElement.dataset.detailsShown = "false"
    }
    else{
        projectElement.style.maxHeight = "500px"
        projectElement.dataset.detailsShown = "true"
    }*/
    projectElement.classList.toggle("open")
    console.log("adfa")
}