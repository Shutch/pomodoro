var timerState = {
  current: '00:00',
  startTime: '00:00',
  isRunning: false,
  description: '',
  id: undefined,
  trackerIsOpen: false,
}

var timerSettings = {
  pomodoro: "25:00",
  shortBreak: "00:05",
  longBreak: "9999:999",
}

storage = window.localStorage;

// this is filled from HTML on page load
var baseTitle = undefined;

function updateTimer(time) {
  timerState.current = time;
  $("#timer").text(time);
  document.title = "(" + time + ") " + baseTitle;
}

function setTimer(time) {
  timerState.startTime = time;
  timerState.isRunning = false;
  updateTimer(time);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playTimerEndSound() {
  $("#timer_bell")[0].play();
}

async function startTimer() {
  timerState.isRunning = true;
  await sleep(1000);
  while (timerState.isRunning) {
    let times = timerState.current.split(":");
    let seconds = Number(times[1]);
    if (seconds == 0) {  // rollover minutes
      let minutes = Number(times[0]);
      if (minutes == 0) {  // timer is complete
        timerState.isRunning = false;
        playTimerEndSound();
      } else {  // rollover minutes
        let newTime = String(minutes - 1).padStart(2, '0') + ":59";
        updateTimer(newTime);
        await sleep(1000);
      }
    } else {  // update clock after 1 second
      let newTime = times[0] + ":" + String(seconds - 1).padStart(2, '0');
      updateTimer(newTime);
      await sleep(1000);
    }
  }
}

function stopTimer() {
  timerState.isRunning = false;
}

function resetTimer() {
  timerState.isRunning = false;
  timerState.current = timerState.startTime;
  updateTimer(timerState.startTime);
}

function exclusiveButtonFocus(buttonId) {
  $("#pomodoro").toggleClass("bg-sky-500", true).toggleClass("bg-sky-700", false);
  $("#short_break").toggleClass("bg-sky-500", true).toggleClass("bg-sky-700", false);
  $("#long_break").toggleClass("bg-sky-500", true).toggleClass("bg-sky-700", false);
  $(buttonId).toggleClass("bg-sky-500", false).toggleClass("bg-sky-700", true);
}

function saveSettings() {
  timerSettings.pomodoro = String($("#pomodoro_minute").val()).padStart(2, '0') + ":" + String($("#pomodoro_second").val()).padStart(2, '0');
  timerSettings.shortBreak = String($("#short_minute").val()).padStart(2, '0') + ":" + String($("#short_second").val()).padStart(2, '0');
  timerSettings.longBreak = String($("#long_minute").val()).padStart(2, '0') + ":" + String($("#long_second").val()).padStart(2, '0');
  storage.setItem('pomodoro', timerSettings.pomodoro);
  storage.setItem('shortBreak', timerSettings.shortBreak);
  storage.setItem('longBreak', timerSettings.longBreak);
  $("#settings_modal").toggleClass("hidden", true);
}

function cancelSettings() {
  $("#settings_modal").toggleClass("hidden", true);
}

function loadSettings() {
  if (storage.getItem('pomodoro')) { timerSettings.pomodoro = storage.getItem('pomodoro') }
  if (storage.getItem('shortBreak')) { timerSettings.shortBreak = storage.getItem('shortBreak') }
  if (storage.getItem('longBreak')) { timerSettings.longBreak = storage.getItem('longBreak') }

  $("#pomodoro_minute").defaultValue = Number(timerSettings.pomodoro.split(':')[0]);
  $("#pomodoro_second").defaultValue = Number(timerSettings.pomodoro.split(':')[1]);
  $("#short_minute").defaultValue = Number(timerSettings.shortBreak.split(':')[0]);
  $("#short_second").defaultValue = Number(timerSettings.shortBreak.split(':')[1]);
  $("#long_minute").defaultValue = Number(timerSettings.longBreak.split(':')[0]);
  $("#long_second").defaultValue = Number(timerSettings.longBreak.split(':')[1]);
}

$(function() {
  baseTitle = document.title;
  loadSettings();
  $("#pomodoro").click(function(event) {
    setTimer(timerSettings.pomodoro);
    exclusiveButtonFocus(this);
  });
  $("#short_break").click(function(event) {
    setTimer(timerSettings.shortBreak);
    exclusiveButtonFocus(this);
  });
  $("#long_break").click(function(event) {
    setTimer(timerSettings.longBreak);
    exclusiveButtonFocus(this);
  });
  $("#start").click(function(event) {
    // check for no time or timer already running
    if ((timerState.current !== "00:00") && (timerState.isRunning === false)) {
      startTimer();
    }
  });
  $("#stop").click(function(event) {
    stopTimer();
  });
  $("#reset").click(function(event) {
    resetTimer();
  });
  $("#settings").click(function(event) {
    $("#settings_modal").toggleClass("hidden", false);
  });
  $("#settings_save").click(function(event) {
    saveSettings();
  });
  $("#settings_cancel").click(function(event) {
    cancelSettings();
  });
  // keyboard shortcuts on settings menu
  $(document).keydown(function(event) {
    if (event.which === 13 && $("#settings_modal").hasClass("hidden") === false) {  // enter key
      saveSettings();
    }
    if (event.which === 27 && $("#settings_modal").hasClass("hidden") === false) {  // escape key
      cancelSettings();
    }
  });
});
