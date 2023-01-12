let images = [
	[],
	[],
	[],
]

let imagesUsed = [0,0,0]

let allImagesDone = []

imgSrcs.forEach(item => {
		let img = new Image()
		img.src = item

		let div = document.createElement("div")
	

		allImagesDone.push(new Promise((resolve, reject) => {
			img.onload = function(){
				div.appendChild(img)
				if(img.height > img.width * 1.1){ //portrait
					div.classList.add("span-h-2")
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

Promise.all(allImagesDone).then(() => {
	images[0] = sortBySrc(images[0])
	images[1] = sortBySrc(images[1])
	images[2] = sortBySrc(images[2])

	for (let i = 0; i < imgSrcs.length; i++) {
		let image
		let nextup = i%2

		if(!images[nextup][imagesUsed[nextup]]) { //array of selected images (landscape, portrait, square) is used up (pos is undefined)
			nextup = (i+1)%2 //swapping from 1 to 0 or the other way round
		}

		if((i+1)%3 == 0 && images[2][imagesUsed[2]] && images[2][imagesUsed[2]+1]){
			html.push(images[2][imagesUsed[2]])
			imagesUsed[2]++

			html.push(images[2][imagesUsed[2]])
			imagesUsed[2]++
		}

		image = images[nextup][imagesUsed[nextup]]
		imagesUsed[nextup]++
		
		if(image){
			html.push(image)
		}
	}

	html
	console.log(html);

	for (let i = 0; i < html.length; i++) {
		if(i%4 == 0 && html[i+1]){
			let temp = html[i]
			html[i] = html[i+1]
			html[i+1] = temp
		}
	}

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