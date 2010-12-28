var xkcd = null;

var getComic = function() {
    var selID = Math.floor(1 + (Math.random() * xkcd.count));
    for(var i=0; i < 5; i++) {
        var val = Math.floor(Math.random() * xkcd.count);
        $("#title-choice-" + (i+1)).html(xkcd.comics[val].title);
    }
    var correctTitleChoice = Math.floor(1 + (Math.random() * 5));
    $("#title-choice-" + correctTitleChoice).html(xkcd.comics[selID].title);
    
    for(var i=0; i < 5; i++) {
        var val = Math.floor(Math.random() * xkcd.count);
        $("#alt-choice-" + (i+1)).html(xkcd.comics[val].alt);
    }
    var correctAltChoice = Math.floor(1 + (Math.random() * 5));
    $("#alt-choice-" + correctAltChoice).html(xkcd.comics[selID].alt);
    $("#qimg").attr("src", xkcd.comics[selID].image_src);
}

var init = function() {
    $.getJSON("xkcd.json", 
            function(data) { 
            xkcd = data;
            getComic(data);
            $("#reload").click(getComic);
            });
 }

$(document).ready(init);

