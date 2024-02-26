
var segundos = 55;
var minutos = 24;
var state = "paused";

var display = document.getElementById("display");

var selectTime = document.getElementById("timer-options");

function set_state(newState){
    state = newState;
    if (newState == 'intervalo'){
        minutos = 15;
        segundos = 0;
    }
}

function setTime(){
    switch (state){
        case 'focus':
            segundos++
            if(segundos >= 60){
                segundos = 0
                minutos++
            }
            if(minutos == 25){
                set_state("intervalo")
            }
            break
        case 'intervalo':
            if(segundos == 0){
                segundos = 60;
                minutos--;
            }
            segundos--
    }



    display.textContent = ((minutos < 10 ? "0" : "") + minutos + ":" + (segundos < 10 ? "0" : "") + segundos)
}
function start(){ 
    if(state != "focus"){
        timer = setInterval(setTime, 1000);
    }
    set_state("focus");
}
function reset(){
    segundos = 0
    minutos = 0
    display.textContent = "00:00"
    clearInterval(timer)
    set_state("paused");
}
function pause(){
    clearInterval(timer)
    set_state("paused");

}
