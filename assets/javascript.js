var screen = 1;
var timer = 75;
var inteval;


function nextscreen(screenNumber){
    clearInterval(interval);
    document.getElementById('screen${currentScreen}').style.display = "none";
    document.getElementById('screen$screenNumber}').style.display = "block";
    currentScreen = screenNumber;
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        document.getElementById("timer").textContent = `Tiempo restante: ${secondsLeft} segundos`;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            evaluateAnswer('tiempo_agotado');
            nextScreen(currentScreen + 1);
        }
    }, 1000);

    // Cambio en la lógica: Restar 5 segundos si el usuario se equivoca
    document.querySelectorAll('.screen button').forEach(function(button) {
        button.addEventListener('click', function() {
            const selectedButtonId = button.id;
            if (selectedButtonId !== 'correctButtonId') {
                secondsLeft -= 5;
                if (secondsLeft < 0) secondsLeft = 0;
            }
        });
    });
}

function evaluateAnswer(selectedButtonId) {
    // Lógica para evaluar la respuesta aquí
}
