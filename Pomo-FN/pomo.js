
window.onload = () => {
    // ========== GLOBAL VARIABLES ==========
    let timeLeft = 25 * 60;
    let timerInterval = null;
    let isRunning = false;
    let isBreak = false; // false = Work Mode, true = Break Mode


    // ========== DOM ELEMENTS ==========
    const timerDisplay = document.querySelector(".timer h1");
    const startBtn = document.getElementById("startbtn");
    const pauseBtn = document.getElementById("pausebtn");
    const resetBtn = document.getElementById("resetbtn");
    const modeBtn = document.getElementById("modebtn");


    // ========== TOGGLER ==========
    function toggleMode() {
        clearInterval(timerInterval); 
        isRunning = false;
        isBreak = !isBreak;

        timeLeft = isBreak ? 5 * 60 : 25 * 60;
        updateDisplay();
        
        const heading = document.querySelector(".modeshower");
        heading.textContent = isBreak ? "BREAK MODE" : "WORK MODE";

    }

    // ========== UPDATE DISPLAY ==========
    function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // ========== START TIMER ==========
    function startTimer() {
    if (isRunning) return;
    isRunning = true;

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        toggleMode();


        } else {
        timeLeft--;
        updateDisplay();
        }
    }, 1000);
    }


    // ========== PAUSE TIMER ==========
    function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    }

    // ========== RESET TIMER ==========
    function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
    }

    // ========== INITIAL SETUP ==========
    updateDisplay(); 

    // ========== EVENT LISTENERS ==========
    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
    modeBtn.addEventListener("click", toggleMode);

}
