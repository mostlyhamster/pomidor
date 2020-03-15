import  Pomidorek, { activities } from './pomidorek.js'

const buttonShortBreak = document.getElementById('button-activity-break-short')
const buttonLongBreak = document.getElementById('button-activity-break-long')
const buttonPomodoro = document.getElementById('button-activity-pomodoro')
const buttonResetActivity = document.getElementById('button-activity-reset')
const buttonStartActivity = document.getElementById('button-activity-start')
const buttonNextActivity = document.getElementById('button-activity-next')
const buttonIncreaseActivityDuration = document.getElementById('button-activity-increase-duration')

const activityButtons = [buttonShortBreak, buttonLongBreak, buttonPomodoro]

const timerElement = document.getElementById('timer')
const nextActivityName = document.getElementById('next-activity-name')

const updateTimerValue = (timeLeftMillis) => {
    timerElement.innerText = Pomidorek.getSuggestedTimerValue()
    nextActivityName.innerText = 'NEXT UP: ' +  Pomidorek.getNextActivity()
}

Pomidorek.start();
Pomidorek.setPulseCallback(updateTimerValue)

buttonShortBreak.addEventListener('click', (event) => {
    Pomidorek.startShortBreak()
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonShortBreak.classList.add('is-active')
});

buttonLongBreak.addEventListener('click', (event) => {
    Pomidorek.startLongBreak()
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonLongBreak.classList.add('is-active')
});

buttonPomodoro.addEventListener('click', (event) => {
    Pomidorek.startPomodoro()
    activityButtons.forEach(btn => btn.classList.remove('is-active'))
    buttonPomodoro.classList.add('is-active')
});

buttonStartActivity.addEventListener('click', (event) => {
    Pomidorek.isPaused() ? Pomidorek.unpause() : Pomidorek.pause()
})

buttonIncreaseActivityDuration.addEventListener('click', (event) => {
    Pomidorek.addTime(1 * 60 * 1000)
})

buttonResetActivity.addEventListener('click', (event) => {
    Pomidorek.reset()
})
