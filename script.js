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
        facebook: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text" viewBox="0 0 266.893 266.895"><path mask="url(#news-logo-facebook-f)" d="M248.082,262.307c7.854,0,14.223-6.369,14.223-14.225V18.812c0-7.857-6.368-14.224-14.223-14.224H18.812c-7.857,0-14.224,6.367-14.224,14.224v229.27c0,7.855,6.366,14.225,14.224,14.225H248.082z"/></svg>',
        patreon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 541.4375 541.43744"><g mask="url(#news-metadata-patreon-mask)"><g transform="translate(-78.58618,-210.44369)"><path d="m 349.30488,210.44369 c -149.51545,0 -270.7187,121.20325 -270.7187,270.71875 l 0,270.4687 259.375,0 c 3.7608,0.155 7.5448,0.25 11.3437,0.25 149.5155,0 270.7188,-121.2032 270.7188,-270.7187 0,-149.5155 -121.2033,-270.71875 -270.7188,-270.71875 z"/></g></g></svg>',
        tumblr: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text" viewBox="0 0 29 39" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M26.1,32.2 L26.3,31.9 L23.9,25.1 C23.9,25 23.8,25 23.8,25 L19.2,25 C19.1,25 19,25.1 19,25 C18.9,24.8 19,24.4 19,24.1 L19,17 L25,17 L25,7 C25,7 19,7 19,7 L19,0 L8,0 C7.3,0 6.4,0.8 6.3,1.8 C5.8,5.9 4.1,7.5 0.5,8.7 L0.1,8.8 C0,8.9 0,8.9 0,9 L0,17.0000006 C0,17.1000006 0.1,17 0.1,17 L4,17 L4,24.8 C4,31.8 8.46560059,36.0067139 17.3656006,36.0067139 C22.0656006,36.0067139 25,33.7 26.1,32.2 Z M18.5,33.6 L18.3,33.6 C11.1,33.6 9,28.2005493 9,25.0005493 L9,15 C8.58245849,15 4.99298096,15 5,15 L4.99298096,10.0285034 C4.99298096,9.92850342 5.1,9.9 5.2,9.9 C8.9,8.5 11.3,6.7 11.9,2.3 C11.8,2 12,2 12,2 L16.8,2 L17,2 L17,9.00006104 L23.012207,9.00006104 L23.012207,15 L17,15 L17,24.0839844 C17,26.1839844 17.8,27.3 19.8,27.3 C20.6,27.3 21.5,27.1 22.4,26.8 C22.5,26.8 22.6,26.8 22.6,26.9 L24.1,31.3 L24.1,31.7 C23,32.8 20.7,33.6 18.5,33.6 Z"/></svg>',
        twitter: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text" viewBox="0 0 182.66667 150.66667"><g transform="matrix(1.3333 0 0 -1.3333 0 150.67)"><g transform="scale(.1)"><g clip-path="url(#news-logo-twitter-clip)"><path d="m1366.9 989.39c-50.27-22.309-104.33-37.387-161.05-44.18 57.89 34.723 102.34 89.679 123.28 155.15-54.18-32.15-114.18-55.47-178.09-68.04-51.13 54.49-124.02 88.55-204.68 88.55-154.89 0-280.43-125.55-280.43-280.43 0-21.988 2.457-43.398 7.258-63.91-233.08 11.68-439.72 123.36-578.04 293.01-24.141-41.4-37.969-89.567-37.969-140.97 0-97.308 49.489-183.13 124.76-233.44-45.969 1.437-89.218 14.058-127.03 35.078-0.043-1.18-0.043-2.348-0.043-3.52 0-135.9 96.68-249.22 224.96-275-23.512-6.41-48.281-9.8-73.86-9.8-18.089 0-35.628 1.711-52.781 5 35.711-111.41 139.26-192.5 262-194.77-96.058-75.23-216.96-120.04-348.36-120.04-22.621 0-44.961 1.332-66.918 3.91 124.16-79.568 271.55-125.98 429.94-125.98 515.82 0 797.86 427.31 797.86 797.93 0 12.153-0.28 24.223-0.79 36.25 54.77 39.571 102.31 88.95 139.93 145.2"/></g></g></g></svg>',
        youtube: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 68 48"><path mask="url(#news-metadata-youtube-mask)" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z"/></svg>'
    },
    processScroll: undefined
}

News.getMetadataElements = function() {
    return document.documentElement.querySelectorAll("*[data-news-metadata-url], *[data-news-metadata-twitter], *[data-news-metadata-facebook], *[data-news-metadata-tumblr], *[data-news-metadata-patreon], *[data-news-metadata-youtube]");
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
    document.body.insertAdjacentHTML('afterbegin', '\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="0" viewBox="0 0 266.893 266.895"><defs><mask id="news-logo-facebook-f" x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse"><rect fill="#fff" x="0" y="0" width="100%" height="100%"/><path fill="#000" d="M182.409,262.307v-99.803h33.499l5.016-38.895h-38.515V98.777c0-11.261,3.127-18.935,19.275-18.935l20.596-0.009V45.045c-3.562-0.474-15.788-1.533-30.012-1.533c-29.695,0-50.025,18.126-50.025,51.413v28.684h-33.585v38.895h33.585v99.803H182.409z"/></mask></defs></svg><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" viewBox="0 0 182.66667 150.66667"><defs><clipPath id="news-logo-twitter-clip" clipPathUnits="userSpaceOnUse"><path d="m0 10.012h1366.9v1110.9h-1366.9z"/></clipPath></defs></svg><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 541.4375 541.43744"><defs><mask id="news-metadata-patreon-mask" x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse"><rect fill="#FFF" x="0" y="0" width="100%" height="100%"/><g transform="translate(-78.58618,-210.44369)"><path fill="#000" d="m 349.30493,273.28744 c -114.80003,0 -207.875,93.07494 -207.875,207.875 l 0,123.90625 0,83.75 0,62.8125 83.1875,0 0,-270.25 c 0,-68.64109 55.64016,-124.3125 124.28125,-124.3125 68.64109,0 124.28125,55.67141 124.28125,124.3125 0,68.64109 -55.64016,124.28125 -124.28125,124.28125 -25.09566,0 -48.463,-7.45836 -68,-20.25 l 0,89.34375 c 13.09042,8.05513 42.97659,13.74429 78.03125,14.03125 110.32856,-5.03362 198.25,-96.05383 198.25,-207.625 0,-114.80006 -93.07493,-207.875 -207.875,-207.875 z m -8.71875,415.53125 c 2.8876,0.1191 5.80191,0.21875 8.71875,0.21875 3.07049,0 6.11821,-0.087 9.15625,-0.21875 l -17.875,0 z"/></g></mask></defs></svg><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 68 48"><defs><mask id="news-metadata-youtube-mask" x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse"><rect fill="#FFF" x="0" y="0" width="100%" height="100%"/><path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#000"/></mask></defs></svg>\n');
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
        if (element.hasAttribute("data-news-metadata-url")) metadata.insertAdjacentHTML('beforeend', '<a href="' + element.getAttribute("data-news-metadata-url") + '" title="Website" target="_blank">🔗</a>');
        if (element.hasAttribute("data-news-metadata-twitter")) {
            if (element.getAttribute("data-news-metadata-twitter")[0] === "@") element.setAttribute("data-news-metadata-twitter", element.getAttribute("data-news-metadata-twitter").substr(1));
            metadata.insertAdjacentHTML('beforeend', '<a href="https://twitter.com/' + element.getAttribute("data-news-metadata-twitter") + '" title="Twitter" target="_blank">' + News.metadata_logos.twitter + '</a>');
        }
        if (element.hasAttribute("data-news-metadata-facebook")) metadata.insertAdjacentHTML('beforeend', '<a href="https://www.facebook.com/' + element.getAttribute("data-news-metadata-facebook") + '" title="Facebook" target="_blank">' + News.metadata_logos.facebook + '</a>');
        if (element.hasAttribute("data-news-metadata-tumblr")) metadata.insertAdjacentHTML('beforeend', '<a href="https://' + element.getAttribute("data-news-metadata-tumblr") + '.tumblr.com/" title="Tumblr" target="_blank">' + News.metadata_logos.tumblr + '</a>');
        if (element.hasAttribute("data-news-metadata-youtube")) metadata.insertAdjacentHTML('beforeend', '<a href="https://www.youtube.com/user/' + element.getAttribute("data-news-metadata-youtube") + '" title="YouTube" target="_blank">' + News.metadata_logos.youtube + '</a>');
        if (element.hasAttribute("data-news-metadata-patreon")) metadata.insertAdjacentHTML('beforeend', '<a href="https://www.patreon.com/' + element.getAttribute("data-news-metadata-patreon") + '" title="Patreon" target="_blank">' + News.metadata_logos.patreon + '</a>');
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
