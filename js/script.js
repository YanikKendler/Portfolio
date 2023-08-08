let size = "full"
window.addEventListener("resize", () => {
  if(window.innerWidth < 800 && size != "small"){
    size = "small"
    console.log(size);
  }
  else if(window.innerWidth > 800 && window.innerWidth < 1200 && size != "mid"){
    size = "mid"
    console.log(size);
  }
  else if(window.innerWidth > 1200 && size != "full"){
    size = "full"
    console.log(size);
  }
})

objImage = new Image();

//----------- generate nav -----------//

//#region 

const nav = document.querySelector('nav')

let navtext = ["about", "projects", "skills"]
let navSpanHtml = ""

function createNav(){
  scrollTo(0,0)

  setTimeout(function(){
  //creates span tags containg individual letters of the headings
  for (let i = 0; i < navtext.length; i++) {
    navSpanHtml += `<a class="navitem" href="#${navtext[i]}"><div>`
      
    for (let j = 0; j < navtext[i].length; j++) {
        navSpanHtml += `<span style="animation-delay: ${j*0.05}s">${navtext[i][j]}</span>`
    }
    navSpanHtml += "</div></a>"
  }

  document.querySelector('nav .headings .main').innerHTML += navSpanHtml //writes spans to main (visible, absoulte positioned) heading
  document.querySelector('nav .headings .guides').innerHTML = navSpanHtml //writes spans to guide(invisible, normal) heading

  let guideSpans = document.querySelectorAll("nav .headings .guides span")
  let spans = document.querySelectorAll("nav .headings .main span")

  ///alignes absolute positioned main spans the same as guides (not on top of each other)
  for (let i = 0; i < guideSpans.length; i++) {
      let rect = guideSpans[i].getBoundingClientRect(); //cbounding rect for current span
      spans[i].style.left = rect.left + 'px';
  }

  let mainDivs = document.querySelectorAll('.headings .main .navitem div')

  for (let i = 0; i < mainDivs.length; i++) { //sets container divs sizes to the right width (copied from guides)
    mainDivs[i].style.width = document.querySelectorAll('.headings .guides .navitem div')[i].clientWidth + "px"
  }
},0)
}

//#endregion

//----------- generate skills -----------//
let skills = [
  {name: "javascript", time: new Date("1-8-2021")},
  {name: "nodejs", time: new Date("1-8-2021")},
  {name: "HTML", time: new Date("1-8-2020")},
  {name: "CSS", time: new Date("1-8-2020")},
  {name: "PHP", time: new Date("1-8-2022")},
  {name: "photoshop", time: new Date("1-1-2019")},
  {name: "premiere", time: new Date("1-8-2021")},
  {name: "aftereffects", time: new Date("1-1-2023")},
  {name: "java", time: new Date("1-8-2020")},
  {name: "sql", time: new Date("1-8-2022")},
]
generateSkills()
function generateSkills(){
  let html = ""
  skills.forEach((skill)=>{
    let relativeTime = new Date(Date.now() - skill.time.getTime())
    html += `<div class="skill animateMe">
                <div class="content">
                    <img src="./img/skills/${skill.name.toLowerCase()}.png" alt="${skill.name}">
                    <p>${relativeTime.getFullYear()-1970 > 0 ? relativeTime.getFullYear()-1970 + " year" + (relativeTime.getFullYear()-1970 > 1 ? "s" : "") :  relativeTime.getMonth() + " months"}</p>
                </div>
            </div>`
  })
  document.querySelector("#skills .container").innerHTML = html
}

//----------- move elements on mouse over -----------//

//#region 
let lastPos = {x:0, y:0}
let removeClass

document.querySelectorAll('.tile:not(.text-box):not(.img-box)').forEach((elem)=>{
  elem.addEventListener('mousemove', function(e) {
    if(lastPos.x > e.clientX+10){ //right to left
      elem.style.setProperty("--x", "-.5rem")
    }
    else if(lastPos.x < e.clientX-10){//left to right
      elem.style.setProperty("--x", ".5rem")
    }
    if(lastPos.y > e.clientY+10){//bottom to top
      elem.style.setProperty("--y", "-.5rem")
    }
    else if(lastPos.y < e.clientY-10){//top to bottom
      elem.style.setProperty("--y", ".5rem")
    }

  	if(elem.classList.contains("hovered")){
    }
    else{
      elem.classList.add("hovered")
      setTimeout(function(){
        elem.classList.remove("hovered")
      },500)
    }

    lastPos.x = e.clientX
    lastPos.y = e.clientY
  });
  elem.addEventListener("mouseleave", () => {
    removeClass = setTimeout(function(){
      elem.style.setProperty("--y", "0rem")
      elem.style.setProperty("--x", "0rem")
    },1000)
  })
})

//#endregion

//----------- animate on scroll -----------//

//#region 

let sections = document.querySelectorAll(".tile-container");
let elemsToAnimate = document.querySelectorAll('.animateMe')

//makes content appear from the sides as its scrolled to
//? would be better done with intersectObserver

function animateScroll() {
  sections.forEach(section => {//iterates over every section
    let secTop = section.getBoundingClientRect().top;
    let secBot = section.getBoundingClientRect().bottom;

    let elems = section.querySelectorAll('.tile') //gets all content boxes to be animated

    if (secTop < window.innerHeight-window.innerHeight/4 && secBot > 0) { //if top bounding box is larger then 0 (top in) but smaller than maximal height(bottom in)
      elems.forEach(element => { //assignes all content boxes the active class
        element.classList.add("active");
      });
    }
  });

  ///singular elems eg. headings
  if(elemsToAnimate)
  elemsToAnimate.forEach(element => {
    let elemTop = element.getBoundingClientRect().top;

    if (elemTop+window.innerHeight/4 < window.innerHeight && elemTop > -window.innerHeight/10) {
      element.classList.add("active")
    }
  });
}

window.addEventListener("scroll", animateScroll);

animateScroll() //trigger on page load

createNav() 

//#endregion

//----------- bouncy box in project header-----------//

//#region 

let bouncyBox = document.querySelector('#projects .header .bouncy')
let bouncyContainer = document.querySelector('#projects .header')
bouncyBox.style.top = "1px"
bouncyBox.style.left = "100px"

let moveX = 4
let moveY = 4

function bounce(){
  let boxtop = parseFloat(bouncyBox.style.top)
  let boxleft = parseFloat(bouncyBox.style.left)

  bouncyBox.style.top = boxtop + moveY + "px"
  bouncyBox.style.left = boxleft + moveX + "px"

  if(boxtop > bouncyContainer.clientHeight - bouncyBox.clientHeight){///bottom collision
    moveY = Math.abs(moveY) * -1
    bouncyBox.style.opacity = Math.random() * 0.4 + 0.2
  }
  else if(boxtop < 0){///top collisison
    moveY = Math.abs(moveY)
    bouncyBox.style.opacity = Math.random() * 0.4 + 0.2
  }

  if(boxleft > bouncyContainer.clientWidth - bouncyBox.clientWidth ){///right collission
    moveX = Math.abs(moveX) * -1
    bouncyBox.style.opacity = Math.random() * 0.4 + 0.2
  }
  else if(boxleft < 0){///left collision
    moveX = Math.abs(moveX)
    bouncyBox.style.opacity = Math.random() * 0.4 + 0.2
  }
}

//speed up and recolor box when clicked
function clickBounce(){
  moveX *= 5
  moveY *= 5
  bouncyBox.style.backgroundColor = "#7aaa72"

  setTimeout(function(){
    moveX /= 5
    moveY /= 5
    bouncyBox.style.backgroundColor = "#7276aa"
},2000)
}

setInterval(bounce, 30)

//#endregion

//----------- resizes sections for mobile view -----------//

//#region 

let toSize = document.querySelectorAll('section:not(#about, #skills)')

function sizeSections(){
  console.log();
  if(window.innerWidth > 800){
    toSize.forEach(element => {
      element.style.height = ""
    });

    document.querySelector("#about").style.height = ""
    return
  }

  toSize.forEach(element => {
    element.style.height = element.querySelector(".text-box").clientHeight + 100 + "px"
  });

  document.querySelector("#about").style.height = document.querySelector("#about .text-box").clientHeight + document.querySelector("#about .img-box").clientHeight + 50 + "px"
}

sizeSections()

window.addEventListener("resize", sizeSections);

//#endregion

//----------- contacts -----------//

//#region
let copyinfoelem = document.querySelector('#copyinfo')

copyText = ["yanik.kendler@gmail.com", "el_Yanuki#9890", "https://github.com/elYanuki"]
copyInfo = ["mail", "discord tag", "github link"]

function copy(type, elem){
  navigator.clipboard.writeText(copyText[type]);
  copyinfo(copyInfo[type] + " coppied to clipboard", elem)
}

let copyOut
function copyinfo(text, elem){
  copyinfoelem.innerText = text

  let boundingBox = elem.getBoundingClientRect()

  copyinfoelem.style.top = boundingBox.top + 40 + window.scrollY + "px"
  copyinfoelem.style.left = boundingBox.left + "px"
  copyinfoelem.style.opacity = "1"

  clearTimeout(copyOut)
  copyOut = setTimeout(function(){
    copyinfoelem.style.opacity = 0
  },1000)
}

//#endregion