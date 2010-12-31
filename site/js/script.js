var xkcd = null;
var correctTitleChoice;
var curScore = 0.0;

var showImage = function(url) {
    var img = new Image();
    $("#status").show();
    $(img).load(function() {
            $("#status").hide();
            $("#qimg").empty().append(this);
            $("#game-area").fadeIn();
            })
    .attr("src", url);
}

var reloadQuestion = function() {
    var selID = Math.floor(1 + (Math.random() * xkcd.count));
    for(var i=0; i < 5; i++) {
        var val = Math.floor(Math.random() * xkcd.count);
        $("#title-choice-" + (i+1)).html(xkcd.comics[val].title);
    }
    correctTitleChoice = Math.floor(1 + (Math.random() * 5));
    $("#title-choice-" + correctTitleChoice).html(xkcd.comics[selID].title);

    var exerpt = extractExerpt(xkcd.comics[selID].transcript);
    $("#exerpt-text").html(exerpt.text);
    $("#exerpt-type").html(exerpt.type);
    $("#result").fadeOut("fast");
}

var extractExerpt = function(transcript) {
    var lines = transcript.split("\n");
    var selID = Math.floor(Math.random() * lines.length);
    var selectedLine = lines[selID];
    var type = "dialogue";
    if (selectedLine[0] == "[") {
        type = "scene";
        selectedLine = selectedLine.replace("[[", "").replace("]]", "");
    }
    else if (selectedLine[0] == "{") {
        type = "alt";
        // WHAT THE FUCK AM I THINKING?
        selectedLine = selectedLine.replace("{{", "").replace("}}", "").replace("alt: ", "").replace("rollover text: ", "").replace("Title text: ", "").replace("title text: ", "").replace("title-text: ", "").replace("alt text: ", "").replace("alt-text: ", "");
    }
    if (selectedLine.length > 15) {
        return {"text": selectedLine,
            "type": type};
    }
    else {
        return extractExerpt(transcript);
    }
}

var addScore = function(value) {
    curScore += value;
    $("#score").html(curScore);
}

var checkAnswer = function() {
    if ($(this).attr("id") == "title-choice-" + correctTitleChoice) {
        $("#result").html("Correct Answer!").attr("class", "correct");
        $("#result").fadeIn("fast");
        addScore(1);
        reloadQuestion(xkcd);
    }
    else {
        $("#result").html("Wrong Answer!").attr("class", "wrong");
        addScore(-0.5);
        $("#result").fadeIn("fast");
    }
}
var init = function() {
    $.getJSON("xkcd.json", 
            function(data) { 
            xkcd = data;
            reloadQuestion(data);
            $("#reload").click(reloadQuestion);
            $("#title-choices a").click(checkAnswer);
            });
 }

$(document).ready(init);

