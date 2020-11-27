var btnStartStop = $("#btn-startstop");

var uList = $("#ulist");
var ansList = $("#anslist");



btnStartStop.on("click", function(event) {
    console.log($("#btn-startstop").html);

    if (btnStartStop.html() === "Start") {
        btnStartStop.html("Stop");
        add_string_questions();
        set_timer();
    }
    else {
        btnStartStop.html("Start");
        init_main_menu();
    }
})

//
// Each category has it's own list of questions

init_main_menu();

// initialize main menu
function init_main_menu() {

    $("h3").html("The questions will come from the following categories");
    $("h4").html("You have 2 minutes after clicking Start");

    uList.empty();
    uList.append($("<li id='quest-string'>Is it a string or not?</li>"));
    uList.append($("<li id='quest-array'>Arrays forever!</li>"));
    uList.append($("<li id='quest-dotnot'>Dot not, what?</li>"));  
    
    var questString = $("#quest-string");
    var questArray = $("#quest-array");
    var questDotnot = $("#quest-dotnot");

    questString.on("click", add_string_questions);
    questArray.on("click", add_array_questions);
    questDotnot.on("click", add_dotnot_questions);
}

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



function check_answer(user_input, correct_answer){
    var ansPanel = $("#ans-panel");
    var ansTimer = $("#ans-timer");

    if (user_input === correct_answer) {
        ansPanel.text("Correct!")
    }
    else {
        ansPanel.text("Nope!")
    }
}

function add_array_questions() {
    alert("array hi");
}

function add_dotnot_questions() {
    alert("dot not hi");
}

function set_timer() {
    // Thank you W3 Schools.com!
    //https://www.w3schools.com/howto/howto_js_countdown.asp

    // Set the date we're counting down to + 1 minute

    var countDownDate = new Date().getTime() + (1 * 60000);

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
        
    // Output the result in an element with id="demo"
    // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    // + minutes + "m " + seconds + "s ";
    $("#timer-display").text(minutes + "m " + seconds + "s ")
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        //document.getElementById("demo").innerHTML = "EXPIRED";
        $("#timer-display").text("TIME OUT!");
    }
    }, 1000);
}
