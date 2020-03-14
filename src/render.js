/**
 * Constants
 */
const DEFAULT_DURATION_POMODORO_SECONDS = 15
const DEFAULT_DURATION_SHORT_BREAK_SECONDS = 5
const DEFAULT_DURATION_LONG_BREAK_SECONDS = 10

const activities = {
    POMODORO: 'pomodoro',
    SHORT_BREAK: 'short break',
    LONG_BREAK: 'long break',
}

/**
 * Main timer element
 */
const timerElement = document.getElementById('timer')

/**
 * Activity buttons
 */
const buttonShortBreak = document.getElementById('button-activity-break-short')
const buttonLongBreak = document.getElementById('button-activity-break-long')
const buttonPomodoro = document.getElementById('button-activity-pomodoro')

const activityButtons = [buttonShortBreak, buttonLongBreak, buttonPomodoro]

buttonShortBreak.addEventListener('click', (event) => {
    setActivity(activities.SHORT_BREAK, false)
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonShortBreak.classList.add('is-active')
});

buttonLongBreak.addEventListener('click', (event) => {
    setActivity(activities.LONG_BREAK, false)
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonLongBreak.classList.add('is-active')
});

buttonPomodoro.addEventListener('click', (event) => {
    setActivity(activities.POMODORO, false)
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonPomodoro.classList.add('is-active')
});

/**
 * @param {Object} activity 
 */
const setActivity = (activity, force) => {
    if (activity === currectActivity && force === false) return
    currectActivity = activity;
    timeLeftMillis = getActivityDurationInSeconds(activity) * 1000
    lastPulse = new Date()
    lastPulse.setMilliseconds(999)
    doCountdown()
}

const getActivityDurationInSeconds = (activity) => {
    console.log('check activity ', activity)
    switch (activity) {
        case activities.POMODORO:
            return DEFAULT_DURATION_POMODORO_SECONDS
        case activities.SHORT_BREAK:
            return DEFAULT_DURATION_SHORT_BREAK_SECONDS
        case activities.LONG_BREAK:
            return DEFAULT_DURATION_LONG_BREAK_SECONDS
        default:
            throw new Error('Unknown activity: ' + activity);
    }
}
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
let timeLeftMillis = 0;
let lastPulse = new Date()
let isPaused = true;
let currectActivity = activities.POMODORO

/**
 * Button behaviour
 */
buttonStartActivity.addEventListener('click', (event) => {
    isPaused ? unpause() : pause()
})

buttonIncreaseActivityDuration.addEventListener('click', (event) => {
    timeLeftMillis += 1 * 60 * 1000
    doCountdown()
})

buttonResetActivity.addEventListener('click', (event) => {
    reset()
})

setInterval(() => {
   doCountdown();
}, 500)

const doCountdown = () => {
    const now = new Date()
    if (!isPaused) {
        timeLeftMillis = timeLeftMillis - (now - lastPulse)
    }
    lastPulse = now;
    updateTimerValue()
}

const updateTimerValue = () => {
    const time = new Date(timeLeftMillis)
    if (timeLeftMillis <= 0) {
        timerElement.innerText = '00:00'
    } else {
        timerElement.innerText = 
            new String(time.getMinutes()).padStart(2, '0') 
            + ':'  
            + new String(time.getSeconds()).padStart(2, '0')
    }
}

const reset = () => {
    setActivity(currectActivity, true)
    pause()
}

const pause = () => {
    console.log('pause')
    if(isPaused) return;
    isPaused = true
    buttonStartActivity.innerText = 'Start';
}


const unpause = () => {
    console.log('unpause')
    isPaused = false
    buttonStartActivity.innerText = 'Pause'
}

reset()