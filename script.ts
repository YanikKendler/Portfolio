//TODO handle touchscreens
function throttle(callback: (...args: any) => void, delay: number) {
    let lastCall = 0;
    return function (...args: any) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        callback(...args);
    };
}

if(!window.matchMedia("(pointer: coarse)").matches) {
    window.addEventListener("mousemove", throttle((e: MouseEvent) => {
        let mouseblob = document.querySelector("div.mouseblob") as HTMLElement;
        mouseblob.style.left = e.pageX + "px";
        mouseblob.style.top = Math.min(e.pageY, document.body.clientHeight - mouseblob.clientHeight) + "px";
    }, 100))
    console.log("notouch")
}

function showProjectText(headerElem: HTMLElement){
    let projectElement = headerElem.parentElement
    projectElement.classList.toggle("open")
    projectElement.style.filter = "brightness(115%)"
    setTimeout(() => {
        projectElement.style.filter = "brightness(100%)"
    },200)

    setTimeout(() => {
        if(projectElement.classList.contains("open") && window.matchMedia("(pointer: coarse)").matches)
            projectElement.querySelector("h3").scrollIntoView()
    },200)
}

interface Project {
    name: string,
    type: string,
    description: string,
    link: {
        name: string,
        url: string,
        target?: string
    }
    color: {
        a: string,
        b: string
    }
}

const projectData: Project[] = [
    {
        name: "The Ghost Hunter",
        type: "Short Film",
        description: "This is the first short film that I felt was really well rounded off. With a 9 minute runtime it's the optimal length for a short film, where its not getting boring or overly complicated to make but also gave me enough room to tell a captivating story. With its thriller theme I had to make use of lots of interesting techniques like creating rain, lighting a gasoline fire indoors, 3d printing props and lots of visual effects and compositing tricks.",
        link: {
            name: "watch the film",
            url: "https://youtu.be/hUkpiqK9Qis"
        },
        color: {
            a: "#72BCCC",
            b: "#B9DEEE"
        }
    },
    {
        name: "Shotly",
        type: "Web App",
        description: "A freemium, no AI, open source, shotlist creation tool for filmmakers. I built it solo in about 3 Months and released it publicly in june 2025 - lets see where this goes. Its built with a quarkus backend, nextJS frontend, a graphql API, Auth0 for user authentication and Stripe for payments.",
        link: {
            name: "shotly.at",
            url: "https://shotly.at"
        },
        color: {
            a: "#CD5334",
            b: "#FBBA40"
        }
    },
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
            a: "#d93c36",
            b: "#FB7240"
        }
    },
    {
        name: "Wildlife Photography",
        type: "Image Gallery",
        description: "In 2023 I bought myself a proper full frame camera, in the first place for making films. But I have always loved spending time in nature: so a few months later I got a telephoto lens and started taking pictures of all the animals around us.",
        link: {
            name: "take a look on instagram",
            url: "https://www.instagram.com/yanik.kendler/",
        },
        color: {
            a: "#669D31",
            b: "#ACBB80"
        }
    },
    {
        name: "23 Tage Norwegen",
        type: "Travel Video",
        description: "In the summer of 2024 my family and me visited Norway with our small camping van for 23 Days. I brought my camera along and created a nice, 26 minute video documentation of our Trip. I managed a nice back and forth between calm beauty shots and more exciting adventures like sleeping out in the mountains or going puffin watching by speedboat. This was also the first video I edited in davinci resolve and dove a little deeper into color grading and proper pacing.",
        link: {
            name: "watch the video",
            url: "https://youtu.be/ssFkT_poFdg?si=O7kg-oYM4-5hoGth"
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
        description: "A short one minute Lego video that perfectly loops. We tried to make all animations as smooth as possible and perfect the scenery for each shot.\n" +
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
                --color-b-contrast: ${overlayBlendMode('#000000', project.color.b)};
                --color-mix: ${mixHexColors(project.color.a, project.color.b, 0.2)};
                --color-mix-bright: ${mixHexColors(project.color.a, project.color.b, 0.7)};
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
                    <a href="${project.link.url}" target="${project.link.target || '_blank'}">${project.link.name}</a>
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

function mixHexColors(color1Hex: string, color2Hex: string, alpha = 1) {
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
    return `rgba(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b}, ${alpha})`
}

let copyinfoelem = document.querySelector('#copyinfo') as HTMLElement

function copy(elem: HTMLElement, name: string, username: string){
    navigator.clipboard.writeText(username);
    copyinfo(name + " copied to clipboard", elem)
}

let copyOut: number
function copyinfo(text: string, elem: HTMLElement){
    copyinfoelem.innerText = text

    let boundingBox = elem.getBoundingClientRect()

    if(window.innerWidth > 800) {
        copyinfoelem.style.top = boundingBox.top + 40 + window.scrollY + "px"
        copyinfoelem.style.left = boundingBox.left + boundingBox.width/2 + "px"
    }
    else{
        copyinfoelem.style.top = window.innerHeight - copyinfoelem.clientHeight - 30 + "px"
        copyinfoelem.style.left = window.innerWidth/2 + boundingBox.width/2 + "px"
    }

    copyinfoelem.style.opacity = "1"

    clearTimeout(copyOut)
    copyOut = setTimeout(() =>{
        copyinfoelem.style.opacity = "0"
    },1000)
}

window.addEventListener("resize", sizeImageForSafari)

sizeImageForSafari()
function sizeImageForSafari(){
    let image:HTMLElement = document.querySelector('#picture-yanik')
    let ratio = image.clientHeight / 1440
    image.style.width = 1105 * ratio + "px"
}
