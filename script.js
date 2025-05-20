let timerInterval;
let totalTime = 0;
let timeLeft = 0;
let currentMode = "ice"; // "ice" or "candle"

function switchMode() {
  currentMode = document.getElementById("modeToggle").checked ? "candle" : "ice";
  resetTimer(); // Reset timer and image when switching modes
}

function startTimer() {
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  totalTime = (minutes * 60) + seconds;
  timeLeft = totalTime;

  if (totalTime <= 0) {
    showPopup("⚠️ Please enter a valid duration.", "#ff3333");
    return;
  }

  updateCountdown();
  updateMeltingImage(timeLeft, totalTime);

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeLeft = 0;
      updateCountdown();
      updateMeltingImage(timeLeft, totalTime);
      showPopup("⏰ Time's up! Great job!", "#00ff00");
      return;
    }

    updateCountdown();
    updateMeltingImage(timeLeft, totalTime);
  }, 1000);
}

function updateCountdown() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("countdown").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateMeltingImage(timeLeft, totalTime) {
  const progress = 1 - (timeLeft / totalTime);
  let frame;

  if (currentMode === "ice") {
    frame = Math.min(150, Math.max(0, Math.round(progress * 150)));
    const frameStr = String(frame).padStart(3, '0');
    document.getElementById("ice-img").src = `images/ezgif-frame-${frameStr}.png`;
  } else {
    frame = Math.min(273, Math.max(0, Math.round(progress * 273)));
    const frameStr = String(frame).padStart(3, '0');
    document.getElementById("ice-img").src = `images/0520 (1)zxs_${frameStr}.jpg`;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 0;
  document.getElementById("countdown").textContent = "00:00";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";

  if (currentMode === "ice") {
    document.getElementById("ice-img").src = "images/ezgif-frame-000.png";
  } else {
    document.getElementById("ice-img").src = "images/0520 (1)zxs_000.jpg";
  }
}

function showPopup(message, backgroundColor = "#00ff00") {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = backgroundColor;
  popup.style.color = "#000";
  popup.style.padding = "20px 40px";
  popup.style.fontSize = "22px";
  popup.style.borderRadius = "15px";
  popup.style.boxShadow = `0 0 20px ${backgroundColor}`;
  popup.style.zIndex = "9999";
  popup.style.fontWeight = "bold";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 4000);
}
function updateRealTimeClock() {
    const clock = document.getElementById("realtime-clock");
    setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      clock.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }
  
  updateRealTimeClock();
  