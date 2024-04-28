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
window.addEventListener("mousemove", throttle(function (e) {
    var mouseblob = document.querySelector("div.mouseblob");
    mouseblob.style.left = e.pageX + "px";
    mouseblob.style.top = Math.min(e.pageY, document.body.clientHeight - mouseblob.clientHeight) + "px";
}, 100));
function showProjectText(headerElem) {
    var projectElement = headerElem.parentElement;
    projectElement.classList.toggle("open");
}
var projectData = [
    {
        name: "No Tomorrow",
        type: "Short Film",
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/knO1qgE0RfI?si=fL8zWNN-pJXoGPlb"
        },
        color: {
            a: "#228D78",
            b: "#ABF658"
        }
    },
    {
        name: "Revenge",
        type: "Short Film",
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/knO1qgE0RfI?si=fL8zWNN-pJXoGPlb"
        },
        color: {
            a: "#CD5334",
            b: "#FBBA40"
        }
    },
    {
        name: "Wildlife Photography",
        type: "Image Gallery",
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "take a look",
            url: "#"
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
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/knO1qgE0RfI?si=fL8zWNN-pJXoGPlb"
        },
        color: {
            a: "#B5347A",
            b: "#FD8BA5"
        }
    },
    {
        name: "Lego Stop Motion",
        type: "School Project",
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/knO1qgE0RfI?si=fL8zWNN-pJXoGPlb"
        },
        color: {
            a: "#F78E69",
            b: "#F7EF99"
        }
    },
    {
        name: "Gameshow",
        type: "Web App",
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/knO1qgE0RfI?si=fL8zWNN-pJXoGPlb"
        },
        color: {
            a: "#778CC0",
            b: "#DEAEFB"
        }
    },
    {
        name: "PetPal",
        type: "Web App",
        description: "In the summer of 2022 my family and me visited Norway with our small camping van. We got there by ferry and drove around the southern part of the country for 3 weeks. I recorded hours of video footage of the trip and cut it down to 15 minutes. Of course, I also added music, voiceovers, titels, color correction, etc. resulting in a nice video documentary of our journey.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/knO1qgE0RfI?si=fL8zWNN-pJXoGPlb"
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
        projectHtml += "\n            <div class=\"project\" style=\"\n                --color-a: ".concat(project.color.a, "; \n                --color-b: ").concat(project.color.b, "; \n                --color-a-contrast: ").concat(overlayBlendMode('#000000', project.color.a), "; \n                --color-b-contrast: ").concat(overlayBlendMode('#000000', project.color.b), "\n            \">\n                <div class=\"header\" onclick=\"showProjectText(this)\">\n                    <p class=\"number\">").concat(("0" + (i + 1)).slice(-2), "</p>\n    \n                    <div class=\"title\">\n                        <h3>").concat(project.name, "</h3>\n                        <p class=\"type\">").concat(project.type, "</p>\n                    </div>\n                    \n                    <i class=\"fa-solid fa-angles-right\"></i>\n                </div>\n                <div class=\"text-container\">\n                    <p>").concat(project.description, "</p>\n                    <a href=\"").concat(project.link.url, "\" target=\"_blank\">").concat(project.link.name, "</a>\n                </div>\n                <div class=\"background\" onclick=\"showProjectText(this)\"></div>\n            </div>\n        ");
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
