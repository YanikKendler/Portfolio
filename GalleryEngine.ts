interface GalleryImage {
	src: string
	alt?: boolean
}

interface ImageCollection {
	portrait: HTMLElement[]
	landscape: HTMLElement[]
	square: HTMLElement[]
}

let images: ImageCollection = {
	portrait: [],
	landscape: [],
	square: []
}

let imagesUsed = {
	portrait: 0,
	landscape: 0,
	square: 0
}

let imageLoaders: Promise<any>[] = []

let rootSrcString = ""

function generateGallery(container:HTMLElement, rootSrc: string, galleryImages: GalleryImage[]) {
	rootSrcString = rootSrc

	//loop over all srcs and add them to the fitting list
	galleryImages.forEach(item => {
		let img = new Image()
		img.src = rootSrc + item.src

		let div = document.createElement("div")

		if (item.alt == true) {//alternate is providet for that image - add toggle eye icon
			div.innerHTML += `<div data-filename="${item.src}" data-mode="0" class="swap" onmousedown="changeImage(this)" title="click to see before/after"><i class="fa-solid fa-eye"></i></div>`
		}

		imageLoaders.push(new Promise((resolve) => {
			img.onload = function () {
				div.appendChild(img)

				if (img.height > img.width * 1.1) { //portrait
					div.classList.add("span-v-2")
					images.portrait.push(div)
				} else if (img.width > img.height * 1.1) { //landscape
					div.classList.add("span-v-4")

					images.landscape.push(div)
				} else { // "square"
					div.classList.add("span-v-3")
					images.square.push(div)
				}
				resolve(null)
			}
		}))
	})

	let html: HTMLElement[] = []

	Promise.all(imageLoaders).then(() => { //all srcs have finished (images are now in cach and code in the array)
		images.landscape = sortBySrc(images.landscape)
		images.portrait = sortBySrc(images.portrait)
		images.square = sortBySrc(images.square)

		let nextSelect = 0 //counter from 0 to 3 - used to push images in the order 0110011001100

		for (let i = 0; i < galleryImages.length; i++) {
			let image
			let nextup: "portrait" | "landscape" = "portrait"

			if ([2, 1].includes(nextSelect)) {
				nextup = "portrait"
			} else if ([0, 3].includes(nextSelect)) {
				nextup = "landscape"
			}

			nextSelect = (nextSelect + 1) % 4

			if (!images[nextup][imagesUsed[nextup]]) { //array of selected images (landscape, portrait) is used up (pos is undefined)
				nextup = nextup == "portrait" ? "landscape" : "portrait" //switch to the other image type
			}

			if (imagesUsed.portrait > 0 && !images.portrait[imagesUsed.portrait - 1]) {//imageUsedcount is positiv(first check could be -1) && no portraits are left - add square class
			}

			if (!images.portrait[imagesUsed.portrait]) {
				console.log(imagesUsed.portrait, "-1", images.portrait[imagesUsed.portrait - 1], "-2,", images.portrait[imagesUsed.portrait - 2], "target", images.landscape[imagesUsed.landscape], "previous elem", html[html.length - 1]);
				if (!images.portrait[imagesUsed.portrait - 1]) { //no more portrait images left
					images.landscape[imagesUsed.landscape]?.classList.add("endpiece") //add endpiece classes to following landscape imgs(not have a portrait to partner with)

					if (!images.landscape[imagesUsed.landscape + 1] && !images.square[imagesUsed.square]) {
						images.landscape[imagesUsed.landscape]?.classList.add("last")
					}
				}

				if (
					images.portrait[imagesUsed.portrait - 1] && //since imagesUse[0] is also ++d if its undefined you have to check for the one before as well
					html.length % 2 == 0 //the count has to be even (othervise the last two were prtraits anyway so everything looks fine)
				) { //cant even explain, hav fun re learing //stupid fuck I understand now :)
					images.landscape[imagesUsed.landscape]?.classList.add("krueppel", "endpiece")
				}
				imagesUsed.portrait = 99999
			}

			//actually selects and adds next image
			image = images[nextup][imagesUsed[nextup]]
			if (image) {
				html.push(image)
			}

			imagesUsed[nextup]++

			//every thrid one has the option to display squares
			if ((i + 2) % 3 == 0 && images.square[imagesUsed.square] && images.square[imagesUsed.square + 1]) {
				for (let i = 0; i < 2; i++) {
					html.push(images.square[imagesUsed.square])
					imagesUsed.square++
				}
			}
		}

		//adds all remaining squares
		while (images.square[imagesUsed.square]) {
			html.push(images.square[imagesUsed.square])
			imagesUsed.square++
		}

		/* document.querySelectorAll("div[data-index]").forEach((elem)=>{
            changeImage(elem, true)
            setTimeout(function(){
                changeImage(elem, true)
            },300)
        }) */

		container!.innerHTML = ""
		container!.append(...html)
	})
}
function sortBySrc(sortMe: HTMLElement[]){
	sortMe.sort(function (a, b) {
		let aImage = a.querySelector("img") as HTMLImageElement
		let bImage = b.querySelector("img") as HTMLImageElement

		//TODO i dont understand why this works
		if (aImage.src < bImage.src) {
			return -1
		}
		if (aImage.src > bImage.src) {
			return 1
		}
		return 0
	})
	return sortMe
}


//----------- toggle image on click -----------//

let timeOnClick = Date.now();

//loads images into cach
//?not sure if this actually works
//TODO !does not work

/*let imagePreload = []
preloadImage(0)
function preloadImage(pos: number){
	console.log("in");
	let objImage = new Image()
	
	objImage.src = "../img/photoshop/alt/" + altSrcs[pos];
	objImage.onload = ()=>{
		if(pos+1 < altSrcs.length)
		preloadImage(pos+1)
	}

	imagePreload.push(objImage)
}*/

function changeImage(elem: HTMLElement, forcePhone = false){
	let filename = elem.getAttribute("data-filename")

	if(window.innerWidth > 800 && forcePhone === false){ //pc behaviour
		timeOnClick = Date.now()

		elem.addEventListener("mouseup", () => {
				if(Date.now() - timeOnClick > 300){
					elem.parentNode.querySelector("img").src = rootSrcString + filename
				}
				else
					setTimeout(function(){
						elem.parentNode.querySelector("img")!.src = rootSrcString + filename
					}, 300 - (Date.now() - timeOnClick))
				elem.removeEventListener("mouseup", () => {})
		})

		elem.parentNode.querySelector("img").src = rootSrcString + "alt/" + filename;
	}
	else{ //phone behaviour
		if(elem.parentNode.querySelector("img").getAttribute("data-mode") == "0"){
			elem.parentNode.querySelector("img").setAttribute("data-mode", "1")
			elem.parentNode.querySelector("img").src = rootSrcString + filename
		}
		else{
			elem.parentNode.querySelector("img").setAttribute("data-mode", "0")
			elem.parentNode.querySelector("img").src = rootSrcString + "alt/" + filename;
		}
	}
}
