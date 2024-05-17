let score = 0;
let timeLeft = 15; // Set game duration to 15 seconds
let timerId;
let gameInProgress = false;
const kukiImages = ["kuki1.png", "kuki2.png", "kuki3.png", "kuki4.png"]; // Replace with your image paths
const celebrationImages = ["celebration1.png", "celebration2.png", "celebration3.png"]; // Replace with your image paths

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    if (!gameInProgress) {
        gameInProgress = true;
        score = 0;
        timeLeft = 15; // Reset game duration to 15 seconds
        document.getElementById("kukis").innerHTML = "";
        document.getElementById("startButton").textContent = "Game in Progress";
        document.getElementById("startButton").disabled = true;
        document.body.style.cursor = "url('dogo.png'), auto"; // Change cursor to dogo image
        document.getElementById("celebrationImages").innerHTML = ""; // Clear previous celebration images
        spawnKukisRandomly(); // Start spawning Kukis randomly
        timerId = setInterval(updateTimer, 1000);
    }
}

function spawnKukisRandomly() {
    const intervalId = setInterval(() => {
        if (timeLeft > 0) {
            const kukiCount = Math.floor(Math.random() * 5) + 1; // Spawn between 1 and 5 Kukis
            for (let i = 0; i < kukiCount; i++) {
                spawnKuki();
            }
        } else {
            clearInterval(intervalId); // Stop spawning Kukis when time runs out
        }
    }, 1000); // Spawn Kukis every 1000 milliseconds
}

function spawnKuki() {
    const gameArea = document.getElementById("gameArea");
    const kuki = document.createElement("div");
    kuki.classList.add("kuki");
    const randomImage = kukiImages[Math.floor(Math.random() * kukiImages.length)];
    kuki.style.backgroundImage = `url(${randomImage})`;
    kuki.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px";
    kuki.style.top = Math.random() * (gameArea.offsetHeight - 50) + "px";
    kuki.addEventListener("click", kukiClicked);
    gameArea.appendChild(kuki);
    setTimeout(() => {
        kuki.remove();
    }, 2000); // Kukis disappear after 2 seconds
}

function kukiClicked() {
    score++;
    this.classList.add("cross");
    setTimeout(() => {
        this.remove();
    }, 500);
}

function updateTimer() {
    timeLeft--;
    document.getElementById("timeLeft").textContent = timeLeft;
    if (timeLeft === 0) {
        endGame();
    }
}

function endGame() {
    gameInProgress = false;
    clearInterval(timerId);
    document.getElementById("startButton").textContent = "Start Game";
    document.getElementById("startButton").disabled = false;
    document.body.style.cursor = "auto"; // Reset cursor to default
    displayCelebration();
    alert("Game Over! Your score: " + score);
}

function displayCelebration() {
    // Show confetti
    const confettiCanvas = document.getElementById('confettiCanvas');
    const myConfetti = confetti.create(confettiCanvas, { resize: true });
    myConfetti({
        particleCount: 200,
        spread: 160
    });

    // Display random images
    const celebrationContainer = document.getElementById("celebrationImages");
    const imageCount = Math.floor(Math.random() * 3) + 1; // Show between 1 and 3 images
    for (let i = 0; i < imageCount; i++) {
        const img = document.createElement("img");
        img.src = celebrationImages[Math.floor(Math.random() * celebrationImages.length)];
        img.classList.add("celebrationImage");
        celebrationContainer.appendChild(img);
    }
}
