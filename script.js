var btnStartStop = $("#btn-startstop");

var uList = $("#ulist")



btnStartStop.on("click", function(event) {
    console.log($("#btn-startstop").html);

    // if ($("#btn-startstop").html() === "Start")
    // $("#btn-startstop").html("Stop");
    // else
    // $("#btn-startstop").html("Start");

    if (btnStartStop.html() === "Start")
        $btnStartStop.html("Stop");
    else
        $btnStartStop.html("Start");
})

//
// Each category has it's own list of questions

init_main_menu();
// initialize main menu
function init_main_menu() {

    uList.empty();
    uList.append($("<li id='quest-string'>Is it a string?</li>"));
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
    uList.empty();
    $("h3").html("Category is String");
    $("h4").html("True or False: The first position of any string is 1?");
}

function add_array_questions() {
    alert("array hi");
}

function add_dotnot_questions() {
    alert("dot not hi");
}