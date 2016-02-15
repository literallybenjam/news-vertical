/* jslint asi:true, browser:true, esnext:true */

var News = {
    features: {footnotes: false},
    footnotes: document.documentElement.getElementsByClassName("footnote"),
    init: undefined,
    initFootnotes: undefined,
    is_initialized: {footnotes: false},
    processScroll: undefined
}

News.init = function(features) {
    if (!Array.isArray(features)) features = [features];
    var feature;
    for (feature in News.features) {
        if (features.indexOf(feature) !== -1) News.features[feature] = true;
        else News.features[feature] = false;
    }
    if (News.features.footnotes) window.addEventListener("load", News.initFootnotes, false);
    if (News.features.footnotes) window.addEventListener("scroll", News.processScroll, false);
    document.documentElement.setAttribute("data-news-features", features.join(" "));
}

News.initFootnotes = function() {
    if (!News.features.footnotes) return;
    var i;
    document.body.appendChild(document.createElement("footer")).id = "news-footnotes";
    document.body.appendChild(document.createElement("div")).id = "news-footnotes-padding";
    for (i = 0; i < News.footnotes.length; i++) {
        if (i < 10) {
            News.footnotes.item(i).setAttribute("data-news-counter-footnote", "0" + (i+1));
            News.footnotes.item(i).getElementsByClassName("note").item(0).setAttribute("data-news-counter-footnote", "0" + (i+1));
        }
        else {
            News.footnotes.item(i).setAttribute("data-news-counter-footnote", (i+1));
            News.footnotes.item(i).getElementsByClassName("note").item(0).setAttribute("data-news-counter-footnote", (i+1));
        }
    }
    News.is_initialized.footnotes = true;
    News.processScroll();
}

News.processScroll = function(e) {
    if (News.features.footnotes && News.is_initialized.footnotes) {
        var footnote;
        var note;
        var firstnote;
        var i;
        for (i = 0; i < News.footnotes.length; i++) {
            footnote = News.footnotes.item(i);
            if (footnote.getBoundingClientRect().bottom < 0 || footnote.getBoundingClientRect().top > window.innerHeight) {
                note = document.getElementById("news-footnotes").querySelector('*[data-news-counter-footnote="' + footnote.getAttribute("data-news-counter-footnote") +'"]');
                if (note) note.parentElement.removeChild(note);
            }
            else {
                note = document.getElementById("news-footnotes").querySelector('*[data-news-counter-footnote="' + footnote.getAttribute("data-news-counter-footnote") +'"]');
                firstnote = document.getElementById("news-footnotes").querySelector("*[data-news-counter-footnote]");
                if (!note && firstnote && Number(footnote.getAttribute("data-news-counter-footnote")) < Number(firstnote.getAttribute("data-news-counter-footnote"))) document.getElementById("news-footnotes").insertBefore(footnote.getElementsByClassName("note").item(0).cloneNode(true), firstnote);
                else if (!note) document.getElementById("news-footnotes").appendChild(footnote.getElementsByClassName("note").item(0).cloneNode(true));
            }
        }
    }
}
