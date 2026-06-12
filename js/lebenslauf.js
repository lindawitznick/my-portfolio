document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("timeline-container");
    if (!container) return;

    fetch("lebenslauf.json")
        .then(response => response.json())
        .then(data => {
            container.innerHTML = "";

            const svgHTML = `                                                           
                  <div class="svg-wrapper">
                    <svg id="timeline-svg">
                        <defs>
                            <linearGradient id="timeline-linear-glow" x1="50%" y1="0" x2="50%" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stop-color="#a19273" stop-opacity="0" /> 
                                <stop offset="70%" stop-color="#a19273" stop-opacity="0.3" /> 
                                <stop offset="100%" stop-color="#a19273" stop-opacity="1" />
                            </linearGradient>
                        </defs>
                        <path id="svg-bg-path" fill="none" stroke="#a1927346" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path id="svg-fill-path" fill="none" stroke="url(#timeline-linear-glow)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', svgHTML);

            data.forEach((item, index) => {
                const itemDiv = document.createElement("div");
                itemDiv.className = `timeline-item ${item.seite}`;

                itemDiv.id = item.id || `lebenslauf-${index}`;

const beschreibungHTML = item.beschreibung.length > 0
    ? `<ul class="timeline-bullets">
        ${item.beschreibung.map(absatz => {
            let textInhalt = absatz.text || "";

        
             if (absatz.highlight) {
                
                const subTextHTML = absatz.subText 
                    ? `<span class="sub-text">${absatz.subText}</span>` 
                    : '';

                const highlightHTML = `
                    <span class="highlight-container">
                        <span class="main-word">${absatz.highlight}</span>
                        ${subTextHTML}
                    </span>
                `.trim();
                
                textInhalt = textInhalt.replace(absatz.highlight, highlightHTML);
            }

            return `<li>${textInhalt}</li>`;
        }).join('')}
       </ul>`
    : '';

                itemDiv.innerHTML = `                                                       
                    <div class="timeline-content">
                        <div class="timeline-back">
                            <p>${item.datum}</p>
                            <h1>${item.titel}</h1>
                            <h2>${item.ort}</h2>
                            ${beschreibungHTML}
                        </div>
                    </div>                                                              
                `;

                container.appendChild(itemDiv);
            });
            drawZickZackLine();
            initTimelineObserver();
        })

        .catch(error => console.error("Fehler beim Laden der JSON-Datei:", error));
});

function drawZickZackLine() {
    const container = document.getElementById("timeline-container");
    const items = document.querySelectorAll(".timeline-item");
    const bgPath = document.getElementById("svg-bg-path");
    const fillPath = document.getElementById("svg-fill-path");


    if (!container || items.length === 0 || !bgPath || !fillPath) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const centerX = containerWidth / 2;

    let d = `M ${centerX} 0`;                                                   //Startpunkt obere Mitte

    items.forEach((item) => {
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        const itemBottom = itemTop + itemHeight;

        const r = 15;                                                               //Radius für Ecken

        if (item.classList.contains("left")) {
            const boxLeft = item.offsetLeft - 15;


            d += ` L ${centerX} ${itemTop - 20}`;                                  //vom Startpunkt zum Start des linken Containers
            d += ` A ${r} ${r} 0 0 0 ${centerX} ${itemTop - 20}`;                  //Kurve oben rechts nach links
            d += ` L ${boxLeft + r} ${itemTop - 20}`;                              //gerade zum linken Containerende
            d += ` A ${r} ${r} 0 0 0 ${boxLeft} ${itemTop - 20 + r}`;              //abbiegen oben links und in der Kurve nach unten
            d += ` L ${boxLeft} ${itemBottom + 20 - r}`;                           //fährt am Container links nach unten
            d += ` A ${r} ${r} 0 0 0 ${boxLeft + r} ${itemBottom + 20}`;           //abbiegen unten links und in die Kurve nach rechts
            d += ` L ${centerX} ${itemBottom + 20}`;                               //gerade Linie in die Mitte (nach rechts)

        } else {

            const boxRight = item.offsetLeft + item.offsetWidth + 15;


            d += ` A ${r} ${r} 0 0 1 ${centerX} ${itemTop - 20}`;                  //Kurve oben links nach rechts
            d += ` L ${boxRight - r} ${itemTop - 20}`;                             //gerade zum rechten Containerende
            d += ` A ${r} ${r} 0 0 1 ${boxRight} ${itemTop - 20 + r}`;             //abbiegen oben rechts und in der Kurve nach unten
            d += ` L ${boxRight} ${itemBottom + 20 - r}`;                          //fährt am Container rechts nach unten
            d += ` A ${r} ${r} 0 0 1 ${boxRight - r} ${itemBottom + 20}`;          //abbiegen unten rechts und in die Kurve nach links   
            d += ` L ${centerX} ${itemBottom + 20}`;                               //gerade Linie in die Mitte (nach links)
        }
    });

    const lastItem = items[items.length - 1];
    if (lastItem) {
        const lastItemBottom = lastItem.offsetTop + lastItem.offsetHeight;
        d += ` L ${centerX} ${lastItemBottom + 20}`;
        d += ` L ${centerX} ${containerHeight}`;
    }

    bgPath.setAttribute("d", d);
    fillPath.setAttribute("d", d);


    const pathLength = fillPath.getTotalLength();
    fillPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    fillPath.style.strokeDashoffset = pathLength;
    let targetPercent = 0;
    let currentPercent = 0;
    let isAnimating = false;


    window.addEventListener("scroll", () => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const visibleTop = Math.max(0, (windowHeight / 2) - rect.top);

        targetPercent = visibleTop / rect.height;
        targetPercent = Math.min(Math.max(targetPercent, 0), 1);

        if (!isAnimating) {
            isAnimating = true;
            smoothLineScroll();
        }
    });
    function smoothLineScroll() {
        const easingFactor = 0.06;

        const diff = targetPercent - currentPercent;
        currentPercent += diff * easingFactor;

        const liveLength = fillPath.getTotalLength();

        if (liveLength > 0) {
            fillPath.style.strokeDasharray = `${liveLength} ${liveLength}`;

            const currentOffset = liveLength - (currentPercent * liveLength);
            fillPath.style.strokeDashoffset = currentOffset;

            const yPos = currentPercent * containerHeight;

            const linearGlow = document.getElementById("timeline-linear-glow");
            if (linearGlow) {
                linearGlow.setAttribute("y1", Math.max(0, yPos - 200));
                linearGlow.setAttribute("y2", yPos);
            }

            items.forEach((item) => {
                const localY = yPos - item.offsetTop;
                item.style.setProperty('--yPos', `${localY}px`);
                item.style.setProperty('--xPos', `${item.offsetWidth / 2}px`);
            });
        }

        if (Math.abs(diff) > 0.001) {
            requestAnimationFrame(smoothLineScroll);
        } else {
            currentPercent = targetPercent;
            isAnimating = false;
        }
    }
}


function initTimelineObserver() {
    const items = document.querySelectorAll(".timeline-item");
    if (items.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                entry.target.classList.add("active");
            } else {

            }
        });
    }, observerOptions);

    items.forEach(item => timelineObserver.observe(item));
}

window.addEventListener("resize", drawZickZackLine);

document.addEventListener("mousemove", (e) => {

    const contentBox = e.target.closest(".timeline-item .timeline-content");
    if (!contentBox) return;

    const rect = contentBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contentBox.style.setProperty("--xPos", `${x}px`);
    contentBox.style.setProperty("--yPos", `${y}px`);
});