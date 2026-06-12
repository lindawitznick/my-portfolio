/* JS für den effekt von impressum */

const impressumContainer = document.querySelector('.impressum-all');
const impDaSch = document.querySelectorAll('.impressum');

impressumContainer.addEventListener('mousemove', function ($event) {
    impDaSch.forEach((impDaSch) => {
        const rect = impDaSch.getBoundingClientRect();

        const x = $event.clientX - rect.left;
        const y = $event.clientY - rect.top;

        impDaSch.style.setProperty('--xPos', `${x}px`);
        impDaSch.style.setProperty('--yPos', `${y}px`);
    })
})