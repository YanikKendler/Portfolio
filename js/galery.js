
//----------- change images to show how they are made -----------//
let srcs = [
	"./img/photoshop/Aliens-edit-bennyproductions.jpg",
	"./img/photoshop/Vincent auf mini planet.jpg",
	"./img/photoshop/magic-edit.jpg",
]
let altSrcs = [
	"./img/photoshop/alt/Aliens-edit-bennyproductions.jpg",
	"./img/photoshop/alt/Vincent auf mini planet.jpg",
	"./img/photoshop/alt/magic-edit.jpg",
]

let timeOnClick = Date.now();

for (let i = 0; i < altSrcs.lenght; i++) {
	let objImage = new Image()
	
	objImage.src = altSrcs[i];
}

//UNUSED make image big onclick
/* document.querySelectorAll('#galery > div').forEach((elem) => {
	console.log(elem);
	elem.addEventListener("click", ()=>{
		if(!elem.classList.contains("big")){
			document.querySelectorAll('.big').forEach((bigelem) => {
				bigelem.classList.remove("big")
			})
			elem.classList.add("big")
			elem.scrollIntoView()
		}
		else
			elem.classList.remove("big")
	})
}) */

function changeImage(elem){
	let index = elem.getAttribute("data-index")
	if(window.innerWidth > 800){
		console.log("big");
		timeOnClick = Date.now()

		elem.addEventListener("mouseup", () => {
				if(Date.now() - timeOnClick > 500){
					elem.parentNode.querySelector("img").src = srcs[index]
				}
				else
					setTimeout(function(){
						elem.parentNode.querySelector("img").src = srcs[index]
					}, 500- (Date.now() - timeOnClick))
				elem.removeEventListener("mouseup", () => {})
		})

		elem.parentNode.querySelector("img").src = altSrcs[index];
	}
	else{
		if(elem.parentNode.querySelector("img").getAttribute("data-mode") == 0){
			elem.parentNode.querySelector("img").setAttribute("data-mode", 1)
			elem.parentNode.querySelector("img").src = srcs[index]
		}
		else{
			elem.parentNode.querySelector("img").setAttribute("data-mode", 0)
			elem.parentNode.querySelector("img").src = altSrcs[index];
		}
	}
}