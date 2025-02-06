let pomodoroStartingMin = 25;
let shortBreakStartingMin = 5;
let longBreakStartingMin = 15;
let pomodoroTime = pomodoroStartingMin * 60;
let shortBreakTime = shortBreakStartingMin * 60;
let longBreakTime = longBreakStartingMin * 60;
let pomodoroFlag = false, shortBreakFlag = false, longBreakFlag = false;
let intervalIdPomodoro = null, intervalIdShortBreak = null, intervalIdLongBreak = null;
let pomodoroCounter = 1;

const pomodoro_timer = document.getElementById("pomodoro_timer");
const shortBreak_timer = document.getElementById("shortBreak_timer");
const longBreak_timer = document.getElementById("longBreak_timer");
const timerSound = document.getElementById("timerSound");
const checkbox = document.getElementById("autoBreakChecker");




function checker(){
    if(checkbox.checked){
        if(pomodoroTime === 0){
            if(pomodoroCounter == 3){
                longBreak();
                startLongBreak();
                pomodoroCounter = 0;
            } else {
                shortBreak();
                startShortBreak();
            }
        }
        if(shortBreakTime === 0 || longBreakTime === 0){
            pomodoro();
            startPomodoro();
        }
    }
    document.getElementById("zamangosterici").textContent = `${pomodoroCounter}`;
}

function pomodoro(){
    document.getElementById("pomodoro").style.display = "block";
    document.getElementById("shortbreak").style.display = "none";
    document.getElementById("longbreak").style.display = "none";
    document.getElementById("pomodoro_btn").style.backgroundColor = "hsla(0, 0%, 100%, 0.192)"
    document.getElementById("short_break_btn").style.background = "none"
    document.getElementById("long_break_btn").style.background = "none"

    resetLongBreak();
    resetShortBreak();

    document.getElementById("body").style.backgroundColor = "#923737";
}

function shortBreak(){
    document.getElementById("pomodoro").style.display = "none";
    document.getElementById("shortbreak").style.display = "block";
    document.getElementById("longbreak").style.display = "none";
    document.getElementById("short_break_btn").style.backgroundColor = "hsla(0, 0%, 100%, 0.192)"
    document.getElementById("pomodoro_btn").style.background = "none"
    document.getElementById("long_break_btn").style.background = "none"
    
    resetLongBreak();
    resetPomodoro();
    
    document.getElementById("body").style.backgroundColor = "#2d6a6e";
}

function longBreak(){
    document.getElementById("pomodoro").style.display = "none";
    document.getElementById("shortbreak").style.display = "none";
    document.getElementById("longbreak").style.display = "block";
    document.getElementById("long_break_btn").style.backgroundColor = "hsla(0, 0%, 100%, 0.192)"
    document.getElementById("short_break_btn").style.background = "none"
    document.getElementById("pomodoro_btn").style.background = "none"
    

    resetShortBreak();
    resetPomodoro();

    document.getElementById("body").style.backgroundColor = "#2e5a79";
}

function startPomodoro(){
    if (!pomodoroFlag) {
        intervalIdPomodoro = setInterval(updateZamanlayiciPomodoro, 1000);
        pomodoroFlag = true;
        document.getElementById("startPomodoro").style.display = "none";
        document.getElementById("stopPomodoro").style.display = "flex";
        document.getElementById("resetPomodoro").style.display = "flex";
    }
}

function updateZamanlayiciPomodoro(){
    if (pomodoroTime === 0) {
        stopPomodoro();
        timerSound.play();
        checker();
        pomodoroCounter++;
        return;
    }
    pomodoroTime--;
    pomodoro_timer.innerHTML = formatTime(pomodoroTime);
}

function stopPomodoro(){
    clearInterval(intervalIdPomodoro);
    pomodoroFlag = false;
    document.getElementById("startPomodoro").style.display = "block";
    document.getElementById("stopPomodoro").style.display = "none";
}

function resetPomodoro(){
    stopPomodoro();
    pomodoroTime = pomodoroStartingMin * 60;
    pomodoro_timer.innerHTML = formatTime(pomodoroTime);
    document.getElementById("resetPomodoro").style.display = "none";
}

function startShortBreak(){
    if (!shortBreakFlag) {
        intervalIdShortBreak = setInterval(updateZamanlayiciShortBreak, 1000);
        shortBreakFlag = true;
        document.getElementById("startShortBreak").style.display = "none";
        document.getElementById("stopShortBreak").style.display = "flex";
        document.getElementById("resetShortBreak").style.display = "flex";
    }
}

function updateZamanlayiciShortBreak(){
    if (shortBreakTime === 0) {
        stopShortBreak();
        timerSound.play();
        checker();
        return;
    }
    shortBreakTime--;
    shortBreak_timer.innerHTML = formatTime(shortBreakTime);
}

function stopShortBreak(){
    clearInterval(intervalIdShortBreak);
    shortBreakFlag = false;
    document.getElementById("startShortBreak").style.display = "block";
    document.getElementById("stopShortBreak").style.display = "none";
}

function resetShortBreak(){
    stopShortBreak();
    shortBreakTime = shortBreakStartingMin * 60;
    shortBreak_timer.innerHTML = formatTime(shortBreakTime);
    document.getElementById("resetShortBreak").style.display = "none";
}

function startLongBreak(){
    if (!longBreakFlag) {
        intervalIdLongBreak = setInterval(updateZamanlayiciLongBreak, 1000);
        longBreakFlag = true;
        document.getElementById("startLongBreak").style.display = "none";
        document.getElementById("stopLongBreak").style.display = "flex";
        document.getElementById("resetLongBreak").style.display = "flex";
    }
}

function updateZamanlayiciLongBreak(){
    if (longBreakTime === 0) {
        stopLongBreak();
        timerSound.play();
        checker();
        return;
    }
    longBreakTime--;
    longBreak_timer.innerHTML = formatTime(longBreakTime);
}

function stopLongBreak(){
    clearInterval(intervalIdLongBreak);
    longBreakFlag = false;
    document.getElementById("stopLongBreak").style.display = "none";
    document.getElementById("startLongBreak").style.display = "block";
}

function resetLongBreak(){
    stopLongBreak();
    longBreakTime = longBreakStartingMin * 60;
    longBreak_timer.innerHTML = formatTime(longBreakTime);
    document.getElementById("resetLongBreak").style.display = "none"
}

function formatTime(seconds){
    let minutes = Math.floor(seconds / 60);
    let second = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${second < 10 ? `0${second}` : second}`;
}

function popup_open(){
    popup_menu = document.getElementById("popup-menu");
    popup_menu.style.display = "block";
}

function popup_close(){
    popup_menu = document.getElementById("popup-menu");
    popup_menu.style.display = "none";
}

function updateTimers(){
    let newPomodoroTime = parseInt(document.getElementById("pomodoro_time").value, 10);
    let newShortBreakTime = parseInt(document.getElementById("shortBreak_time").value, 10);
    let newLongBreakTime = parseInt(document.getElementById("longBreak_time").value, 10);
    
    if (!isNaN(newPomodoroTime)) {
        pomodoroStartingMin = newPomodoroTime;
        pomodoroTime = pomodoroStartingMin * 60;
        pomodoro_timer.innerHTML = formatTime(pomodoroTime);
    }
    if (!isNaN(newShortBreakTime)) {
        shortBreakStartingMin = newShortBreakTime;
        shortBreakTime = shortBreakStartingMin * 60;
        shortBreak_timer.innerHTML = formatTime(shortBreakTime);
    }
    if(!isNaN(newLongBreakTime)) {
        longBreakStartingMin = newLongBreakTime;
        longBreakTime = longBreakStartingMin * 60;
        longBreak_timer.innerHTML = formatTime(longBreakTime);
    }
}
