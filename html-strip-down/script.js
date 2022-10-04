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

animateScroll() //trigger on page load
console.log(window.scrollX);
window.addEventListener("scroll", animateScroll);


function resetScrollX(count){
  console.log(window.scrollX);
  window.scroll(window.scrollY,0)

  if(count < 20){
    setTimeout(function(){
      resetScrollX(count+1
    )},0)
  }
}