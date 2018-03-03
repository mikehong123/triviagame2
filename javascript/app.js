$(document).ready(function() {
    $("#intro").hide();
    $("#message").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); 
    $('.tooltipped').tooltip({ 
        delay: 50
    });


    $("#intro").fadeIn(1000 * 5, function() { 
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great job', 'On the money', "Nice!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "Warren Buffett bought his first stock when he was how many years old?",
            "c": ["30 years old", "10 years old", "20 years old"],
            "answer": 1
        },
        // question 2
        {
            "q": "Marvel Comics once owned the rights to what word?",
            "c": ["The Fantastic Four", "Spider-Man", "Zombie"],
            "answer": 2
        },
        // question 3
        {
            "q": "Coca-Cola logo is recongnized by what percentage of the world's population?",
            "c": ["75%", "50%", "94%"],
            "answer": 2
        },
        // question 4
        {
            "q": "Adding /4 to the end of Facebook's URL will take you to whose profile?",
            "c": ["Barack Obama", "Richard Branson", "Mark Zuckerberg"],
            "answer": 2
        },
        // question 5
        {
            "q": "Google was originally called?",
            "c": ["Backrub", "Colors", "SearchOpt"],
            "answer": 0
        },
        // question 6
        {
            "q": "What company is owned by Amazon?",
            "c": ["Apple.com", "Audible.com", "Shopper.com"],
            "answer": 1
        },
        // question 7
        {
            "q": "Candy Crush brings in how much in revenue per day?",
            "c": ["100 thousand", "633 thousand", "250 thousand"],
            "answer": 1
        },
        // question 8
        {
            "q": "If Bill Gates were a country, he'd be __th richest on earth?",
            "c": ["25", "10", "37"],
            "answer": 2
        },
        // question 9
        {
            "q": "McDonald's first menu items were...",
            "c": ["hot dogs", "hamburgers", "french fries"],
            "answer": 0
        },
        // question 10
        {
            "q": "What is the most followed retailer on Instagram?",
            "c": ["Verizon Wireless", "Nordstrom", "Victoria Secret"],
            "answer": 2
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); 
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); 
            userChoice = parseInt(userChoice);

            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#message').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#message').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});