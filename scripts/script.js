const timerInput = document.querySelector('input#timer-input')
const timerButton = document.querySelector('button#timer-button')
const timerResult = document.querySelector('div#timer-result-container')

let countdown

timerButton.addEventListener('click', function(){
    const timeValue = timerInput.value

    const timeInSeconds = convertTimeToSeconds(timeValue)

    if(timerButton.textContent === 'Enviar'){

    timerInput.style.display = 'none'

    timerResult.style.display = 'block'

    timerButton.textContent = 'Voltar'

    startTimer(timeInSeconds)
} else if (timerButton.textContent === 'Voltar'){
    clearInterval(countdown)

    timerInput.style.display = 'block'

    timerResult.style.display = 'none'

    timerButton.textContent = 'Enviar'
}
})

function convertTimeToSeconds(time){
    const [hours, minutes, seconds] = time.split(':')
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
}

function startTimer(duration){
    let timer = duration

    countdown = setInterval(function () {
        const hours = Math.floor(timer / 3600)
        const minutes = Math.floor((timer % 3600) / 60)
        const seconds = timer % 60

        const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`

        timerResult.innerHTML = `<h2>${formattedTime}</h2>`

        if(--timer < 0){
            clearInterval(countdown)
            alert('Tempo encerrado!')
        }
    }, 1000)
}

function padZero(num){
    return (num<10?'0':'') + num
}