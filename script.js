 
/**************************************************************************************************************

USE: all functions needet for my portfolio
LINKED FROM: index.html
AUTHOR: Yanik Kendler

***************************************************************************************************************/

const navtexts = document.querySelectorAll(".navitem p")
const navicons = document.querySelectorAll('.navicon')

/*---------- nav hover effects ----------*/

let navOverRunning = []
let navOutRunning = []
const letterdelay = 85
const lettermovement = "1rem"
let out = null

for (let i = 0; i < navtexts.length; i++) {
    let txt = navtexts[i].innerHTML

    let html = ""

    for (let i = 0; i < txt.length; i++) {
       html += `<span>${txt.substring(i,i+1)}</span>`
    }

    navtexts[i].innerHTML = html
    navtexts[i].style.transition = "margin " + letterdelay + "ms ease-in-out" 
    navOverRunning[i] = false
    navOutRunning[i] = false
}   

function navOverEffect(elem){
    let chars = elem.querySelectorAll("span")
    let id = parseInt(elem.dataset.itemnr)

    if(navOverRunning[id] == false && navOutRunning[id] == false){

        for (let i = 0; i < navtexts.length; i++) { //fallback
            if (i != id) {
                navOutEffect(navtexts[i])
            }
        }

        navOverRunning[id] = true

        setTimeout(function(){
            navOverRunning[id] = false
        },letterdelay*chars.length)

        for (let i = chars.length-1; i >= 0; i--) {
            setTimeout(function(){
                chars[i].style.marginLeft = lettermovement
                if(chars[i+1]){
                    chars[i+1].style.marginLeft = 0
                }
            },letterdelay*(chars.length-i))
        }

        setTimeout(function(){
            chars[1].style.marginLeft = 0
        },letterdelay*(chars.length))
    }
}

function navOutEffect(elem){
    let chars = elem.querySelectorAll("span")
    let id = parseInt(elem.dataset.itemnr)

    if( navOutRunning[id] == false){
        let delay = 300

        if(navOverRunning[id] == true){
            console.log("running delayed");
            delay = letterdelay*chars.length
        }
        out = setTimeout(function(){
            navOutRunning[id] = true

            setTimeout(function(){
                navOutRunning[id] = false
            },letterdelay*chars.length)

            for (let i = 0; i < chars.length; i++) {
                setTimeout(function(){
                    chars[i].style.marginLeft = "0rem"
                    if(chars[i+1]){
                        chars[i+1].style.marginLeft = lettermovement
                    }
                },letterdelay*i)
            }
         },delay)
     }
}

/*---------- load content on scroll ----------*/

let page = 0
let noscroll = 0
let pageoffset = 300

let content = [
    {
        "titel": "Hello my name is<br>Yanik",
        "text": "Im a Student at a higher technical collage for IT and media technolgy in Austria"
    },
    {
        "text": "I am currently 16 and two years into my 5 year edu&shy;cation after which I would love to work in the <bold>front end develop&shy;ment or design</bold> branche"
    },
    {
        "titel": "Gameshow",
        "text": "interactiv customizabe gameshow<br>syncs between game controller and display<br>login as player and submit awnsers"
    },
    {
        "titel": "hehe4",
        "text": "huhu4"
    }
]

let categoryPos = {
    "about": 0,
    "projects": 2,
    "skills": 3,
}

//initially loads html for all content pages
let sectionHtml = ""

for (let i = 0; i < content.length; i++) {
    let html = `<section>`

    if(content[i].titel) {html += `<h1>${content[i].titel}</h1>`}
    else{html = `<section class="text-only">`}

    if(content[i].text) {html += `<p>${content[i].text}</p>`}

    if(content[i].img) {html += `<img src="${content[i].img}">`}

    sectionHtml += html + `</section>`
}

document.querySelector('main').innerHTML = sectionHtml

const sections = document.querySelectorAll('main section')

//sets height for invisible elem so that scrolling is possible
document.getElementById('tallboi').style.height = 2.9*pageoffset+window.innerHeight+"px"

setInterval(checkScroll, 100)
loadContent()
setCategorymarker()

function checkScroll(){//checks if the page has been scrolled so much further that its needet to load then next page
    if(noscroll > 0){
        noscroll--
        document.body.scrollTop = pageoffset+pageoffset/2
    }
    else{
        if(document.body.scrollTop > pageoffset*2){ //down
            if(content[page+1]){
                scroll(0)
            }
            else{
                document.body.scrollTop = pageoffset+pageoffset/2
            }
        }
        else if(document.body.scrollTop < pageoffset){ //up
            if(page > 0){
                scroll(1)
            }
            else{
                document.body.scrollTop = pageoffset+pageoffset/2
            }
        }
    }
}

function scroll(updown){ //extra function so that it can be called seperatly
    if(updown == 0 && content[page+1]){ //down
        page++
        console.log("down - page now:", page, "pos:", document.body.scrollTop);
        noscroll = 5
    }
    else if(updown == 1 && page > 0){ //up
        page--
        console.log("up - page now:", page, "pos:", document.body.scrollTop);
        noscroll = 5
    }

    document.body.scrollTop = pageoffset+pageoffset/2
    
    loadContent()        
    setCategorymarker()
}

function loadContent(){
    for (let i = 0; i < sections.length; i++) {
        if(i<page){
            sections[i].style = "top: -100%;opacity:0"
        }
        else if(i == page){
            sections[i].style = "top: 50%;transform: translateY(-50%);opacity:1"
        }
        else{
            sections[i].style = "top: 100%;opacity:0"
        }
    }
}

function setCategorymarker(){
    navicons.forEach(elem => {
        elem.querySelector("div").style.opacity = 0
    })  

    if(page >= categoryPos.skills){
        navicons[2].querySelector("div").style.opacity = 1
    }
    else if(page >= categoryPos.projects){
        navicons[1].querySelector("div").style.opacity = 1
    }
    else if(page >= categoryPos.about){
        navicons[0].querySelector("div").style.opacity = 1
    }
}

function scrollToPage(pg){
    let amount = page-pg
    
    if(amount > 0){
        for (let i = 0; i < amount; i++) {
            setTimeout(function(){
                scroll(1)
                console.log(Date.now());
            },i*100)
        }
    }
    else{
        for (let i = amount; i < 0; i++) {
            setTimeout(function(){
                scroll(0)
                console.log(Date.now());
            },Math.abs(i*100))
        }
    }

    setCategorymarker()
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') { //up
        scroll(1)
    }
    else if (e.keyCode == '40') { //down
        scroll(0)
    }

}