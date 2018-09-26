
$(document).ready(function() {

    var intervalId;

    var quizTimer = {

        time: 20,

        timeConverter: function(t) {

            //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
            seconds = "0" + seconds;
            }

            if (minutes === 0) {
            minutes = "00";
            }

            else if (minutes < 10) {
            minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        },

        secondCount: function() {

            // Decrease time by 1
            quizTimer.time--;
            
            var currentFormattedTime = quizTimer.timeConverter(quizTimer.time);
            $("#time").text(currentFormattedTime);
            console.log(quizTimer.time);
            if (quizTimer.time === 0) {
                console.log("Time is up!");
                quizTimer.timeUp();
            }
        },

        startTimer: function() {

        //  TODO: Use setInterval to start the count here and set the clock to running.
            intervalId = setInterval(quizTimer.secondCount, 1000);
            console.log(intervalId);
        },

        timeUp: function () {
            clearInterval(intervalId);
            alert("Your time's up!");
            
            //call function to check answers

        }

    };

    console.log(quizTimer.time)
    quizTimer.startTimer();

});    


