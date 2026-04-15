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
