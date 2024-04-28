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

window.addEventListener("mousemove", throttle((e) => {
    let mouseblob = document.querySelector("div.mouseblob") as HTMLElement;
    mouseblob.style.left = e.pageX + "px";
    mouseblob.style.top = Math.min(e.pageY, document.body.clientHeight - mouseblob.clientHeight) + "px";
}, 100));

function showProjectText(headerElem: HTMLElement){
    let projectElement = headerElem.parentElement
    projectElement.classList.toggle("open")
}

interface Project {
    name: string,
    type: string,
    description: string,
    link: {
        name: string,
        url: string
    }
    color: {
        a: string,
        b: string
    }
}

const projectData: Project[] = [
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
]

generateProjectElements()
function generateProjectElements(){
    let projectHtml = ``
    projectData.forEach((project, i) => {
        projectHtml += `
            <div class="project" style="
                --color-a: ${project.color.a}; 
                --color-b: ${project.color.b}; 
                --color-a-contrast: ${overlayBlendMode('#000000', project.color.a)}; 
                --color-b-contrast: ${overlayBlendMode('#000000', project.color.b)}
            ">
                <div class="header" onclick="showProjectText(this)">
                    <p class="number">${("0" + (i+1)).slice(-2)}</p>
    
                    <div class="title">
                        <h3>${project.name}</h3>
                        <p class="type">${project.type}</p>
                    </div>
                    
                    <i class="fa-solid fa-angles-right"></i>
                </div>
                <div class="text-container">
                    <p>${project.description}</p>
                    <a href="${project.link.url}" target="_blank">${project.link.name}</a>
                </div>
                <div class="background" onclick="showProjectText(this)"></div>
            </div>
        `
    })
    let projectContainer = document.querySelector('main') as HTMLElement
    projectContainer.innerHTML = projectHtml
}

interface RGBColor {
    r: number;
    g: number;
    b: number;
}

function hexToRgb(hex: string): RGBColor {
    // Remove '#' if present
    hex = hex.replace('#', '');

    // Convert to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

function rgbToHex(color: RGBColor): string {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
}

function overlayBlendMode(color1Hex: string, color2Hex: string): string {
    const color1 = hexToRgb(color1Hex);
    const color2 = hexToRgb(color2Hex);

    const overlay = (base: number, blend: number) => {
        return blend <= 0.5 ? 2 * base * blend : 1 - 2 * (1 - base) * (1 - blend);
    };

    const blendedColor = {
        r: Math.round(overlay(color1.r / 255, color2.r / 255) * 255),
        g: Math.round(overlay(color1.g / 255, color2.g / 255) * 255),
        b: Math.round(overlay(color1.b / 255, color2.b / 255) * 255)
    };

    return rgbToHex(blendedColor);
}
