var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

var randomChosenColour;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level 0");
        nextSequence();
        started=true;
    }
});

$(".btn").on("click", function() {
    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);

    // console.log(randomChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name) {
    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function  startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
