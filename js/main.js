/* JS für den Effekt von main */

function starteRotaAnimation() {
    const mainPicture = document.querySelector('.main-picture');

    if (!mainPicture) {

        setTimeout(starteRotaAnimation, 50);
        return;
    }

    let winkel = 0;
    const geschwindigkeit = 0.01;
    const radius = 120;

    function bewegeEffekt() {

        const breite = mainPicture.clientWidth;
        const hoehe = mainPicture.clientHeight;


        const mittelpunktX = breite / 2;
        const mittelpunktY = hoehe / 2;

        const x = mittelpunktX + radius * Math.cos(winkel);
        const y = mittelpunktY + radius * Math.sin(winkel);

        mainPicture.style.setProperty('--xPos', `${x}px`);
        mainPicture.style.setProperty('--yPos', `${y}px`);

        winkel += geschwindigkeit;

        requestAnimationFrame(bewegeEffekt);
    }

    bewegeEffekt();
}

starteRotaAnimation();


/* typewriter effekt */
window.addEventListener("load", () => {

    const container = document.getElementById("typewriter");
    if (!container) return;

    const elements = Array.from(container.children);
    const buttons = document.querySelectorAll(".button-lg");
    const hrLine = document.getElementById("hard-line");

    if (!sessionStorage.getItem("visited")) {


        if (hrLine) {
            hrLine.style.width = "0%";
            hrLine.style.marginLeft = "0";
            hrLine.style.marginRight = "auto";
            hrLine.style.border = "none";
            hrLine.style.height = "1px";
            hrLine.style.backgroundColor = "#a19273";
            hrLine.style.opacity = "1";
            hrLine.style.marginTop = "25px";
            hrLine.style.marginBottom = "25px";
            hrLine.style.display = "block";
        }

        buttons.forEach(button => {
            button.style.opacity = "0";
            button.style.transform = "translateY(10px)";
            button.style.display = "inline-block";
        });

        const textData = elements.map(el => {
            const originalText = (el.textContent || el.innerText).trim();
            el.setAttribute("data-text", originalText);
            el.textContent = "";
            el.style.visibility = "hidden";
            return el;
        });

        let elementIndex = 0;
        let charIndex = 0;

        function type() {
            if (elementIndex < textData.length) {
                const currentElement = textData[elementIndex];
                const fullText = currentElement.getAttribute("data-text");

                if (charIndex === 0) {
                    currentElement.style.visibility = "visible";
                    currentElement.classList.add("typing");
                }

                currentElement.textContent = fullText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex < fullText.length) {
                    setTimeout(type, 30);
                } else {
                    currentElement.classList.remove("typing");
                    elementIndex++;
                    charIndex = 0;
                    setTimeout(type, 400);
                }
            } else {
                sessionStorage.setItem("visited", "true");
                // Typewriter effekt ist jetzt fertig und die restlichen Elemente starten mit der Folge-Animationen 
                startFolgeAnimationen();
            }
        }

        function startFolgeAnimationen() {
            // Zieht die Linie von links nach rechts
            if (hrLine) {
                hrLine.style.transition = "width 1.2s ease-out";
                hrLine.style.width = "100%";
            }

            // Logos nacheinander einblenden
            buttons.forEach((button, index) => {
                setTimeout(() => {
                    button.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
                    button.style.opacity = "1";
                    button.style.transform = "translateY(0)";
                }, 1200 + (index * 400));
            });
        }

        setTimeout(type, 500);

    } else {
        // 
        elements.forEach(el => {
            if (el.getAttribute("data-text")) {
                el.textContent = el.getAttribute("data-text");
            }
            el.style.visibility = "visible";
            el.classList.remove("typing");
        });

        if (hrLine) {
            hrLine.style.width = "100%";
            hrLine.style.border = "none";
            hrLine.style.height = "1px";
            hrLine.style.backgroundColor = "#a19273";
            hrLine.style.opacity = "1";
            hrLine.style.marginTop = "25px";
            hrLine.style.marginBottom = "25px";
        }

        buttons.forEach(button => {
            button.style.opacity = "1";
            button.style.transform = "translateY(0)";
            button.style.display = "inline-block";
        });
    }
});














/* JS für den effekt von Profil */

const profilContainer = document.querySelector('.profile');
const profile = document.querySelectorAll('.profil');

profilContainer.addEventListener('mousemove', function ($event) {
    profile.forEach((profil) => {
        const rect = profil.getBoundingClientRect();

        const x = $event.clientX - rect.left;
        const y = $event.clientY - rect.top;

        profil.style.setProperty('--xPos', `${x}px`);
        profil.style.setProperty('--yPos', `${y}px`);
    })
})


/* JS für den Effekt von Projekte */

const projektContainer = document.querySelector('.projekte');
const projekte = document.querySelectorAll('.projekt');

projektContainer.addEventListener('mousemove', function ($event) {
    projekte.forEach((projekt) => {
        const rect = projekt.getBoundingClientRect();

        const x = $event.clientX - rect.left;
        const y = $event.clientY - rect.top;

        projekt.style.setProperty('--xPos', `${x}px`);
        projekt.style.setProperty('--yPos', `${y}px`);
    });
});




/* JS für den Effekt von Kontakt */

const kontaktContainer = document.querySelector('.kontakte');
const kontakte = document.querySelectorAll('.kontakt');

kontaktContainer.addEventListener('mousemove', function ($event) {
    kontakte.forEach((kontakt) => {
        const rect = kontakt.getBoundingClientRect();

        const x = $event.clientX - rect.left;
        const y = $event.clientY - rect.top;

        kontakt.style.setProperty('--xPos', `${x}px`);
        kontakt.style.setProperty('--yPos', `${y}px`);
    });
});




const boxIds = ['eigene-anrede', 'vorname', 'nachname', 'firmenname', 'email', 'nachricht', 'radio1', 'radio2', 'radio3', 'checkbox'];

boxIds.forEach(id => {
    const box = document.getElementById(id);

    if (box) {
        box.addEventListener('focus', function () {
            this.style.backgroundColor = '#a192733f';
            this.style.borderColor = '#a19273';
            this.style.outline = '1px solid beige';
            this.style.boxShadow = '0 0 10px #a19273';
        });

        box.addEventListener('blur', function () {
            this.style.backgroundColor = 'transparent';
            this.style.borderColor = '#a19273';
            this.style.outline = '1px solid #a19273'
            this.style.boxShadow = 'none'
        });
    }
});

//Kontaktformular

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const value = this.getAttribute('data-value');
        const text = this.textContent;

        const anredeBtn = document.getElementById('anrede-btn');
        const anrede = document.getElementById('anrede');
        const dropdownContainer = anredeBtn.closest('.dropdown');

        if (anredeBtn) anredeBtn.textContent = text;

        if (anrede) {
            anrede.value = value;

            if (value !== "") {
                anredeBtn.classList.remove('is-invalid');
                dropdownContainer.classList.remove('is-invalid');
            } else {
                anredeBtn.classList.add('is-invalid');
            }
        }

        /* JS für das Freitextfeld */
        const freitextFeld = document.getElementById('freitext-feld');
        const eigeneAnrede = document.getElementById('eigene-anrede');

        if (freitextFeld) {
            if (value === 'andere') {
                freitextFeld.style.display = "block";
                if (eigeneAnrede) {
                    eigeneAnrede.setAttribute('required', 'required');
                    eigeneAnrede.classList.remove('is-invalid');
                }
                if (anrede) anrede.value = "andere";
            } else {
                freitextFeld.style.display = "none";
                if (eigeneAnrede) {
                    eigeneAnrede.removeAttribute('required');
                    eigeneAnrede.value = '';
                    eigeneAnrede.classList.remove('is-invalid');
                }
            }
        }
    });
});

// Formular-Validierung beim Absenden
document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const anrede = document.getElementById('anrede');
        const anredeBtn = document.getElementById('anrede-btn');
        let isValid = true;

        if (anrede && (anrede.value === "" || anrede.value === null)) {
            isValid = false;
            if (anredeBtn) {
                anredeBtn.classList.add('is-invalid');
                anredeBtn.closest('.dropdown').classList.add('is-invalid');
            }
        }

        if (!form.checkValidity()) {
            isValid = false;
        }

        form.classList.add('was-validated');

        if (isValid) {
            const formData = new FormData(form);
            const targetUrl = form.getAttribute('action') || 'senden.php';

            fetch(targetUrl, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) throw new Error('Netzwerk-Fehler');
                    return response.text();
                })
                .then(data => {

                    const modal = document.getElementById('erfolgs-modal');
                    const modalNachricht = document.getElementById('modal-nachricht');

                    if (modalNachricht) modalNachricht.textContent = data;
                    if (modal) modal.showPopover();

                    form.reset();
                    form.classList.remove('was-validated');
                    if (anredeBtn) anredeBtn.textContent = 'Bitte wählen';

                    const freitextFeld = document.getElementById('freitext-feld');
                    if (freitextFeld) freitextFeld.style.display = "none";
                })
                .catch(error => {
                    console.error('Fehler:', error);
                    alert('Beim Senden ist ein Fehler aufgetreten, Bitte versuchen Sie es erneut');
                });
        }
    }, false);
});


function schliesseModal() {
    const modal = document.getElementById('erfolgs-modal');
    if (modal) modal.hidePopover();
}

document.getElementById('modal-schliessen')?.addEventListener('click', schliesseModal);
document.getElementById('modal-ok-btn')?.addEventListener('click', schliesseModal);



//cursor
const cursorDot = document.querySelector('.custom-cursor-dot');

// Bewegung des Cursors
window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Hover-Effekt für alle Links und Buttons aktivieren
document.querySelectorAll('a, button, .klickbar').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.classList.add('is-hovering');
    });
    element.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('is-hovering');
    });
});