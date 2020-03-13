/**
 * Constants
 */
const DEFAULT_DURATION_POMODORO_SECONDS = 25 * 60
const DEFAULT_DURATION_SHORT_BREAK_SECONDS = 5 * 60
const DEFAULT_DURATION_LONG_BREAK_SECONDS = 15 * 60

const activities = {
    POMODORO: 'pomodoro',
    SHORT_BREAK: 'short break',
    LONG_BREAK: 'long break',
    PAUSE: 'pause',
}

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
let currectActivity = activities.POMODORO
let activityStartDate = new Date()
let activityPausedTime = new Date();
let activityEndDate = new Date(activityStartDate)
activityEndDate.setSeconds(activityStartDate.getSeconds() + DEFAULT_DURATION_POMODORO_SECONDS)

/**
 * Button behaviour
 */
buttonStartActivity.addEventListener('click', (event) => {
    isPaused ? unpause() : pause()
})

buttonIncreaseActivityDuration.addEventListener('click', (event) => {
    activityEndDate.setMinutes(activityEndDate.getMinutes() + 1)
    if (isPaused) {
        const diffMillis = activityEndDate - activityPausedTime
        updateTimer(new Date(diffMillis))
    } else {
        doCountdown()
    }
})

buttonResetActivity.addEventListener('click', (event) => {
    reset()
})

setInterval(() => {
   doCountdown();
}, 1000)

const doCountdown = () => {
    if (isPaused) return
    const diffMillis = activityEndDate - new Date()
    const diffDate = new Date(diffMillis)
    updateTimer(diffDate)
}

const updateTimer = (time) => {
    timerElement.innerText = 
        new String(time.getMinutes()).padStart(2, '0') 
        + ':'  
        + new String(time.getSeconds()).padStart(2, '0')
}

const reset = () => {
    pause()
    activityStartDate = new Date()
    activityPausedTime = new Date();
    activityEndDate = new Date(activityStartDate)
    activityEndDate.setSeconds(activityStartDate.getSeconds() + DEFAULT_DURATION_POMODORO_SECONDS)

    if (isPaused) {
        const diffMillis = activityEndDate - activityPausedTime
        updateTimer(new Date(diffMillis))
    } else {
        doCountdown()
    }
}

const pause = () => {
    console.log('pause')
    activityPausedTime = new Date()
    isPaused = true
    buttonStartActivity.innerText = 'Start';
}


const unpause = () => {
    console.log('unpause')
    if (isPaused) {
        const pauseDiff = new Date() - activityPausedTime
        activityEndDate.setMilliseconds(activityEndDate.getMilliseconds() + pauseDiff)
    }
    isPaused = false
    buttonStartActivity.innerText = 'Pause'
}

reset()