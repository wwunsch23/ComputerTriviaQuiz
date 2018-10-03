var quizQuestions = [
    {
        question: "In what year was the first gigabyte disk drive created?",
        name: "gigabyte",
        choices: ["1980","1963","2001","1994"],
        correctAnswer: 0
    }, {
        question: "RAM stands for?",
        name: "ram",
        choices: ["Rapidly Accessed Memory","Random Assignment Memory","Random Access Memory","Reduced Archive Memory"],
        correctAnswer: 2
    }, {
        question: "In what year did Charles Babbage invent his difference engine?",
        name: "babbage",
        choices: ["1888","1832","1847","1822"],
        correctAnswer: 3
    }, {
        question: "What was the first programming language?",
        name: "language",
        choices: ["Plankalkul","FORTRAN","FLOW-MATIC","COBOL"],
        correctAnswer: 0
    }, {
        question: "What was the name of the first major email virus?",
        name: "virus",
        choices: ["Becky","Melissa","Jessica","Stephanie"],
        correctAnswer: 1
    }, {
        question: "What does Error 404 mean?",
        name: "error",
        choices: ["Site access forbidden","Bad file request","Site not found","Timeout"],
        correctAnswer: 2
    }, {
        question: "How much did the first electronic computer weigh?",
        name: "weigh",
        choices: ["15,000 lbs","27 tons","43 tons","30,000 lbs"],
        correctAnswer: 1
    }
];

//var currentQuestion = 0;
var correctAnswers = 0;
var reset = false;
var intervalId;
var fullTime = 45;

var quizTimer = {

    time: fullTime,

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

    secondCount: function(myTimer) {
        // Decrease time by 1
        quizTimer.time--;
        
        var currentFormattedTime = quizTimer.timeConverter(quizTimer.time);
        myTimer.html(currentFormattedTime);

        if (quizTimer.time === 0) {
            quizTimer.timeUp();
            showResults(quizQuestions, $("#content"));
        }
    },

    startTimer: function(quizStatus) {
        var timeContainer = $("#timer-container").show();
        var timer = $("#time");

        if (quizStatus){
            quizTimer.time = fullTime;
        }
        
        timer.text(quizTimer.timeConverter(quizTimer.time));
        intervalId = setInterval(function () {
            quizTimer.secondCount(timer);
            }
            , 1000);
    },

    timeUp: function () {
        clearInterval(intervalId);
    }
};

function startQuiz(content) {
    var startText = $("#start-text").hide();
    var startButton = $("#start-button").hide();
    quizTimer.startTimer(reset);
    showQuestions(quizQuestions,content);
}

function showQuestions(questions, quizContainer){

	var output = [];
	var answers;

	for(var i=0; i<questions.length; i++){		
		// first reset the list of answers
		answers = [];

		// for each available answer to this question...
		for(answer in questions[i].choices){
			answers.push(
				'<label>'
					+ '<input type="radio" name='+questions[i].name+' value="'+answer+'">'
					+ questions[i].choices[answer]
				+ '</label>'
			);
        }

	// add the question and answers to the output array
		output.push(
			'<div class="question">' + questions[i].question + '</div>'
			+ '<div class="answers">' + answers.join('') + '</div>'
		);
    }
    
    output.push(
        '<button class="button" id="submit">Submit</button>'
    );

    //combine output array into one string of html and put it on the page
    quizContainer.append(output.join(''));

    $("#submit").on("click",function () {
        showResults(quizQuestions,quizContainer);
    });

}

function showResults(questions,quizContainer){
    reset = true;

    // gather answer containers from our quiz
    var answerContainers = $('.answers');
    
    // keep track of user's answers
    var userAnswer = "";
    var numCorrect = 0;
    var numWrong = 0;
    
    // for each question...
    for(var i=0; i<questions.length; i++){

        // find selected answer
        userAnswer = $('input[name="'+ questions[i].name +'"]:checked').val();
        //console.log("User Answer: "+userAnswer);
        
        // if answer is correct
        if(parseInt(userAnswer) === questions[i].correctAnswer){
            // add to the number of correct answers
            numCorrect++;
            
            // color the answers green
            answerContainers[i].style.color = "lightgreen";
        }
        // if answer is wrong or blank
        else{
            // add to the number of wrong answers
            numWrong++;
            // color the answers red
            answerContainers[i].style.color="red";
        }
    }

    // show number of correct answers out of total
    results.innerHTML = "<h2>Percent Correct: " + ((numCorrect/questions.length)*100).toFixed(0) +"%<br>Number Right: "+numCorrect +"<br>Number Wrong: "+numWrong;
    
    quizTimer.timeUp();


    $("#submit").remove();
    quizContainer.append(
        '<button class="button" id="playAgain">Play Again</button>'
    );

    $("#playAgain").on("click",function () {
        $("#results").empty();
        $(".question").remove();
        $('.answers').remove();
        $("#playAgain").remove();
        var content = $("#content");
        startQuiz(content);
    });
}


$(document).ready(function() {
    var content = $("#content");
    var results = $("#results");
    
    $("#start-button").on("click", function(){
        startQuiz(content);
    });
});




