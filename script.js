/* jslint asi:true, browser:true, esnext:true */

var News = {
    init: undefined,
    features: {footnotes: false},
    footnotes: document.documentElement.getElementsByClassName("footnote"),
    initFootnotes: undefined,
    processScroll: undefined
}

News.init = function(features) {
    if (!Array.isArray(features)) features = [features];
    for (let feature in News.features) {
        if (features.indexOf(feature) !== -1) News.features[feature] = true;
        else News.features[feature] = false;
    }
    if (News.features.footnotes) window.addEventListener("load", News.initFootnotes, false);
    if (News.features.footnotes) window.addEventListener("scroll", News.processScroll, false);
    document.documentElement.setAttribute("data-news-features", features.join(" "));
}

News.initFootnotes = function() {
    if (!News.features.footnotes) return;
    document.body.appendChild(document.createElement("footer")).id = "news-footnotes";
    for (let i = 0; i < News.footnotes.length; i++) {
        if (i < 10) {
            News.footnotes.item(i).setAttribute("data-news-counter-footnote", "0" + i);
            News.footnotes.item(i).getElementsByClassName("note").item(0).setAttribute("data-news-counter-footnote", "0" + i);
        }
        else {
            News.footnotes.item(i).setAttribute("data-news-counter-footnote", i);
            News.footnotes.item(i).getElementsByClassName("note").item(0).setAttribute("data-news-counter-footnote", i);
        }
    }
}

News.processScroll = function(e) {
    if (News.features.footnotes) {
        for (let footnote of News.footnotes) {
            if (footnote.getBoundingClientRect().bottom < 0 || footnote.getBoundingClientRect().top > window.innerHeight) {
                let note = document.getElementById("news-footnotes").querySelector("*[data-news-counter-footnote=" + footnote.getAttribute("data-news-counter-footnote") +"]");
                if (note) note.parentElement.removeChild(note);
            }
            else {
                let note = document.getElementById("news-footnotes").querySelector("*[data-news-counter-footnote=" + footnote.getAttribute("data-news-counter-footnote") +"]");
                let firstnote = document.getElementById("news-footnotes").querySelector("*[data-news-counter-footnote]");
                if (!note && firstnote && Number(footnote.getAttribute("data-news-counter-footnote")) < Number(firstnote.getAttribute("data-news-counter-footnote"))) document.getElementById("news-footnotes").insertBefore(footnote.getElementsByClassName("note").item(0).cloneNode(true), firstnote);
                else if (!note) document.getElementById("news-footnotes").appendChild(footnote.getElementsByClassName("note").item(0).cloneNode(true));
            }
        }
    }
}
