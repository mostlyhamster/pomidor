import  Pomidorek, { activities } from './pomidorek.js'

const timerElement = document.getElementById('timer')
const buttonShortBreak = document.getElementById('button-activity-break-short')
const buttonLongBreak = document.getElementById('button-activity-break-long')
const buttonPomodoro = document.getElementById('button-activity-pomodoro')

const activityButtons = [buttonShortBreak, buttonLongBreak, buttonPomodoro]

buttonShortBreak.addEventListener('click', (event) => {
    Pomidorek.setActivity(activities.SHORT_BREAK, false)
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonShortBreak.classList.add('is-active')
});

buttonLongBreak.addEventListener('click', (event) => {
    Pomidorek.setActivity(activities.LONG_BREAK, false)
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonLongBreak.classList.add('is-active')
});

buttonPomodoro.addEventListener('click', (event) => {
    Pomidorek.setActivity(activities.POMODORO, false)
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonPomodoro.classList.add('is-active')
});



const buttonResetActivity = document.getElementById('button-activity-reset')
const buttonStartActivity = document.getElementById('button-activity-start')
const buttonNextActivity = document.getElementById('button-activity-next')
const buttonIncreaseActivityDuration = document.getElementById('button-activity-increase-duration')

buttonStartActivity.addEventListener('click', (event) => {
    Pomidorek.isPaused() ? Pomidorek.unpause() : Pomidorek.pause()
})

buttonIncreaseActivityDuration.addEventListener('click', (event) => {
    Pomidorek.addTime(1 * 60 * 1000)
})

buttonResetActivity.addEventListener('click', (event) => {
    Pomidorek.reset()
})

const updateTimerValue = (timeLeftMillis) => {
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
Pomidorek.init();
Pomidorek.setPulseCallback(updateTimerValue)

