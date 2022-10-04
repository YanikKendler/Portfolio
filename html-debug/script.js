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

/* let hoverCards = document.querySelectorAll('.hover-card');
let mainCards = document.querySelectorAll('.main-card');

document.addEventListener('mousemove', function(e) {
  ///default movement
  let xAxisDef = (e.pageX - window.innerWidth/2) / 30;
  let yAxisDef = (e.pageY - window.innerHeight/2) / 35;

  hoverCards.forEach(element => {
    if(Math.abs(element.getBoundingClientRect().top - window.scrollY) < window.innerHeight)
    element.style.transform = `rotateY(${xAxisDef}deg) rotateX(${yAxisDef}deg)`;
  });

  ///text box - little movement
  let xAxisSmall = (e.pageX - window.innerWidth/2) / 90;
  let yAxisSmall = (e.pageY - window.innerHeight/2) / 40;

  mainCards.forEach(element => {
    if(Math.abs(element.getBoundingClientRect().top - window.scrollY) < window.innerHeight)
      element.style.transform = `rotateY(${xAxisSmall}deg) rotateX(${yAxisSmall}deg)`;
  });
}); */

//----------- animate on scroll -----------//
let sections = document.querySelectorAll("section");

//makes content appear from the sides as its scrolled to
function animateScroll() {
  for (let i = 0; i < sections.length; i++) {//iterates over every section
    let secTop = sections[i].getBoundingClientRect().top;

    if (secTop < window.innerHeight) { //if section is visible onscreen
      let elems = sections[i].querySelectorAll('.cbox') //gets all content boxes to be animated
      elems.forEach(element => { //assignes all content boxes the active class
        element.classList.add("active");
      });
    }
  }
}
/* 
window.addEventListener("scroll", animateScroll);

animateScroll() //trigger on page load


createNav() */
