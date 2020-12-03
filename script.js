 // JavaScript function that wraps everything
 $(document).ready(function() {

    // define global variables

    var btnStartStop = $("#btn-startstop");
    var btnNext = $("#btn-next");
    var btnlinkStatus = $("#view-status");

    var uList = $("#ulist");
    var ansList = $("#anslist");

    var questNum = 1;
    var myTimer;
    var timeLeft;
    var totalCorrectAns = 0;
    var totalAttemptedQues = 0;


    // button to start and stop the quiz

    btnStartStop.on("click", function(event) {
        console.log($("#btn-startstop").html);

        if (btnStartStop.html() === "Start") {
            btnStartStop.html("Stop");
            questNum = 1;
            add_string_questions();
            myTimer = set_timer(1);
        }
        else {
            btnStartStop.html("Start");
            clearInterval(myTimer);
            $("#timer-display").text("Timer");
            init_main_menu();
        }
    });

    // Navigate to the next question with the Next button

    btnNext.on("click", function() {
        if (questNum === 1) {   
            totalAttemptedQues++;     
            add_array_questions();
            questNum++;        
        }
        else if (questNum === 2) {
            totalAttemptedQues++;
            add_dotnotation_questions();
            questNum++;       
        }
        else if (questNum === 3) {
            totalAttemptedQues++;
            summary_panel();        
        }
    });

    btnlinkStatus.on("click", function() {
        view_status();
    })

    // check timer if 0 or less then stop the quiz and reset

    function change_listner(value) {
        if (parseInt(value) <= 0) {
        
            alert("TIME OUT!");

            clearInterval(myTimer);

            btnStartStop.html("Start");
            $("#timer-display").text("Timer");
            init_main_menu();
        }
    }

    // initialize main screen

    init_main_menu();

    // each category has it's own questions

    function init_main_menu() {

        totalAttemptedQues = 0;
        totalCorrectAns = 0;

        $("#btn-next").hide();
        $("#ansPanel").text("");
        $("h3").html("The questions will come from the following categories");
        $("h4").html("You have 1 minute after clicking Start.  Every wrong answer will cost you 10 seconds.");

        uList.empty();
        uList.append($("<li id='quest-string'>Stringing along...</li>"));
        uList.append($("<li id='quest-array'>Arrays forever!</li>"));
        uList.append($("<li id='quest-dotnot'>Dot not, what?</li>"));  
        
        // Keep for future reference - this allows you to click on
        // the string and navigate to the questions
        //----------------------------------------------------------
        // var questString = $("#quest-string");
        // var questArray = $("#quest-array");
        // var questDotnot = $("#quest-dotnot");

        // questString.on("click", add_string_questions);
        // questArray.on("click", add_array_questions);
        // questDotnot.on("click", add_dotnotation_questions);
        //----------------------------------------------------------
    }

    // refresh panel and display string question
    // example of buttons

    function add_string_questions() {
        
        $("h3").html("Category is String");
        $("h4").html("True or False: The first position of any string is 1?");

        uList.empty();
        uList.append($("<li class='no-bullet'><button type='button' class='btn btn-dark'  id='btn-true'>True</button></li>"));

        uList.append($("<li id='quest-false' class='no-bullet'><button type='button' class='btn btn-dark'  id='btn-false'>False</button></li>"));

        var btnTrue = $("#btn-true");
        btnTrue.on("click", function(){
            check_answer("t", "f");
        });

        var btnFalse = $("#btn-false");
        btnFalse.on("click", function(){
            check_answer("f", "f");
        });
    }

    // refresh panel and display the array question
    // example of text input

    function add_array_questions() {
        
        $("h3").html("Category is Array");
        $("h4").html("Enter the symbols used to hold the array location.");

        $("#btn-next").hide();
        $("#ans-panel").text("");

        uList.empty();
        uList.append($("<li class='no-bullet'><input type='text' id='my-ans'/></li>"));

        uList.append($("<li class='no-bullet'><button type='button' class='btn btn-dark'  id='btn-submit'>Submit</button></li>"));
        // uList.append($("<li id='quest-false' class='no-bullet'><button type='button' class='btn btn-dark'  id='btn-false'>False</button></li>"));

        var btnSubmit = $("#btn-submit");
        btnSubmit.on("click", function(){
            check_answer($("#my-ans").val(), "[]");
        });
    }

    // refresh panel and display the dot notation question
    // example of check box

    function add_dotnotation_questions() {
        
        $("h3").html("Category is Dot Notation");
        $("h4").html("Which is the correct dot notation format?");

        $("#btn-next").hide();
        $("#ans-panel").text("");

        uList.empty();
        uList.append($("<li> str1.length()  <input type='checkbox' id='my-checkbox1'/></li>"));

        uList.append($("<li>str1-length  <input type='checkbox' id='my-checkbox2'/></li>"));

        uList.append($("<li>str1[length] <input type='checkbox' id='my-checkbox3'/></li>"));

        uList.append($("<br/>"));

        uList.append($("<li class='no-bullet'><button type='button' class='btn btn-dark'  id='btn-submit'>Submit</button></li>"));


        var btnSubmit = $("#btn-submit");
        btnSubmit.on("click", function(){
            var ans = "";
            if ($("#my-checkbox1").is(":checked")){
                ans = "1";
            }
            if ($("#my-checkbox2").is(":checked")){
                ans = ans + "2";
            }
            if ($("#my-checkbox3").is(":checked")){
                ans = ans + "3";
            }

            check_answer(ans, "1");
        });
    }

    // refresh panel and display the summary results

    function summary_panel() {
        
        clearInterval(myTimer);
        $("#timer-display").text("Timer");
        btnStartStop.html("Start");

        $("h3").html("Final Results");
        $("h4").html("Your score is: " + totalCorrectAns + "/" + totalAttemptedQues + " with " + timeLeft + " seconds left. Please sign below and submit.  Thank you!");

        $("#btn-next").hide();
        $("#ans-panel").text("");

        uList.empty();
        uList.append($("<li class='no-bullet'><input type='text' id='my-name'/></li>"));

        uList.append($("<li class='no-bullet'><button type='button' class='btn btn-dark'  id='btn-submit'>Submit</button></li>"));

        var btnSubmit = $("#btn-submit");

        btnSubmit.on("click", function(){
            console.log($("#my-name").val());
            localStorage.setItem("submitedName", $("#my-name").val());
            localStorage.setItem("numberCorrectAns", totalCorrectAns);
            localStorage.setItem("totalAttemptedQues", totalAttemptedQues);
            init_main_menu();
        });
    }

    function view_status() {
        
        clearInterval(myTimer);
        $("#timer-display").text("Timer");
        btnStartStop.html("Start");

        $("h3").html("Current Stats");
        $("h4").html("");

        $("#btn-next").hide();
        $("#ans-panel").text("");

        uList.empty();

        uList.append($("<li>" + localStorage.getItem("submitedName") + " " + localStorage.getItem("numberCorrectAns") + " out of " + localStorage.getItem("totalAttemptedQues") + " attempted questions." + "</li>"));  
    }

    // check answer for all questions, compare user input to correct answer

    function check_answer(user_input, correct_answer){
        var ansPanel = $("#ans-panel");

        if (user_input === correct_answer) {
            ansPanel.text("Correct!");
            totalCorrectAns++;
        }
        else {
            ansPanel.text("Nope! -10 seconds");

            // adjust timer by subtracting 10 sec from time left

            timeLeft = timeLeft - 10;
            clearInterval(myTimer);
            myTimer = set_timer(timeLeft/60);
        }
        $("#btn-next").show();
    }

    // could not get this change event to work need to figure out...
    // $("#timer-display").change(function() {
    //     if (parseInt(timeLeft) <= 0)
    //     alert("out of time!");
    // })


    // Timer

    function set_timer(startMin) {
        // Thank you W3 Schools.com!
        //https://www.w3schools.com/howto/howto_js_countdown.asp

        // Set the date we're counting down to + 1 minute

        var countDownDate = new Date().getTime() + (startMin * 60000);

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();
                
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
                
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            timeLeft = seconds;
                
            change_listner(seconds);

            $("#timer-display").text(minutes + "m " + seconds + "s ")
                
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                //document.getElementById("demo").innerHTML = "EXPIRED";
                $("#timer-display").text("TIME OUT!");
            }
        }, 1000);

        return x;
    }
 }); // end of wrapper