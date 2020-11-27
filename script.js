var btnStartStop = $("#btn-startstop");

var uList = $("#ulist");
var ansList = $("#anslist");



btnStartStop.on("click", function(event) {
    console.log($("#btn-startstop").html);

    if (btnStartStop.html() === "Start") {
        btnStartStop.html("Stop");
        add_string_questions();
    }
    else
        btnStartStop.html("Start");
})

//
// Each category has it's own list of questions

init_main_menu();

// initialize main menu
function init_main_menu() {

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
        check_answer("t", "t");
    });
}


// var falseButton = $("#false-button");

// trueButton.on("click", check_answer("t", "f"));


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
