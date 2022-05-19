var timerState = {
  current: undefined,
  startTime: undefined,
  isRunning: false,
  description: '',
  id: undefined,
  trackerIsOpen: false,
}

var timerType = {
  pomodoro: "25:00",
  shortBreak: "05:00",
  longBreak: "20:00",
}

function setTimer(time) {
  timerState.current = time;
  timerState.startTime = time;
  timerState.isRunning = false;
  $("#timer").text(time);
}

function updateTimer(time) {
  timerState.current = time;
  $("#timer").text(time);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startTimer() {
  timerState.isRunning = true;
  console.log("Timer starting")
  await sleep(1000);
  while (timerState.isRunning) {
    let times = timerState.current.split(":");
    let seconds = Number(times[1]);
    if (seconds == 0) {  // rollover minutes
      let minutes = Number(times[0]);
      if (minutes == 0) {  // timer is complete
        timerState.isRunning = false;
        console.log("Timer complete")
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
}

function exclusiveButtonFocus(buttonId) {
  $("#pomodoro").toggleClass("bg-sky-500", true).toggleClass("bg-sky-700", false);
  $("#short_break").toggleClass("bg-sky-500", true).toggleClass("bg-sky-700", false);
  $("#long_break").toggleClass("bg-sky-500", true).toggleClass("bg-sky-700", false);
  $(buttonId).toggleClass("bg-sky-500", false).toggleClass("bg-sky-700", true);
}

$(function() {
  $("#pomodoro").click(function(event) {
    setTimer("25:00");
    exclusiveButtonFocus(this);
  });
  $("#short_break").click(function(event) {
    setTimer("00:10");
    exclusiveButtonFocus(this);
  });
  $("#long_break").click(function(event) {
    setTimer("20:00");
    exclusiveButtonFocus(this);
  });
  $("#start").click(function(event) {
    startTimer();
  });
  $("#stop").click(function(event) {
    stopTimer();
  });
  $("#reset").click(function(event) {
    resetTimer();
  });
});
// $("p").addClass("myClass yourClass");
// onclick = "document.getElementById('timer').innerHTML = '25:00'"
