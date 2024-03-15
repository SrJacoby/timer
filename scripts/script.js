const timerInput = document.querySelector('input#timer-input')
const timerButton = document.querySelector('button#timer-button')
const timerResult = document.querySelector('div#timer-result-container')

let countdown

timerButton.addEventListener('click', function(){
    const timeValue = timerInput.value //Pegamos o valor do input

    if(!timeValue || !isValidTime(timeValue)){
        alert('Por favor, insira um tempo válido.')
        return
    }

    if(!timeValue.trim()){
        alert('Por favor, preencha todos os campos.')
        return
    }


    const timeInSeconds = convertTimeToSeconds(timeValue) //Pega o valor em horas e transforma tudo em segundos

    
    if(timerButton.textContent === 'Enviar'){ //Criando um if para quando o texto estar escrito 'Enviar'

    timerInput.style.display = 'none'  //esse é pra sumir com o timerInput quando o botão é clicado

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

function isValidTime(time){
    const timeParts = time.split(':')
    if (timeParts.length !== 3) {
        return false
    }
    const [hours, minutes, seconds] = timeParts.map(part => parseInt(part,10))

    if(isNaN(hours) || isNaN(minutes) || isNaN(seconds)){
        return false
    }
    if(hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59){
        return false
    }
    if(timeParts[2].length === 0){
        return false
    }
    return true
}


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