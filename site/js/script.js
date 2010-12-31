var xkcd = null;
var correctTitleChoice;

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

var getComic = function() {
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
    $("#status").fadeOut("fast");
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
        selectedLine = selectedLine.replace("{{", "").replace("}}", "").replace("alt: ", "").replace("rollover text: ", "").replace("Title text: ", "").replace("title text: ", "");
    }
    if (selectedLine.length > 15) {
        return {"text": selectedLine,
            "type": type};
    }
    else {
        return extractExerpt(transcript);
    }
}

var checkAnswer = function() {
    if ($(this).attr("id") == "title-choice-" + correctTitleChoice) {
        $("#status").html("Correct Answer!");
    }
    else {
        $("#status").html("Wrong Answer!");
    }
    $("#status").fadeIn("fast");
}
var init = function() {
    $.getJSON("xkcd.json", 
            function(data) { 
            xkcd = data;
            getComic(data);
            $("#reload").click(getComic);
            $("#title-choices span").click(checkAnswer);
            });
 }

$(document).ready(init);

