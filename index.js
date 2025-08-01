var colors = ["red", "yellow", "green", "blue"];
var gamePattern = [];    // stores the generated sequence
var userPattern = [];    // stores the user's clicks
var level = 0;

// Start game on keypress
$(document).keypress(function () {
    if (level === 0) {   // start only if game hasn't started
        nextSequence();
    }
});

// User clicks a button
$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Check user's answer
    checkAnswer(userPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentIndex) {
    if (userPattern[currentIndex] === gamePattern[currentIndex]) {
        // If user has finished the whole sequence correctly
        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        // Wrong answer
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");

        // Reset the game
        startOver();
    }
}

// Function to generate the next step in the sequence
function nextSequence() {
    userPattern = []; // reset user clicks for this level
    level++;
    $("h1").text("Level " + level);

    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    gamePattern.push(randomColor); // add to the sequence

    // Show the entire sequence so far
    gamePattern.forEach(function (color, index) {
        setTimeout(function () {
            animatePress(color);
            playSound(color);
        }, index * 500); // delay each color
    });
}

// Play sound for color
function playSound(color) {
    var audio = new Audio(color + ".mp3");
    audio.play();
}

// Animate button press
function animatePress(color) {
    $("." + color).addClass("pressed");
    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 100);
}

// Restart game
function startOver() {
    level = 0;
    gamePattern = [];
    userPattern = [];
}

