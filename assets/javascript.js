var currentScreen = 1;
var secondsLeft = 75;
var timerInterval;
var score = 0;
var questionsAnswered = 0;
var highScores = [];

document.addEventListener("DOMContentLoaded", function() {
    
    updateHighScoresList();
});
document.getElementById("viewHighScoresLink").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior (scrolling to top)
    // Navigate to the high scores screen (screen8 in this case)
    nextscreen8();

    // Populate the high scores list here (you should have a function to do this)
    updateHighScoresList();
  });

function nextscreen(screenNumber) {
    clearInterval(timerInterval);
    // Oculta todas las pantallas
    document.querySelectorAll('.screen, .screenStart').forEach(function(screen) {
        screen.classList.remove('current');
    });

    // Muestra solo la pantalla actual
    const currentScreenElement = document.getElementById(`screen${screenNumber}`);
    if (currentScreenElement) {
        currentScreenElement.classList.add('current');
    }

    currentScreen = screenNumber;

    // Start the timer on screens 2 to 8
    if (currentScreen >= 2 && currentScreen <= 8) {
        startTimer();
    }
}

function startTimer() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        document.getElementById("timer").textContent = `Tiempo restante: ${secondsLeft} segundos`;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            evaluateAnswer('tiempo_agotado');
            nextscreen(currentScreen + 1);
        }
    }, 1000);
}

// Add the click event handler to the sixth screen
const screen6Element = document.getElementById('screen6');
if (screen6Element) {
    screen6Element.addEventListener('click', function() {
       
        clearInterval(timerInterval);
    });
}

document.addEventListener("DOMContentLoaded", function() {
   
});

function nextscreen2() {
    nextscreen(2);
}
function nextscreen3() {
    nextscreen(3);
}
function nextscreen4() {
    nextscreen(4);
}
function nextscreen5() {    
    nextscreen(5);
}
function nextscreen6() {
    document.getElementById("QuestionResult6").style.display = "block";
    nextscreen(6);
}
function nextscreen7() {
     // Calculate the final score here based on your scoring logic
    var finalScore = calculateFinalScore(); // Replace 'calculateFinalScore' with your scoring logic

    // Get the initials entered by the user
    var initials = document.getElementById("initialsInput").value;

    // Store the score and initials in the highScores array
    highScores.push({ initials: initials, score: finalScore });

    // Sort the high scores list from highest to lowest
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    // Update the high scores list on screen 8
    updateHighScoresList();

    // Display the final score on screen 7
    document.getElementById("grade").textContent = finalScore;

    // Show screen 7
    nextscreen(7);
}
function nextscreen8() {
    nextscreen(8);
}

function evaluateAnswer(selectedButtonId) {
    var resultLabelId = ''; // Variable to store the result label ID
    var AnswerStr

    // Check if the clicked button is the correct one
    if (selectedButtonId === 'correct') {
        score += 20; // Add 20 points if the answer is correct
        resultLabelId = `QuestionResult${currentScreen}`; // Get the ID of the result label
        AnswerStr = "Correct, you earned 20 points.";
    } else {
        secondsLeft -= 5; // Deduct 5 seconds if the answer is incorrect
        if (secondsLeft < 0) secondsLeft = 0; // Ensure the timer doesn't go negative
        resultLabelId = `QuestionResult${currentScreen}`; // Get the ID of the result label
        AnswerStr = "Incorrecto, perdiste 5 segundos.";
    }
    /// Display the result in the corresponding label
    document.getElementById("highScoresList").textContent = AnswerStr;

    // Increment the number of questions answered
    questionsAnswered++;

    // Check if all questions have been answered (assuming 5 questions)
    if (questionsAnswered >= 5) {
        // Stop the timer when all questions are answered
        clearInterval(timerInterval);
        // Display the final score screen
        nextscreen7();
    } else {
        // Move to the next question (e.g., screen3)
        nextscreen(currentScreen + 1);
    }
    console.log('evaluateAnswer function is running. Current Score: ' + score);

}


function calculateFinalScore() {
    // Calculate the final score based on the number of correct answers (20 points each)
    var finalScore = score; // Assuming 'score' already contains the cumulative score

    return finalScore;
}

function updateHighScoresList() {
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = highScores[i].initials + ": " + highScores[i].score;
        highScoresList.appendChild(listItem);
    }
}
function clearScores() {
    // Clear the high score list by setting its innerHTML to an empty string
    document.getElementById("highScoresList").innerHTML = "";
    // Optionally, you can clear any saved high scores from local storage if you're using it
    localStorage.removeItem("highScores");
}