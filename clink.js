// Champagne Clink Effect
document.addEventListener('click', function(e) {
    createClinkEffect(e.clientX, e.clientY);
});

function createClinkEffect(x, y) {
    const container = document.createElement('div');
    container.className = 'clink-effect';
    container.style.left = (x - 20) + 'px';
    container.style.top = (y - 20) + 'px';

    // Add clinking glasses
    const glass1 = document.createElement('span');
    glass1.className = 'clink-glass';
    glass1.textContent = '🥂';
    glass1.style.left = '0px';
    glass1.style.top = '0px';
    container.appendChild(glass1);

    // Add sparkles/sound lines
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'clink-sparkle';
        const angle = (i / 8) * Math.PI * 2;
        const distance = 25 + Math.random() * 15;
        sparkle.style.left = '20px';
        sparkle.style.top = '10px';
        sparkle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        sparkle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        sparkle.style.animationDelay = (Math.random() * 0.1) + 's';
        container.appendChild(sparkle);
    }

    document.body.appendChild(container);

    // Remove after animation
    setTimeout(() => {
        container.remove();
    }, 700);
}
