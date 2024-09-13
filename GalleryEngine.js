"use strict";
class Gallery {
    constructor(container, rootSrc, galleryImages) {
        this.rootSrcString = "";
        this.images = {
            portrait: [],
            landscape: [],
            square: []
        };
        this.imagesUsed = {
            portrait: 0,
            landscape: 0,
            square: 0
        };
        this.timeOnClick = Date.now();
        this.container = container;
        this.galleryImages = galleryImages;
        this.rootSrcString = rootSrc;
        this.container.innerHTML = `
			<div class="span-v-4 loading"></div>
			<div class="span-v-2 loading"></div>
			<div class="span-v-2 loading"></div>
			<div class="span-v-4 loading"></div>
		`;
        this.loadImage(0);
    }
    loadImage(position) {
        if (position >= this.galleryImages.length)
            return;
        let img = new Image();
        img.src = this.rootSrcString + this.galleryImages[position].src;
        img.onload = () => {
            this.classifyGalleryImage(img, this.galleryImages[position]);
            this.generateGallery();
            this.loadImage(position + 1);
        };
    }
    classifyGalleryImage(img, imageData) {
        let div = document.createElement("div");
        if (imageData.alt == true) { //alternate is provided for that image - add toggle eye icon
            div.innerHTML += `<div data-filename="${imageData.src}" data-mode="0" class="swap" onmousedown="changeImage(this)" title="click to see before/after"><i class="fa-solid fa-eye"></i></div>`;
        }
        div.appendChild(img);
        if (img.height > img.width * 1.1) { //portrait
            div.classList.add("span-v-2");
            this.images.portrait.push(div);
        }
        else if (img.width > img.height * 1.1) { //landscape
            div.classList.add("span-v-4");
            this.images.landscape.push(div);
        }
        else { // "square"
            div.classList.add("span-v-3");
            this.images.square.push(div);
        }
    }
    generateGallery() {
        var _a, _b, _c;
        let html = [];
        this.images.landscape = this.sortBySrc(this.images.landscape);
        this.images.portrait = this.sortBySrc(this.images.portrait);
        this.images.square = this.sortBySrc(this.images.square);
        this.imagesUsed = {
            portrait: 0,
            landscape: 0,
            square: 0
        };
        let nextSelect = 0; //counter from 0 to 3 - used to push images in the order 0110011001100
        for (let i = 0; i < this.images.portrait.length + this.images.square.length + this.images.landscape.length; i++) {
            let image;
            let nextup = "portrait";
            if ([2, 1].includes(nextSelect)) {
                nextup = "portrait";
            }
            else if ([0, 3].includes(nextSelect)) {
                nextup = "landscape";
            }
            nextSelect = (nextSelect + 1) % 4;
            if (!this.images[nextup][this.imagesUsed[nextup]]) { //array of selected images (landscape, portrait) is used up (pos is undefined)
                nextup = nextup == "portrait" ? "landscape" : "portrait"; //switch to the other image type
            }
            if (this.imagesUsed.portrait > 0 && !this.images.portrait[this.imagesUsed.portrait - 1]) { //imageUsedcount is positiv(first check could be -1) && no portraits are left - add square class
            }
            if (!this.images.portrait[this.imagesUsed.portrait]) {
                if (!this.images.portrait[this.imagesUsed.portrait - 1]) { //no more portrait images left
                    (_a = this.images.landscape[this.imagesUsed.landscape]) === null || _a === void 0 ? void 0 : _a.classList.add("endpiece"); //add endpiece classes to following landscape imgs(not have a portrait to partner with)
                    if (!this.images.landscape[this.imagesUsed.landscape + 1] && !this.images.square[this.imagesUsed.square]) {
                        (_b = this.images.landscape[this.imagesUsed.landscape]) === null || _b === void 0 ? void 0 : _b.classList.add("last");
                    }
                }
                if (this.images.portrait[this.imagesUsed.portrait - 1] && //since imagesUse[0] is also ++d if its undefined you have to check for the one before as well
                    html.length % 2 == 0 //the count has to be even (othervise the last two were prtraits anyway so everything looks fine)
                ) { //cant even explain, hav fun re learing //stupid fuck I understand now :)
                    (_c = this.images.landscape[this.imagesUsed.landscape]) === null || _c === void 0 ? void 0 : _c.classList.add("krueppel", "endpiece");
                }
                this.imagesUsed.portrait = 99999;
            }
            //actually selects and adds next image
            image = this.images[nextup][this.imagesUsed[nextup]];
            if (image) {
                html.push(image);
            }
            this.imagesUsed[nextup]++;
            //every thrid one has the option to display squares
            if ((i + 2) % 3 == 0 && this.images.square[this.imagesUsed.square] && this.images.square[this.imagesUsed.square + 1]) {
                for (let i = 0; i < 2; i++) {
                    html.push(this.images.square[this.imagesUsed.square]);
                    this.imagesUsed.square++;
                }
            }
        }
        //adds all remaining squares
        while (this.images.square[this.imagesUsed.square]) {
            html.push(this.images.square[this.imagesUsed.square]);
            this.imagesUsed.square++;
        }
        if (this.images.portrait.length + this.images.square.length + this.images.landscape.length < this.galleryImages.length) {
            do {
                let div = document.createElement("div");
                div.classList.add(...["span-v-2", "loading"]);
                html.push(div);
            } while (html.length < 4);
        }
        this.container.innerHTML = "";
        this.container.append(...html);
    }
    sortBySrc(sortMe) {
        sortMe.sort(function (a, b) {
            let aImage = a.querySelector("img");
            let bImage = b.querySelector("img");
            //TODO i dont understand why this works
            if (aImage.src < bImage.src) {
                return -1;
            }
            if (aImage.src > bImage.src) {
                return 1;
            }
            return 0;
        });
        return sortMe;
    }
    changeImage(elem, forcePhone = false) {
        let filename = elem.getAttribute("data-filename");
        if (window.innerWidth > 800 && forcePhone === false) { //pc behaviour
            this.timeOnClick = Date.now();
            elem.addEventListener("mouseup", () => {
                if (Date.now() - this.timeOnClick > 300) {
                    elem.parentNode.querySelector("img").src = this.rootSrcString + filename;
                }
                else
                    setTimeout(() => {
                        elem.parentNode.querySelector("img").src = this.rootSrcString + filename;
                    }, 300 - (Date.now() - this.timeOnClick));
                elem.removeEventListener("mouseup", () => {
                });
            });
            elem.parentNode.querySelector("img").src = this.rootSrcString + "alt/" + filename;
        }
        else { //phone behaviour
            if (elem.parentNode.querySelector("img").getAttribute("data-mode") == "0") {
                elem.parentNode.querySelector("img").setAttribute("data-mode", "1");
                elem.parentNode.querySelector("img").src = this.rootSrcString + filename;
            }
            else {
                elem.parentNode.querySelector("img").setAttribute("data-mode", "0");
                elem.parentNode.querySelector("img").src = this.rootSrcString + "alt/" + filename;
            }
        }
    }
}
