var trivia = {
	//Number of correct questions
	correct: 0,

	//Number of incorrect questions
	incorrect: 0,

	//Number of missed questions (time ran out)
	missed: 0,

	//Number of the current question being asked starting with 0
	questionNumber: 0,

	//List of questions
	questions:
		[
			{
				question: 'What is Pokemon #1?',
				answerA: 'Pikachu',
				answerB: 'Suicune',
				answerC: 'Lapras',
				answerD: 'Bulbasaur',
				correct: 'Bulbasaur',
				img: 'bulbasaur.gif'

			},
			{
				question: 'What company develops the Pokemon games?',
				answerA: 'Square Enix',
				answerB: 'Nintendo',
				answerC: 'Game Freak',
				answerD: 'Sega',
				correct: 'Game Freak',
				img: 'gamefreak.png'
			},
			{
				question: 'How many Pokemon movies are there?',
				answerA: '6',
				answerB: '13',
				answerC: '19',
				answerD: 'More than 20',
				correct: '19',
				img: 'movie.jpg'
			},
			{
				question: 'Who is the professor of the Sinnoh region?',
				answerA: 'Professor Rowan',
				answerB: 'Professor Elm',
				answerC: 'Professor Oak',
				answerD: 'Professor Sycamore',
				correct: 'Professor Rowan',
				img: 'rowan.png'
			},
			{
				question: 'How many Pokemon are there in total (not including upcoming Generation VII)?',
				answerA: '151',
				answerB: '586',
				answerC: '721',
				answerD: '863',
				correct: '721',
				img: 'all-pokemon.png'
			},
			{
				question: 'Which is not a Fire Pokemon?',
				answerA: 'Darumaka',
				answerB: 'Torterra',
				answerC: 'Entei',
				answerD: 'Braixen',
				correct: 'Torterra',
				img: 'torterra.png'
			},
			{
				question: 'The Generation II games introduced what new Pokemon type?',
				answerA: 'Wind',
				answerB: 'Grass',
				answerC: 'Dragon',
				answerD: 'Dark',
				correct: 'Dark',
				img: 'dark.jpg'
			}
		],

	//Dsplay time remaining, and decrease time by 1 second. Question parameter: true for questions, false for results
	beginCountdown: function(time,question) {
		$('.timer').html('Time Remaining: ' + time);
		counter = setInterval(function () {
			time--;
			$('.timer').html('Time Remaining: ' + time);

			//When countdown gets to 0
			if(time === 0) {
				//If countdown is for a question, increased number of missed questions and move to next question
				if (question) {
					trivia.missed++;
					trivia.nextQuestion();
				}

				//If not a question (a.k.a. results page), move to next question
				else {
					trivia.nextQuestion();
				}
			}
		},1000);
	},

	//Stop countdowns between questions
	stopCountdown: function() {
		clearInterval(counter);
	},

	//Show questions
	game: function() {
		//If there are unanswered questions, run code
		if (trivia.questionNumber < trivia.questions.length) {
			//Begin countdown
			trivia.beginCountdown(30,true);

			//Create new variable to make it easier to reference questionNumber
			number = trivia.questionNumber;

			//Add 1 to questionNumber for displaying the number of the question in normal integers
			normalNumber = number + 1;

			//Display question
			$('.show-question').append('<h2 class="question question-' + normalNumber + '">' + normalNumber + ') ' + trivia.questions[number].question + '</h2>');

			//Disply answers
			$('.show-question').append('<div class="answer question-' + normalNumber + ' answerA" data-answer="' + trivia.questions[number].answerA + '">A) ' + trivia.questions[number].answerA + '</div>');
			$('.show-question').append('<div class="answer question-' + normalNumber + ' answerB" data-answer="' + trivia.questions[number].answerB + '">B) ' + trivia.questions[number].answerB + '</div>');
			$('.show-question').append('<div class="answer question-' + normalNumber + ' answerC" data-answer="' + trivia.questions[number].answerC + '">C) ' + trivia.questions[number].answerC + '</div>');
			$('.show-question').append('<div class="answer question-' + normalNumber + ' answerD" data-answer="' + trivia.questions[number].answerD + '">D) ' + trivia.questions[number].answerD + '</div>');
			
			//When an answer is clicked
			$('.answer').click(function() {
				//Log the answer into a variable
				answer = $(this).data('answer');

				//If answer is correct
				if (answer == trivia.questions[number].correct) {
					trivia.correct++;

					//Stop previous countdown
					trivia.stopCountdown();

					//Begin 3 second countdown
					trivia.beginCountdown(3,false);

					$('.show-question').empty();
					$('.show-question').append('<h2>Correct!</h2>');
					$('.show-question').append('<div class="results-img"><img src="assets/images/' + trivia.questions[number].img + '" alt="' + trivia.questions[number].correct + '"></div>');
				}
				//Else if answer is incorrect
				else {
					trivia.incorrect++;

					//Stop previous countdown
					trivia.stopCountdown();

					//Begin 3 second countdown
					trivia.beginCountdown(3,false);

					$('.show-question').empty();
					$('.show-question').append('<h2>Wrong!</h2>');
					$('.show-question').append('<div style="text-align: center;">Correct answer is ' + trivia.questions[number].correct + '.</div><br>');
					$('.show-question').append('<div class="results-img"><img src="assets/images/' + trivia.questions[number].img + '" alt="' + trivia.questions[number].correct + '"></div>');
				}
			});
		}

		//Else end game
		else {
			trivia.endGame();
		}
	},

	//Reset '.show-question' area, display next question by calling trivia.game(), and reset timer
	nextQuestion: function() {
		trivia.stopCountdown();
		$('.show-question').empty();
		trivia.questionNumber++;
		trivia.game();
	},

	//Ends game and shows stats
	endGame: function() {
		$('.timer').empty();
		$('.show-question').append('<h2>The End! How\'d You Do?</h2>');
		$('.show-question').append('<h3>Correct: ' + trivia.correct + '</h3>');
		$('.show-question').append('<h3>Incorrect: ' + trivia.incorrect + '</h3>');
		$('.show-question').append('<h3>Missed: ' + trivia.missed + '</h3>');
		$('.button').html('<div class="reset-game"><button type="button" class="btn btn-danger" id="reset-game">Play Again?</div>');

		//Onclick event for 'play again' button
		$('#reset-game').click(function() {
			trivia.resetGame();
		});
	},

	resetGame: function() {
		//Reset variables
		trivia.correct = 0;
		trivia.incorrect = 0;
		trivia.missed = 0;
		trivia.questionNumber = 0;

		//Clear '.show-question' and call game() again
		$('.show-question, .button').empty();
		trivia.game();
	}
};

window.onload = function(){
	//When 'start game' button is clicked
	$('#start-game').on('click', function() {
		//Begin game
		trivia.game();

		//Remove 'start game' button
		$('#start-game').remove();
	});
};