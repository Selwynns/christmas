document.addEventListener('DOMContentLoaded', () => {
    const present = document.getElementById('present');
    const card = document.querySelector('.card');
    let isFlipped = false;
    let isRevealed = false;

    // Add multiple snowflakes dynamically
    const snowflakesContainer = document.querySelector('.snowflakes');
    for (let i = 0; i < 10; i++) {
        const snowflake = document.createElement('span');
        snowflake.textContent = '❄️';
        snowflake.style.position = 'absolute';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;
        snowflake.style.fontSize = `${Math.random() * 15 + 10}px`;
        snowflakesContainer.appendChild(snowflake);
    }

    // Handle present click and reveal card
    present.addEventListener('click', () => {
        if (!isRevealed) {
            isRevealed = true;
            present.classList.add('reveal');
            
            // Wait for present animation to finish before showing card
            setTimeout(() => {
                present.style.display = 'none';
                card.classList.remove('hidden');
                card.classList.add('show');
            }, 1000);
        }
    });

    // Handle card flip
    card.addEventListener('click', () => {
        if (isRevealed) {
            isFlipped = !isFlipped;
            if (isFlipped) {
                card.classList.add('flipped');
            } else {
                card.classList.remove('flipped');
            }
        }
    });

    // Add hover effect to card
    card.addEventListener('mousemove', (e) => {
        if (!isRevealed) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = -(x - centerX) / 20;
        
        if (!isFlipped) {
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    // Reset transform on mouse leave
    card.addEventListener('mouseleave', () => {
        if (!isFlipped && isRevealed) {
            card.style.transform = 'rotateX(0) rotateY(0)';
        }
    });
});
