"use strict";
//TODO handle touchscreens
function throttle(callback, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        callback(...args);
    };
}
if (!window.matchMedia("(pointer: coarse)").matches) {
    window.addEventListener("mousemove", throttle((e) => {
        let mouseblob = document.querySelector("div.mouseblob");
        mouseblob.style.left = e.pageX + "px";
        mouseblob.style.top = Math.min(e.pageY, document.body.clientHeight - mouseblob.clientHeight) + "px";
    }, 100));
    console.log("notouch");
}
function showProjectText(headerElem) {
    let projectElement = headerElem.parentElement;
    projectElement.classList.toggle("open");
    projectElement.style.filter = "brightness(115%)";
    setTimeout(() => {
        projectElement.style.filter = "brightness(100%)";
    }, 200);
    setTimeout(() => {
        if (projectElement.classList.contains("open") && window.matchMedia("(pointer: coarse)").matches)
            projectElement.querySelector("h3").scrollIntoView();
    }, 200);
}
const projectData = [
    {
        name: "No Tomorrow",
        type: "Short Film",
        description: "My second short film, created in late 2023 and early 2024. It was my first time writing a proper script and writing and directing dialogue. I also got to use my own camera for the first time and borrowed lighting equipment from our school. It was a leap into the unknown but I learned a ton about filmmaking and the result is a 22 minute long short film I am quite proud of.",
        link: {
            name: "watch the film",
            url: "https://youtu.be/qDVY-5UF4PY?si=AjPJY8Xzmsz3th1Q"
        },
        color: {
            a: "#228D78",
            b: "#ABF658"
        }
    },
    {
        name: "Revenge",
        type: "Short Film",
        description: "My first short film I created with two friends in the span of 2 months for a school project.\n" +
            "We invested over 100 hours each into the planning recording, reshooting and editing of the film. Along the way we learned a lot about how to use the cameras, the gimbal, microphones, lights etc. Aditionally I also taught myself AfterEffects in order to do paint-outs, gun flares and animations.",
        link: {
            name: "watch the video",
            url: "https://www.youtube.com/watch?v=Z6PDqlk2Nf8"
        },
        color: {
            a: "#CD5334",
            b: "#FBBA40"
        }
    },
    {
        name: "Wildlife Photography",
        type: "Image Gallery",
        description: "In 2023 I bought myself a proper full frame camera, in the first place for making films. But I have always loved spending time in nature: so a few months later I got a telephoto lens and started taking pictures of all the animals around us.",
        link: {
            name: "take a look",
            url: "./wildlife/index.html",
            target: "_self"
        },
        color: {
            a: "#669D31",
            b: "#ACBB80"
        }
    },
    {
        name: "Norway 2022",
        type: "Travel Video",
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/knO1qgE0RfI?si=fL8zWNN-pJXoGPlb"
        },
        color: {
            a: "#B782E9",
            b: "#FBD6F3"
        }
    },
    {
        name: "Photoshop",
        type: "Image Gallery",
        description: "I like to create photo manipulations based on stock pictures or my own and add lights, shadows, textures etc.\n" + "Using this technique I create fantasy and Sci-fi themed artwork.",
        link: {
            name: "take a look",
            url: "./photoshop/index.html",
            target: "_self"
        },
        color: {
            a: "#B5347A",
            b: "#FD8BA5"
        }
    },
    {
        name: "Lego Stop Motion",
        type: "School Project",
        description: "A short one minute Lego video that perfectly loops. We tried to make all animations as smooth and possible and perfect the scenery for each shot.\n" +
            "In the end we spent about 16 hours each, just moving minifigures by 3 millimeters and taking a picture. Then we coincidentally got into contact with a retired music professor from Michigan that was willing to create custom music for the video.",
        link: {
            name: "watch the video",
            url: "https://www.youtube.com/watch?v=D0YVtJUaNP4"
        },
        color: {
            a: "#F78E69",
            b: "#F7EF99"
        }
    },
    {
        name: "Gameshow",
        type: "Web App",
        description: "A NodeJS based gameshow which allows you to stream one client to a TV and control the gameshow using your phone. The question-sets will be stored on the server and can easily be customized.\n" +
            "The \"gamemaster\" can add questions to the gameboard, select them, start a timer, add players and assign them scores and more. All actions are displayed by the \"display\" client.",
        link: {
            name: "github.com/elYanuki/Gameshow",
            url: "https://github.com/elYanuki/Gameshow"
        },
        color: {
            a: "#778CC0",
            b: "#DEAEFB"
        }
    },
    {
        name: "PetPal",
        type: "Web App",
        description: "This is a school project from 2022. It is an App that allows animal shelters to manage their animals by storing their data, assigning them to rooms and owners and filtering for animals.\n" +
            "The Frontend is vanilla JavaScript and SCSS, the backend is PHP with MariaDB :/",
        link: {
            name: "github.com/elYanuki/PetPal",
            url: "https://github.com/elYanuki/PetPal"
        },
        color: {
            a: "#72BCCC",
            b: "#B9DEEE"
        }
    }
];
generateProjectElements();
function generateProjectElements() {
    let projectHtml = ``;
    projectData.forEach((project, i) => {
        projectHtml += `
            <div class="project" style="
                --color-a: ${project.color.a}; 
                --color-b: ${project.color.b}; 
                --color-a-contrast: ${overlayBlendMode('#000000', project.color.a)}; 
                --color-b-contrast: ${overlayBlendMode('#000000', project.color.b)};
                --color-mix: ${mixHexColors(project.color.a, project.color.b, 0.2)};
                --color-mix-bright: ${mixHexColors(project.color.a, project.color.b, 0.7)};
            ">
                <div class="header" onclick="showProjectText(this)">
                    <p class="number">${("0" + (i + 1)).slice(-2)}</p>
    
                    <div class="title">
                        <h3>${project.name}</h3>
                        <p class="type">${project.type}</p>
                    </div>
                    
                    <i class="fa-solid fa-angles-right"></i>
                </div>
                <div class="text-container">
                    <p>${project.description}</p>
                    <a href="${project.link.url}" target="${project.link.target || '_blank'}">${project.link.name}</a>
                </div>
                <div class="background" onclick="showProjectText(this)"></div>
            </div>
        `;
    });
    let projectContainer = document.querySelector('main');
    projectContainer.innerHTML = projectHtml;
}
function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace('#', '');
    // Convert to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}
function rgbToHex(color) {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
}
function overlayBlendMode(color1Hex, color2Hex) {
    const color1 = hexToRgb(color1Hex);
    const color2 = hexToRgb(color2Hex);
    const overlay = (base, blend) => {
        return blend <= 0.5 ? 2 * base * blend : 1 - 2 * (1 - base) * (1 - blend);
    };
    const blendedColor = {
        r: Math.round(overlay(color1.r / 255, color2.r / 255) * 255),
        g: Math.round(overlay(color1.g / 255, color2.g / 255) * 255),
        b: Math.round(overlay(color1.b / 255, color2.b / 255) * 255)
    };
    return rgbToHex(blendedColor);
}
function mixHexColors(color1Hex, color2Hex, alpha = 1) {
    // Convert hexadecimal color strings to RGB
    const color1 = hexToRgb(color1Hex);
    const color2 = hexToRgb(color2Hex);
    // Mix the RGB components
    const mixedColor = {
        r: Math.round((color1.r + color2.r) / 2),
        g: Math.round((color1.g + color2.g) / 2),
        b: Math.round((color1.b + color2.b) / 2)
    };
    // Convert the mixed RGB color back to hexadecimal
    return `rgba(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b}, ${alpha})`;
}
let copyinfoelem = document.querySelector('#copyinfo');
function copy(elem, name, username) {
    navigator.clipboard.writeText(username);
    copyinfo(name + " copied to clipboard", elem);
}
let copyOut;
function copyinfo(text, elem) {
    copyinfoelem.innerText = text;
    let boundingBox = elem.getBoundingClientRect();
    if (window.innerWidth > 800) {
        copyinfoelem.style.top = boundingBox.top + 40 + window.scrollY + "px";
        copyinfoelem.style.left = boundingBox.left + boundingBox.width / 2 + "px";
    }
    else {
        copyinfoelem.style.top = window.innerHeight - copyinfoelem.clientHeight - 30 + "px";
        copyinfoelem.style.left = window.innerWidth / 2 + boundingBox.width / 2 + "px";
    }
    copyinfoelem.style.opacity = "1";
    clearTimeout(copyOut);
    copyOut = setTimeout(() => {
        copyinfoelem.style.opacity = "0";
    }, 1000);
}
