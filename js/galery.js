let images = [
	[],
	[],
	[],
]

let imagesUsed = [0,0,0]

let allImagesDone = []

//loop over all srcs and add them to the fitting list
imgSrcs.forEach(item => {
		let img = new Image()
		img.src = "./img/photoshop/" + item

		let div = document.createElement("div")

		if(altSrcs.includes(item)){//alternate is providet for that image - add toggle eye icon
			div.innerHTML += `<div data-index="${altSrcs.indexOf(item)}" data-mode="0" class="swap" onmousedown="changeImage(this)" title="click to see before/after"><i class="fa-solid fa-eye"></i></div>`
		}
	
		allImagesDone.push(new Promise((resolve, reject) => {
			img.onload = function(){
				div.appendChild(img)

				if(img.height > img.width * 1.1){ //portrait
					div.classList.add("span-v-2")
					images[0].push(div)
				}
				else if(img.width > img.height * 1.1){ //landscape
					div.classList.add("span-v-4")

					images[1].push(div)
				}
				else{ // "square"
					div.classList.add("span-v-3")
					images[2].push(div)
				}
				resolve()
			}
	}))
})

let html = []

Promise.all(allImagesDone).then(() => { //all srcs have finished (images are now in cach and code in the array)
	images[0] = sortBySrc(images[0])
	images[1] = sortBySrc(images[1])
	images[2] = sortBySrc(images[2])

	let nextSelect = 0 //counter from 0 to 3 - used to push images in the order 0110011001100

	for (let i = 0; i < imgSrcs.length; i++) {
		let image
		let nextup

		if([2, 1].includes(nextSelect)){
			nextup = 0
		}
		else if([0, 3].includes(nextSelect)){
			nextup = 1
		}
		
		nextSelect = (nextSelect+1)%4

		if(!images[nextup][imagesUsed[nextup]]) { //array of selected images (landscape, portrait) is used up (pos is undefined)
			nextup = (nextup+1) % 2 //swapping from 1 to 0 or the other way round
		}
		
		if(imagesUsed[0] > 0 && !images[0][imagesUsed[0]-1]){//imageUsedcount is positiv(first check could be -1) && no portraits are left - add square class
		}
		
		if(!images[0][imagesUsed[0]]){
			console.log(imagesUsed[0], "-1", images[0][imagesUsed[0]-1], "-2,", images[0][imagesUsed[0]-2], "target", images[1][imagesUsed[1]], "previous elem", html[html.length-1]);
			if(!images[0][imagesUsed[0]-1]){ //no more portrait images left
				images[1][imagesUsed[1]]?.classList.add("endpiece") //add endpiece classes to following landscape imgs(not have a portrait to partner with)

				if(!images[1][imagesUsed[1]+1] && !images[2][imagesUsed[2]]){
					images[1][imagesUsed[1]]?.classList.add("last")
				}
			}

			if(
				images[0][imagesUsed[0]-1] && //since imagesUse[0] is also ++d if its undefined you have to check for the one before as well
				html.length % 2 == 0 //the count has to be even (othervise the last two were prtraits anyway so everything looks fine)
				)
			{ //cant even explain, hav fun re learing //stupid fuck I understand now :)
				images[1][imagesUsed[1]]?.classList.add("krueppel", "endpiece")
			}
			imagesUsed[0] = 99999
		}

		//actually selects and adds next image
		image = images[nextup][imagesUsed[nextup]]
		if(image){
			html.push(image)
		}

		imagesUsed[nextup]++

		//every thrid one has the option to display squares
		if((i+2)%3 == 0 && images[2][imagesUsed[2]] && images[2][imagesUsed[2]+1]){ 
			for (let i = 0; i < 2; i++) {
				html.push(images[2][imagesUsed[2]])
				imagesUsed[2]++
			}
		}
	}

	//adds all remaining squares
	while(images[2][imagesUsed[2]]){
		html.push(images[2][imagesUsed[2]]) 
		imagesUsed[2]++
	}

	/* document.querySelectorAll("div[data-index]").forEach((elem)=>{
		changeImage(elem, true)
		setTimeout(function(){
			changeImage(elem, true)
		},300)
	}) */

	document.querySelector('main').append(...html)
});

function sortBySrc(sortMe){
	sortMe.sort(function (a, b) {
		a = a.querySelector("img")
		b = b.querySelector("img")
		if (a.src < b.src) {
			return -1;
		}
		if (a.src > b.src) {
			return 1;
		}
		return 0;
	});
	return sortMe
}


//----------- toggle image on click -----------//

let timeOnClick = Date.now();

//loads images into cach
//?not sure if this actually works
//!does not work

let imagePreload = []
preloadImage(0)
function preloadImage(pos){
	console.log("in");
	let objImage = new Image()
	
	objImage.src = "img/photoshop/alt/" + altSrcs[pos];
	objImage.onload = ()=>{
		if(pos+1 < altSrcs.length)
		preloadImage(pos+1)
	}

	imagePreload.push(objImage)
}

function changeImage(elem, forcePhone = false){
	let index = elem.getAttribute("data-index")
	if(window.innerWidth > 800 && forcePhone == false){ //pc behaviour
		timeOnClick = Date.now()

		elem.addEventListener("mouseup", () => {
				if(Date.now() - timeOnClick > 500){
					elem.parentNode.querySelector("img").src = "./img/photoshop/" + altSrcs[index]
				}
				else
					setTimeout(function(){
						elem.parentNode.querySelector("img").src = "./img/photoshop/" + altSrcs[index]
					}, 500 - (Date.now() - timeOnClick))
				elem.removeEventListener("mouseup", () => {})
		})

		elem.parentNode.querySelector("img").src = "./img/photoshop/alt/" + altSrcs[index];
	}
	else{ //phone behaviour
		if(elem.parentNode.querySelector("img").getAttribute("data-mode") == 0){
			elem.parentNode.querySelector("img").setAttribute("data-mode", 1)
			elem.parentNode.querySelector("img").src = "./img/photoshop/" + altSrcs[index]
		}
		else{
			elem.parentNode.querySelector("img").setAttribute("data-mode", 0)
			elem.parentNode.querySelector("img").src = "./img/photoshop/alt/" + altSrcs[index];
		}
	}
}
