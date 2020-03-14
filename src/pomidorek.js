export const activities = {
    POMODORO: 'pomodoro',
    SHORT_BREAK: 'short break',
    LONG_BREAK: 'long break',
}


const DEFAULT_DURATION_POMODORO_SECONDS = 15
const DEFAULT_DURATION_SHORT_BREAK_SECONDS = 5
const DEFAULT_DURATION_LONG_BREAK_SECONDS = 10

let state = {
    timeLeftMillis : 0,
    lastPulse : new Date(),
    pause : true,
    currectActivity : activities.POMODORO,
    onPulse: (timeLeftMillis) => true
}


let pulseInterval = null
const start = () => {
    clearInterval(pulseInterval)
    pulseInterval = setInterval(() => {
        pulse();
     }, 500)
     reset()
}

const addTime = (timeMillis) => {
    state.timeLeftMillis += timeMillis
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

/**
 * @param {Object} activity 
 */
const setActivity = (activity, force) => {
    if (activity === state.currectActivity && force === false) return
    state.currectActivity = activity;
    state.timeLeftMillis = getActivityDurationInSeconds(activity) * 1000
    state.lastPulse = new Date()
    state.lastPulse.setMilliseconds(999)
    pulse()
}

const pulse = () => {
    const now = new Date()
    if (!state.pause) {
        state.timeLeftMillis = state.timeLeftMillis - (now - state.lastPulse)
    }
    state.lastPulse = now;
    state.onPulse(state.timeLeftMillis)
}

const getSuggestedTimerValue = () => {
    const time = new Date(state.timeLeftMillis)
    if (state.timeLeftMillis <= 0) {
        return '00:00'
    } else {
        return new String(time.getMinutes()).padStart(2, '0') + ':'  + new String(time.getSeconds()).padStart(2, '0')
    }
}

const reset = () => {
    setActivity(state.currectActivity, true)
    pause()
}

const pause = () => {
    console.log('pause')
    if(state.pause) return;
    state.pause = true
}


const unpause = () => {
    console.log('unpause')
    state.pause = false
}


const Pomidorek = {
    start: start,
    pause: pause,
    unpause: unpause,
    isPaused: () => state.pause,
    reset: reset,
    setActivity: setActivity,
    addTime: addTime,
    getTimeRemaining: () => state.timeLeftMillis,
    setPulseCallback: (callback) => state.onPulse = callback,
    getSuggestedTimerValue: getSuggestedTimerValue,
}

export default Pomidorek