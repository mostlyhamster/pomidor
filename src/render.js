/**
 * Constants
 */
const DEFAULT_DURATION_POMODORO_SECONDS = 25 * 60
const DEFAULT_DURATION_SHORT_BREAK_SECONDS = 5 * 60
const DEFAULT_DURATION_LONG_BREAK_SECONDS = 15 * 60

/**
 * Main timer element
 */
const timerElement = document.getElementById('timer')

/*
 * Function buttons
 */
const buttonResetActivity = document.getElementById('button-activity-reset')
const buttonStartActivity = document.getElementById('button-activity-start')
const buttonNextActivity = document.getElementById('button-activity-next')
const buttonIncreaseActivityDuration = document.getElementById('button-activity-increase-duration')

/**
 * State
 */
let isPaused = true;

const activityStartDate = new Date()
let activityPausedTime = new Date();
let activityEndDate = new Date(activityStartDate)
activityEndDate.setSeconds(activityStartDate.getSeconds() + DEFAULT_DURATION_POMODORO_SECONDS)

/**
 * Button behaviour
 */
buttonStartActivity.addEventListener('click', (e) => {
    if (isPaused) {
        const pauseDiff = new Date() - activityPausedTime
        activityEndDate.setMilliseconds(activityEndDate.getMilliseconds() + pauseDiff)
    } else {
        activityPausedTime = new Date()
    }
    isPaused = !isPaused
    buttonStartActivity.innerText = isPaused ? 'Start' : 'Pause'
})

setInterval(() => {
   doCountdown();
}, 1000)

const doCountdown = () => {
    if (isPaused) return
    const diffMillis = activityEndDate - new Date()
    const diffDate = new Date(diffMillis)
    timerElement.innerText = diffDate.getMinutes() + ':'  + diffDate.getSeconds()
}