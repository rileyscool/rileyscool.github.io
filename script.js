async function fetchDiscordStatus() {
    try {
        const response = await fetch("https://api.riely.me/discord-status");
        const data = await response.json();

        // Update avatar
        document.getElementById("discord-avatar").src = data.avatar;

        // Get avatar container
        const avatarContainer = document.getElementById("avatar-container");

        // Remove previous status classes
        avatarContainer.classList.remove("online", "idle", "dnd", "offline");

        // Apply new status color
        if (data.status === "online") avatarContainer.classList.add("online");
        else if (data.status === "idle") avatarContainer.classList.add("idle");
        else if (data.status === "dnd") avatarContainer.classList.add("dnd");
        else avatarContainer.classList.add("offline");

        // Update activity
        if (data.activity && data.activity !== "No activity") {
            document.getElementById("discord-activity").textContent = `Activity: ${data.activity}`;
        } else {
            document.getElementById("discord-activity").textContent = "";
        }

        // Handle Spotify Activity
        const spotifyContainer = document.getElementById("spotify-info");
        if (data.song) {
            document.getElementById("discord-activity").textContent = "";
            spotifyContainer.innerHTML = `
                <p><strong>${data.song.title}</strong></p>
                <p>${data.song.artist}</p>
                <img src="${data.song.image}" alt="Album Cover" class="album-cover">
            `;
            spotifyContainer.style.display = "block";
        } else {
            spotifyContainer.style.display = "none";
        }

        // Display Local Time in New Zealand Timezone
    } catch (error) {
        console.error("Error fetching Discord status:", error);
        document.getElementById("discord-activity").textContent = "Activity: Unavailable";
    }
}
function updateTime() {
    const localTimeElement = document.getElementById("current-time");
    const formattedTime = new Date().toLocaleTimeString("en-NZ", { hour: "2-digit", minute: "2-digit", hour12: true,timeZone: "Pacific/Auckland"  });
    localTimeElement.textContent = `Local Time: ${formattedTime}`;
}

setInterval(updateTime, 1000);
updateTime();

window.onload = () =>{
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        console.log("phone");
        document.getElementsByClassName("phone")[0].style.display = "block";
    }
}

// Fetch Discord status every 10 seconds
fetchDiscordStatus();
setInterval(fetchDiscordStatus, 10000);
