function updateAucklandTime() {
    const timeElement = document.getElementById('akl-time');
    
    if (!timeElement) return;

    try {
        const options = {
            timeZone: 'Pacific/Auckland',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };

        const aucklandTime = new Intl.DateTimeFormat('en-NZ', options).format(new Date());
        timeElement.textContent = aucklandTime;
    } catch (e) {
        console.error("Error formatting time:", e);
        timeElement.textContent = "Time unavailable";
    }
}

// Initial call
updateAucklandTime();

// Update every second
setInterval(updateAucklandTime, 1000);

// --- Background audio controls ---
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-audio');
    const muteBtn = document.getElementById('audio-mute');
    const overlay = document.getElementById('audio-overlay');
    const snowContainer = document.querySelector('.snow-container');

    if (!audio || !muteBtn) return;
    // Make audio quieter and attempt autoplay (it's muted initially so browsers allow autoplay)
    audio.volume = 0.05;
    // Ensure button icons reflect actual state (only mute button remains)
    const updateButtons = () => {
        muteBtn.innerHTML = audio.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
        muteBtn.setAttribute('aria-pressed', String(audio.muted));
    };

    // Try to play (should work while muted/autoplay is allowed)
    audio.play().catch(() => {});
    updateButtons();

    // Overlay click/keyboard interaction: unmute and play, then hide overlay
    const activateFromOverlay = () => {
        if (!overlay) return;
        // Unmute and ensure audible volume
        audio.muted = false;
        audio.volume = Math.max(0.05, audio.volume);
        audio.play().catch(() => {});
        overlay.classList.add('hidden');
        // remove after transition
        setTimeout(() => overlay.remove(), 600);
        updateButtons();
    };

    if (overlay) {
        overlay.addEventListener('click', activateFromOverlay);
        overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateFromOverlay();
            }
        });
    }

    // Mute button also pauses when muting; unmuting resumes playback
    muteBtn.addEventListener('click', () => {
        if (!audio.muted) {
            audio.muted = true;
            audio.pause();
        } else {
            audio.muted = false;
            audio.play().catch(() => {});
        }
        updateButtons();
    });

    // Create a simple snow effect using DOM elements
    const createSnow = (count = 40) => {
        if (!snowContainer) return;
        for (let i = 0; i < count; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            const size = Math.random() * 6 + 4; // 4-10px
            const left = Math.random() * 100; // percent
            const duration = Math.random() * 12 + 6; // 6-18s
            const delay = -(Math.random() * duration);
            flake.style.width = `${size}px`;
            flake.style.height = `${size}px`;
            flake.style.left = `${left}%`;
            flake.style.opacity = String(0.6 + Math.random() * 0.4);
            flake.style.animationDuration = `${duration}s`;
            flake.style.animationDelay = `${delay}s`;
            // horizontal drift via transform on each flake using a small translateX
            snowContainer.appendChild(flake);
        }
    };

    createSnow(48);
});
