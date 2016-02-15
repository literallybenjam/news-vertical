/* jslint asi:true, browser:true, esnext:true */

var News = {
    features: {footnotes: false, metadata: false},
    footnotes: document.documentElement.getElementsByClassName("footnote"),
    getMetadataElements: undefined,
    init: undefined,
    initFootnotes: undefined,
    initMetadata: undefined,
    is_initialized: {footnotes: false, metadata: false},
    metadata_logos: {
        facebook: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text" x="0px" y="0px" viewBox="0 0 266.893 266.895"><path mask="url(#news-logo-facebook-f)" d="M248.082,262.307c7.854,0,14.223-6.369,14.223-14.225V18.812c0-7.857-6.368-14.224-14.223-14.224H18.812c-7.857,0-14.224,6.367-14.224,14.224v229.27c0,7.855,6.366,14.225,14.224,14.225H248.082z"/></svg>',
        twitter: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text" viewBox="0 0 182.66667 150.66667"><g transform="matrix(1.3333 0 0 -1.3333 0 150.67)"><g transform="scale(.1)"><g clip-path="url(#news-logo-twitter-clip)"><path d="m1366.9 989.39c-50.27-22.309-104.33-37.387-161.05-44.18 57.89 34.723 102.34 89.679 123.28 155.15-54.18-32.15-114.18-55.47-178.09-68.04-51.13 54.49-124.02 88.55-204.68 88.55-154.89 0-280.43-125.55-280.43-280.43 0-21.988 2.457-43.398 7.258-63.91-233.08 11.68-439.72 123.36-578.04 293.01-24.141-41.4-37.969-89.567-37.969-140.97 0-97.308 49.489-183.13 124.76-233.44-45.969 1.437-89.218 14.058-127.03 35.078-0.043-1.18-0.043-2.348-0.043-3.52 0-135.9 96.68-249.22 224.96-275-23.512-6.41-48.281-9.8-73.86-9.8-18.089 0-35.628 1.711-52.781 5 35.711-111.41 139.26-192.5 262-194.77-96.058-75.23-216.96-120.04-348.36-120.04-22.621 0-44.961 1.332-66.918 3.91 124.16-79.568 271.55-125.98 429.94-125.98 515.82 0 797.86 427.31 797.86 797.93 0 12.153-0.28 24.223-0.79 36.25 54.77 39.571 102.31 88.95 139.93 145.2"/></g></g></g></svg>'
    },
    processScroll: undefined
}

News.getMetadataElements = function() {
    return document.documentElement.querySelectorAll("*[data-news-metadata-url], *[data-news-metadata-twitter], *[data-news-metadata-facebook]");
}

News.init = function(features) {
    if (!Array.isArray(features)) features = [features];
    var feature;
    for (feature in News.features) {
        if (features.indexOf(feature) !== -1) News.features[feature] = true;
    }
    if (News.features.footnotes) window.addEventListener("load", News.initFootnotes, false);
    if (News.features.footnotes) window.addEventListener("scroll", News.processScroll, false);
    if (News.features.metadata) window.addEventListener("load", News.initMetadata, false);
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

News.initMetadata = function() {
    if (!News.features.metadata) return;
    document.body.insertAdjacentHTML('afterbegin', '\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="0" viewBox="0 0 266.893 266.895"><defs><mask id="news-logo-facebook-f" x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse"><rect fill="#fff" x="0" y="0" width="100%" height="100%"/><path fill="#000" d="M182.409,262.307v-99.803h33.499l5.016-38.895h-38.515V98.777c0-11.261,3.127-18.935,19.275-18.935l20.596-0.009V45.045c-3.562-0.474-15.788-1.533-30.012-1.533c-29.695,0-50.025,18.126-50.025,51.413v28.684h-33.585v38.895h33.585v99.803H182.409z"/></mask></defs></svg><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" viewBox="0 0 182.66667 150.66667"><defs><clipPath id="news-logo-twitter-clip" clipPathUnits="userSpaceOnUse"><path d="m0 10.012h1366.9v1110.9h-1366.9z"/></clipPath></defs></svg>\n');
    var elements = News.getMetadataElements();
    var i;
    var element;
    var metadata;
    for (i = 0; i < elements.length; i++) {
        element = elements.item(i);
        metadata = document.createElement("small");
        element.parentElement.insertBefore(metadata, element.nextSibling);
        element.parentElement.insertBefore(document.createTextNode(' '), metadata);
        if (element.hasAttribute("data-news-metadata-processed")) continue;
        metadata.appendChild(document.createTextNode('['));
        if (element.hasAttribute("data-news-metadata-url")) metadata.insertAdjacentHTML('beforeend', '<a href="' + element.getAttribute("data-news-metadata-url") + '" title="website" target="_blank">🔗</a>');
        if (element.hasAttribute("data-news-metadata-twitter")) {
            if (element.getAttribute("data-news-metadata-twitter")[0] === "@") element.setAttribute("data-news-metadata-twitter", element.getAttribute("data-news-metadata-twitter").substr(1));
            metadata.insertAdjacentHTML('beforeend', '<a href="https://twitter.com/' + element.getAttribute("data-news-metadata-twitter") + '" title="twitter" target="_blank">' + News.metadata_logos.twitter + '</a>');
        }
        if (element.hasAttribute("data-news-metadata-facebook")) metadata.insertAdjacentHTML('beforeend', '<a href="https://www.facebook.com/' + element.getAttribute("data-news-metadata-facebook") + '" title="facebook" target="_blank">' + News.metadata_logos.facebook + '</a>');
        metadata.appendChild(document.createTextNode(']'));
        element.setAttribute("data-news-metadata-processed", "");
    }
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
