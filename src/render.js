import  Pomidorek from './pomidorek'

const buttonShortBreak = document.getElementById('button-activity-break-short')
const buttonLongBreak = document.getElementById('button-activity-break-long')
const buttonPomodoro = document.getElementById('button-activity-pomodoro')
const buttonResetActivity = document.getElementById('button-activity-reset')
const buttonStartActivity = document.getElementById('button-activity-start')
const buttonNextActivity = document.getElementById('button-activity-next')
const buttonIncreaseActivityDuration = document.getElementById('button-activity-increase-duration')
const timerElement = document.getElementById('timer')
const nextActivityName = document.getElementById('next-activity-name')
const activityLogElement = document.getElementById('activity-log')
const activityLogItemTemplateElement = document.getElementById('activity-log-item-template')

const activityButtons = [buttonShortBreak, buttonLongBreak, buttonPomodoro]

const updateTimerValue = (timeLeftMillis) => {
    timerElement.innerText = Pomidorek.getSuggestedTimerValue()
    nextActivityName.innerText = 'NEXT UP: ' +  Pomidorek.getNextActivity()
    buttonStartActivity.innerText = Pomidorek.isPaused() ? 'Start' : 'Pause'
}

const changeActiveButton = (activity) => {
    activityButtons.forEach(btn => btn.classList.remove('is-active'))

    switch(activity) {
        case 'pomodoro':
            buttonPomodoro.classList.add('is-active')
            break;
        case 'short break':
            buttonShortBreak.classList.add('is-active')
            break;
        case 'long break':
            buttonLongBreak.classList.add('is-active')
            break;
        default:
            return
    }
}

Pomidorek.start();
Pomidorek.setPulseCallback(updateTimerValue)
Pomidorek.setActivityChangedCallback(changeActiveButton)

buttonShortBreak.addEventListener('click', (event) => {
    Pomidorek.startShortBreak()
});

buttonLongBreak.addEventListener('click', (event) => {
    Pomidorek.startLongBreak()
});

buttonPomodoro.addEventListener('click', (event) => {
    Pomidorek.startPomodoro()
});

buttonStartActivity.addEventListener('click', (event) => {
    Pomidorek.isPaused() ? Pomidorek.unpause() : Pomidorek.pause()
    buttonStartActivity.innerText = Pomidorek.isPaused() ? 'Start' : 'Pause'
})

buttonIncreaseActivityDuration.addEventListener('click', (event) => {
    Pomidorek.addTime(1 * 60 * 1000)
})

buttonResetActivity.addEventListener('click', (event) => {
    Pomidorek.reset()
})

buttonNextActivity.addEventListener('click', () => {
    Pomidorek.startNextActivity();
})

window.addEventListener('resize', (e) => {
  
})

window.addEventListener('activity', (e) => {
    const log = Pomidorek.getActivityLog()
    activityLogElement.innerHTML = ''
    log.forEach(element => {
        const itemNode = document.importNode(activityLogItemTemplateElement.content, true)
        itemNode.getElementById('time').innerText = element.date.toTimeString().split(' ')[0]
        itemNode.getElementById('activity').innerText = element.activity
        activityLogElement.prepend(itemNode)
    })
})