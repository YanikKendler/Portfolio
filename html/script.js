const nav = document.querySelector('nav')

//----------- nav -----------//

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

//----------- rotate elements on mouse move -----------//

let hoverCards = document.querySelectorAll('.hover-card');
let mainCards = document.querySelectorAll('.main-card');

document.addEventListener('mousemove', function(e) {
  ///default movement
  let xAxisDef = (e.pageX - window.innerWidth/2) / 40;
  let yAxisDef = (e.pageY - window.innerHeight/2 - window.scrollY) / 50;

  hoverCards.forEach(element => {
    if(Math.abs(element.getBoundingClientRect().top - window.scrollY) < window.innerHeight)
    element.style.transform = `rotateY(${xAxisDef}deg) rotateX(${yAxisDef}deg)`;
  });

  ///text box - little movement
  let xAxisSmall = (e.pageX - window.innerWidth/2) / 90;
  let yAxisSmall = (e.pageY - window.innerHeight/2 - window.scrollY) / 40;

  mainCards.forEach(element => {
    if(Math.abs(element.getBoundingClientRect().top - window.scrollY) < window.innerHeight)
      element.style.transform = `rotateY(${xAxisSmall}deg) rotateX(${yAxisSmall}deg)`;
  });
});

//----------- animate on scroll -----------//
let sections = document.querySelectorAll(".tile-container");
let elemsToAnimate = document.querySelectorAll('.animateMe')

//makes content appear from the sides as its scrolled to
function animateScroll() {
  for (let i = 0; i < sections.length; i++) {//iterates over every section
    let secTop = sections[i].getBoundingClientRect().top;

    let elems = sections[i].querySelectorAll('.tile') //gets all content boxes to be animated

    if (secTop < window.innerHeight && secTop > -window.innerHeight/2) { //if section is visible onscreen
      elems.forEach(element => { //assignes all content boxes the active class
        element.classList.add("active");
      });
    }
    else{
      elems.forEach(element => { //assignes all content boxes the active class
        element.classList.remove("active");
      });
    }

  }

  if(elemsToAnimate)
  elemsToAnimate.forEach(element => {
    let elemTop = element.getBoundingClientRect().top;

    if (elemTop+window.innerHeight/4 < window.innerHeight && elemTop > -window.innerHeight/10) { //if section is visible onscreen
      element.classList.add("active")
    }
    else{
      element.classList.remove("active")
    }
  });
}

window.addEventListener("scroll", animateScroll);

animateScroll() //trigger on page load

createNav() 

//----------- bouncy box -----------//

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