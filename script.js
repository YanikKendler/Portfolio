//TODO handle touchscreens
function throttle(callback, delay) {
    var lastCall = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        callback.apply(void 0, args);
    };
}
if (!window.matchMedia("(pointer: coarse)").matches) {
    window.addEventListener("mousemove", throttle(function (e) {
        var mouseblob = document.querySelector("div.mouseblob");
        mouseblob.style.left = e.pageX + "px";
        mouseblob.style.top = Math.min(e.pageY, document.body.clientHeight - mouseblob.clientHeight) + "px";
    }, 100));
    console.log("notouch");
}
function showProjectText(headerElem) {
    var projectElement = headerElem.parentElement;
    projectElement.classList.toggle("open");
    projectElement.style.filter = "brightness(115%)";
    setTimeout(function () {
        projectElement.style.filter = "brightness(100%)";
    }, 200);
    setTimeout(function () {
        if (projectElement.classList.contains("open") && window.matchMedia("(pointer: coarse)").matches)
            projectElement.querySelector("h3").scrollIntoView();
    }, 200);
}
var projectData = [
    /*{
        name: "No Tomorrow",
        type: "Short Film",
        description: "My second short film, created in late 2023 and early 2024. It was my first time writing a proper script and writing and directing dialogue. I also got to use my own camera for the first time and borrowed a lighting equipment from our school. Text missing",
        link: {
            name: "watch the video",
            url: "https://www.youtube.com/watch?v=knO1qgE0RfI"
        },
        color: {
            a: "#228D78",
            b: "#ABF658"
        }
    },*/
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
    /*{
        name: "Wildlife Photography",
        type: "Image Gallery",
        description: "In 2023 i bought myself a proper full frame camera, in the first place for making films but then I started to ",
        link: {
            name: "take a look",
            url: "#",
            target: "_self"
        },
        color: {
            a: "#669D31",
            b: "#ACBB80"
        }
    },*/
    {
        name: "Norway 2022",
        type: "Travel Video",
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/knO1qgE0RfI?si=fL8zWNN-pJXoGPlb"
        },
        color: {
            /*a: "#B782E9",
            b: "#FBD6F3"*/
            a: "#669D31",
            b: "#ACBB80"
        }
    },
    {
        name: "Photoshop",
        type: "Image Gallery",
        description: "I like to create photo manipulations based on stock pictures or my own and add lights, shadows, textures etc.\n" + "Using this technique I create fantasy and Sci-fi themed artwork.",
        link: {
            name: "take a look",
            url: "./gallery/index.html",
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
    var projectHtml = "";
    projectData.forEach(function (project, i) {
        projectHtml += "\n            <div class=\"project\" style=\"\n                --color-a: ".concat(project.color.a, "; \n                --color-b: ").concat(project.color.b, "; \n                --color-a-contrast: ").concat(overlayBlendMode('#000000', project.color.a), "; \n                --color-b-contrast: ").concat(overlayBlendMode('#000000', project.color.b), ";\n                --color-mix: ").concat(mixHexColors(project.color.a, project.color.b, 0.2), ";\n                --color-mix-bright: ").concat(mixHexColors(project.color.a, project.color.b, 0.7), ";\n            \">\n                <div class=\"header\" onclick=\"showProjectText(this)\">\n                    <p class=\"number\">").concat(("0" + (i + 1)).slice(-2), "</p>\n    \n                    <div class=\"title\">\n                        <h3>").concat(project.name, "</h3>\n                        <p class=\"type\">").concat(project.type, "</p>\n                    </div>\n                    \n                    <i class=\"fa-solid fa-angles-right\"></i>\n                </div>\n                <div class=\"text-container\">\n                    <p>").concat(project.description, "</p>\n                    <a href=\"").concat(project.link.url, "\" target=\"").concat(project.link.target || '_blank', "\">").concat(project.link.name, "</a>\n                </div>\n                <div class=\"background\" onclick=\"showProjectText(this)\"></div>\n            </div>\n        ");
    });
    var projectContainer = document.querySelector('main');
    projectContainer.innerHTML = projectHtml;
}
function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace('#', '');
    // Convert to RGB
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return { r: r, g: g, b: b };
}
function rgbToHex(color) {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
}
function overlayBlendMode(color1Hex, color2Hex) {
    var color1 = hexToRgb(color1Hex);
    var color2 = hexToRgb(color2Hex);
    var overlay = function (base, blend) {
        return blend <= 0.5 ? 2 * base * blend : 1 - 2 * (1 - base) * (1 - blend);
    };
    var blendedColor = {
        r: Math.round(overlay(color1.r / 255, color2.r / 255) * 255),
        g: Math.round(overlay(color1.g / 255, color2.g / 255) * 255),
        b: Math.round(overlay(color1.b / 255, color2.b / 255) * 255)
    };
    return rgbToHex(blendedColor);
}
function mixHexColors(color1Hex, color2Hex, alpha) {
    if (alpha === void 0) { alpha = 1; }
    // Convert hexadecimal color strings to RGB
    var color1 = hexToRgb(color1Hex);
    var color2 = hexToRgb(color2Hex);
    // Mix the RGB components
    var mixedColor = {
        r: Math.round((color1.r + color2.r) / 2),
        g: Math.round((color1.g + color2.g) / 2),
        b: Math.round((color1.b + color2.b) / 2)
    };
    // Convert the mixed RGB color back to hexadecimal
    return "rgba(".concat(mixedColor.r, ", ").concat(mixedColor.g, ", ").concat(mixedColor.b, ", ").concat(alpha, ")");
}
var copyinfoelem = document.querySelector('#copyinfo');
function copy(elem, name, username) {
    navigator.clipboard.writeText(username);
    copyinfo(name + " copied to clipboard", elem);
}
var copyOut;
function copyinfo(text, elem) {
    copyinfoelem.innerText = text;
    var boundingBox = elem.getBoundingClientRect();
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
    copyOut = setTimeout(function () {
        copyinfoelem.style.opacity = "0";
    }, 1000);
}
