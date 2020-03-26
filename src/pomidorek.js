export const activities = {
    POMODORO: 'pomodoro',
    SHORT_BREAK: 'short break',
    LONG_BREAK: 'long break',
}

const PULSE_INTERVAL_MILLIS = 499

const DEFAULT_DURATION_POMODORO_SECONDS = 25 * 60
const DEFAULT_DURATION_SHORT_BREAK_SECONDS = 5 * 60
const DEFAULT_DURATION_LONG_BREAK_SECONDS = 15 * 60

let state = {
    timeLeftMillis: 0,
    lastPulse: new Date(),
    pause: true,
    currectActivity: activities.POMODORO,
    activityComplete: false,
    onPulse: (timeLeftMillis) => true,
    onActivityChanged: (newActivity) => true,
    activityLog: [], // {activity: string, date: Date}
    muted: false,
    notificationsEnabled: true,
}


let pulseInterval = null
const start = () => {
    clearInterval(pulseInterval)
    pulseInterval = setInterval(() => {
        pulse();
    }, PULSE_INTERVAL_MILLIS)
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

const setActivity = (activity, force) => {
    if (activity === state.currectActivity && force === false && state.activityLog.length > 0) return
    state.currectActivity = activity;
    state.timeLeftMillis = getActivityDurationInSeconds(activity) * 1000
    state.lastPulse = new Date()
    state.lastPulse.setMilliseconds(999)
    state.activityLog.push({activity, date: new Date()})
    state.activityComplete = false
    state.onActivityChanged(activity)
    pulse()
}

const pulse = () => {
    const now = new Date()
    if (!state.pause) {
        state.timeLeftMillis = state.timeLeftMillis - (now - state.lastPulse)
    }
    if (state.timeLeftMillis <= 0 && state.activityComplete === false) {
        state.activityComplete = true
        playSound()
        showNotification()
    }
    state.lastPulse = now;
    state.onPulse(state.timeLeftMillis)
}

const getSuggestedTimerValue = () => {
    const time = new Date(state.timeLeftMillis)
    if (state.timeLeftMillis <= 0) {
        return '00:00'
    } else {
        return new String(time.getMinutes()).padStart(2, '0') + ':' + new String(time.getSeconds()).padStart(2, '0')
    }
}

const reset = () => {
    setActivity(state.currectActivity, true)
    pause()
}

const pause = () => {
    console.log('pause')
    if (state.pause) return;
    state.pause = true
}


const unpause = () => {
    console.log('unpause')
    state.pause = false
}

const getNextActivity = () => {
    switch (state.currectActivity) {
        case activities.POMODORO:
            const lastLongBreakIdx = findtLastIndexOfActivityInLog(activities.LONG_BREAK)
            let pomodoroSinceLastLongBreak = 0
            for (let i = Math.max(0, lastLongBreakIdx); i < state.activityLog.length; i++) {
                if (state.activityLog[i].activity === activities.POMODORO) {
                    pomodoroSinceLastLongBreak++
                }
            }
            if (pomodoroSinceLastLongBreak > 3) return activities.LONG_BREAK
            return activities.SHORT_BREAK
        case activities.SHORT_BREAK:
        case activities.LONG_BREAK:
            return activities.POMODORO
        default:
            return activities.POMODORO
    }
}

const findtLastIndexOfActivityInLog = (targetActivity) => {
    for (let i = state.activityLog.length - 1; i >= 0; i--) {
        const activityLogItem = state.activityLog[i];
        if (activityLogItem.activity === targetActivity) return i
    }
    return -1
}

const startNextActivity = () => {
    setActivity(getNextActivity())
}

const playSound = () => {
    if (state.muted) return
    const audio = new Audio('../assets/audio/timer-bell.mp3');
    audio.play()
}

const isBreak = () => {
    return !(state.currectActivity === activities.POMODORO)
}

const showNotification = () => {
    const msg = isBreak() ?
        'Break is over, time to wørk again' :
        'Awesome, you finished your pomodoro. Have a break!'

    new Notification("Hello, it's your favorite tomato 🍅", {
        body: msg
    })
}

const Pomidorek = {
    start: start,
    pause: pause,
    unpause: unpause,
    isPaused: () => state.pause,
    reset: reset,
    addTime: addTime,
    getTimeRemaining: () => state.timeLeftMillis,
    setPulseCallback: (callback) => state.onPulse = callback,
    setActivityChangedCallback: (callback) => state.onActivityChanged = callback,
    getSuggestedTimerValue: getSuggestedTimerValue,
    getCurrentActivity: () => state.currectActivity,
    getNextActivity: getNextActivity,
    startNextActivity: startNextActivity,
    startPomodoro: () => setActivity(activities.POMODORO, false),
    startShortBreak: () => setActivity(activities.SHORT_BREAK, false),
    startLongBreak: () => setActivity(activities.LONG_BREAK, false),
    getActivityLog: () => state.activityLog,
}

export default Pomidorek