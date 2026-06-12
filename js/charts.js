document.addEventListener("DOMContentLoaded", async function () {
    const CHART_COLOR = "#a19273";
    const BACKGROUND_COLOR = "#1a1a1a";

    var skillData = [];

    try {
        const response = await fetch("skills.json");
        skillData = await response.json();
    } catch (error) {
        return;
    }

    const skillsContainer = document.getElementById("skills");

    if (!skillsContainer) return;

    // Observer für den Scrolleffekt
    const chartObserver = new IntersectionObserver(function (entries, observerInstance) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBox = entry.target;
                                const skillId = skillBox.getAttribute("data-skill-id");
                const imgId = skillBox.getAttribute("data-img-id");
                const percent = parseInt(skillBox.getAttribute("data-percent"));
                const label = skillBox.getAttribute("data-label");
                const ctx = document.getElementById(skillId).getContext("2d");
                const img = document.getElementById(imgId);

                new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: [label],
                        datasets: [{
                            data: [percent, 100 - percent],
                            backgroundColor: [CHART_COLOR, BACKGROUND_COLOR],
                            borderColor: ["transparent", "transparent"],
                            borderWidth: 2,
                            hoverBorderColor: [CHART_COLOR, "transparent"],
                            hoverBorderWidth: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: "97%",
                        interaction: {
                            mode: "nearest",
                            intersect: false
                        },
                        animation: {
                            duration: 3000,
                            easing: "easeOutQuart"
                        },
                        transitions: {
                            active: {
                                animation: { duration: 300 }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false }
                        }
                    },
                    plugins: [{
                        id: "costumCanvasBackgroundImage",
                        beforeDraw: (chart) => {
                            if (img.complete) {
                                const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
                                const x = left + width / 2;
                                const y = top + height / 2;
                                const imgWidth = width * 0.5;
                                const imgHeight = height * 0.5;

                                ctx.drawImage(img, x - imgWidth / 2, y - imgHeight / 2, imgWidth, imgHeight);
                            } else {
                                img.onload = () => chart.draw();
                            }
                        }
                    }]
                });

                observerInstance.unobserve(skillBox);
            }
        });
    }, {
        threshold: 0.2
    });

    // HTML Struktur und Observer
    skillData.forEach(skill => {
        const skillElement = document.createElement("div");
        skillElement.classList.add("col", "skill");
        
        skillElement.setAttribute("data-skill-id", skill.id);
        skillElement.setAttribute("data-img-id", skill.imageId);
        skillElement.setAttribute("data-percent", skill.percent);
        skillElement.setAttribute("data-label", skill.label || "Fortschritt");

        skillElement.innerHTML = `
        <div class="p-3 skill-background">
            <h3 class="chart-heading">${skill.name}</h3>
            <div class="programming-stats">
                <div class="chart-container">
                    <canvas id="${skill.id}" class="skill-chart"></canvas>
                    <img id="${skill.imageId}"
                         src="${skill.imgSrc}"
                         style="display:none"
                         alt="${skill.name}">
                </div>
            </div>
        </div>
    `;
        skillsContainer.appendChild(skillElement);
        chartObserver.observe(skillElement);
    });

    // Glow Effekt
    const skillContainer = document.getElementById('skills');
    
    if (skillContainer) {
        skillContainer.addEventListener('mousemove', function ($event) {
            const skills = document.querySelectorAll('.col.skill');
            
            skills.forEach((skill) => {
                const rect = skill.getBoundingClientRect();
                const x = $event.clientX - rect.left;
                const y = $event.clientY - rect.top;

                skill.style.setProperty('--xPos', `${x}px`);
                skill.style.setProperty('--yPos', `${y}px`);
            });
        });
    }
});




