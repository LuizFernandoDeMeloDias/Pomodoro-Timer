var segundos = 10;

var minutos = 0;

const ESTADO = {
    FOCO: "foco",
    PAUSADO: "pausado",
    INTERVALO: "intervalo",
    PAUSADO_INTERVALO: "pausado_intervalo",
}

let estado = ESTADO.PAUSADO_INTERVALO 

var display = document.getElementById("display");

var show_state = document.getElementById("show-state");

var intervalTimer = 0;


function tempoDeIntervalo(){

    let optionValue = document.getElementById("timer-options").value;
    console.log(optionValue);
    switch (optionValue){
        case "1":
            intervalTimer = 15;
            break
        case "2":
            intervalTimer = 5;
            break
        case "3":
            intervalTimer = 3;
            break
    }
    return intervalTimer;

}

function setTimer(estado){
    switch(estado){
        
        case ESTADO.FOCO:
            segundos = 0;
            minutos = 0;
        break
        case ESTADO.INTERVALO:
            segundos = 0;
            minutos = tempoDeIntervalo();
        break
    }
}



function updateTime() {
    switch (estado) {
        case ESTADO.FOCO:
            segundos++;
            if (segundos >= 60) {
                segundos = 0;
                minutos++;
            }
            if (minutos === 25) {
                clearInterval(timer);
                estado = ESTADO.INTERVALO;
                setTimer(estado);
                timer = setInterval(updateTime, 1000);
            }
            break;
        case ESTADO.INTERVALO:
            if (segundos === 0) {
                segundos = 60;
                minutos--;
            }
            segundos--;
            if (minutos === 0 && segundos === 0) {
                clearInterval(timer);
                estado = ESTADO.PAUSADO;
                display.textContent = "00:00";
            }
            break;
    }
    display.textContent = ((minutos < 10 ? "0" : "") + minutos + ":" + (segundos < 10 ? "0" : "") + segundos);
}

function iniciar(){ 
    if(estado === ESTADO.PAUSADO){
        estado = ESTADO.FOCO;
        timer = setInterval(updateTime, 1000, ESTADO.FOCO);
    }

    if (estado === ESTADO.PAUSADO_INTERVALO){
        estado = ESTADO.INTERVALO
        timer = setInterval(updateTime, 1000, ESTADO.INTERVALO);
    }
    
}


function reset(){
    segundos = 0
    minutos = 0
    display.textContent = "00:00"
    clearInterval(timer)
    set_state("paused");
}


function pausar(){
    if (estado === ESTADO.FOCO){
        clearInterval(timer);
        estado = ESTADO.PAUSADO
    }
    if (estado === ESTADO.INTERVALO){
        clearInterval(timer);
        estado = ESTADO.PAUSADO_INTERVALO
    }
}


