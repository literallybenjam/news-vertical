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
        facebook: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQMAAADdiHD7AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB%2BACFRcvEaZS6IUAAACVSURBVEjH7daxDYQwDAXQH1GkvBEyCqOF0RglI1CmiJKDQ%2Bjgm8IgncRJ%2FuUrXPi7MHyjJASmjJ6pIDLVM2oiRlpK8EQVWKrY0yRplDQIWkYRFUlZ0iQpSRpVNKgIGqp3qagpHhuayVFp87q8il4qCkY%2Fp89VruXeo%2FYAcg%2Bl7jLZYRoZ%2FTNFpnpGPVP5vp0bZXim9AZrIiQDQOxnOgAAAABJRU5ErkJggg%3D%3D" class="text" alt="Facebook">',
        instagram: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB%2BACFRcqJI2W2OMAAAE9SURBVEjH7dYxcoMwFATQ1VCo5AgcRUdDR%2BMoHMGlC0YEob9ffBTiTHAmTdR4%2FApkSbsWwLAexhPAagbgLER4CzN6Cw%2F7zPzUBoKFBaOF9A1YT%2BMmzHmlR5jyXsAsffsR%2F%2FBWaDbZHMMSTgcVnYUFjBIYPsYROkFnIGqkwYgz9JBkAZI2cBJOA62JZBqclfNCVrEN%2FxVMGborSNt8MYPbu%2FEpjISkgH28F1KB8Q78yg87L%2F%2F1jgVu8iUMPKjnNchhE3rG4aEggSF4RmpWkNAROsZyqlCCS3CMdhQAw48KpR4KYylQUghaGoFB%2F%2FYFem2RgGcrCZ3WSsCZZqdapgqBLSIMbBHBsyMEJ89UyKuRT4FeeqeAsq0HkPGHsB5hr3qs393tS6vADy7P5gJ%2BfWc313zzItC8KjQvE%2BfXjQ%2FOD1wzmKofuwAAAABJRU5ErkJggg%3D%3D" class="text" alt="Instagram">',
        medium: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAABqAQMAAACvaBx4AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB%2BACFRckKBqjuUYAAAG7SURBVDjLfdXBccQgDAVQiGfCLU4FoZO4lZSRU6A0SqEEHzl4UJCEBCbZ9cUzz1pZH6%2Bx%2BTZy%2BEinqnBkOkFUKAxZIHAxFAHgYqgD8uTGWOBikCYNKkNvsgEXgzRxwMUgTRAKAzfZgYtBmiBgMUgTD1wM0uQALgZpQlAZqEkALgbQCbkYQCfkYjolioLH9Ri29SeO4XwM%2B%2B22qUf5B5LCAdPo%2FwJngx4h9QsDei%2BoLwIS5bVD3hY4JdubgEQRKAIfHa4O%2BfMR1N40%2FQj0OWLtAH8gMtgF6oBE8eumkGmBLvcYTlrksg%2Bg53J6hbICh8nHAmkAp0tBgcNEeAIUxi7QGg3AdDfAMO3eTwDTtfkn2AkHlBUwTOtzhzQDpmuzDMAwEZ5CJBNoQWLANgKeVmsCGgLvLGARygTtr356nF7BtzAYWMGtYFsYXKM63pdro2Ud71xdwIGlJzG9%2BwuYEO0dfNru4Faw2REEAfO1wjtvfocC7QeVd4UZ3ICDwK4V1DXpFlvZk2zTCE7BUHzyDp73yaDgGLxC3%2BudggkEdoDnvTYoOAavYBmcQv8K2QH%2BYldw1%2FyFw2L%2BTjgzjl9SHGPepSFxAwAAAABJRU5ErkJggg%3D%3D" class="text" alt="Medium">',
        patreon: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQMAAAAGz%2BOhAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB%2BACFRcmIshAMtoAAAIYSURBVEjH1dbBEdwgDAVQPD746BJcikuD0phJAWmBEjhyYCBrkNCXIcns5JS97O6zLckGgY2hT63JvD5XrTVo2j5Uy3xarV5ZIx1x71bRTjK82JLFKVyteQ6HAc9hEvAeFqYUUOE2SJJICrnlQ6w69QB04hssYFoKEeHOIp2foBRHuYqUkscFUkoYydx4AvLLc3kQxfMVWSoIXF6USqM%2B2MIkNicPPHPJ8NQKftPxQiUnHFSyiCPjetyAI%2Bh6fo9zzvcvh6Mf%2BukyIw62omZObKmKmtfdspp1CRojUYF5nP0JG97Gd9oybj37UfkOSsvuobfQLM2Bk2aJo7mQwca0NHTKyT97kr1bwb4Eu3lCbs%2BRq4W23G6TJWXSHU%2BEm45OtkvH2JfVZvFjUToJ7ZTOev5bNM8W1nahJW3tJ9mtjS4Ya84fzX5p6Sl1Zfk7q%2F%2BxRXgGdfGsvrXwD0ZzY7aoza3Nvs38zoKyQv2BlheWFsZ9%2BTcLtIyg8XqAxusGWDG0tICNNQcsvuxn5bWsDPtBq%2FoN5mkJvZ%2BobGdfuS0arrvatrXFt%2B0L63uAtlP%2BDrsW1vcebbbdobY6287jDnbwuIOdPO5g98JoT0bbaBNBO2hQ0C7agNAsDRTYzu8bZIEuzWC8ESSwtnrzO43qBdrGX%2BYWZmYrC0sLiwvzC3OzFTNbWlhYmJtNXqlUr07mZktmNifmaF8Y9AsZdxIWObJf8QAAAABJRU5ErkJggg%3D%3D" class="text" alt="Patreon">',
        tumblr: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAAC%2FAQMAAAD0PL0HAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB%2BACFRctOjjYc0cAAAGXSURBVEjH7ddBboUgEAZgiAuWHsGjcDS4WTkKR3DpgkBFmGHGsdG8pOmisnr58rQzPCg%2FStVhyzGCGqMImiQZSfMjWh5TrY5T%2FojsU0r35D6lvZ%2FtlvQ1rbc0XVPkZCTN1xQ4LZLquvG35NrPSKkIqv3kW6r9JE6mTxehWdLS54aQ610TwvWHpCUdi94zmqGfQRaKb5sr9rcnRserVkb47fGRbAtGSlCWtEmKZGt28oKyErS%2B9I8IFzldcn9Nbat5ud1feumlX6IoaHlGmyQ8kpDwtD6OQ6TEyTAK8CFzmiRpPCqR6n%2BWrxPZki2LTLWKuHhOtYMLCjR%2BtWcDDWk%2FUqSBr1UUaSxstAKlEzlC0waUT2QvqWDMSjRsnwmSgc4sFx4js%2FTYimQZs1WkxOwMwiadh6nAjqyHvrH8vjodqdWOZITZK2L5UIWLWCtU0b8%2BFtb%2B18O46UDY86ccuL%2BWBMj%2B0%2BRz6jPYxgJPWmzW9KxmRjG64GABtZCkRy5JY5LwDkbPcCAvrleJHPRa3vpakqVpoFl77BtArz8NGnELmAAAAABJRU5ErkJggg%3D%3D" class="text" alt="Tumblr">',
        twitter: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAACEAQMAAADC%2FtlwAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB%2BACFRckLWrJTckAAAHoSURBVEjHtZY9bsMwDIUZePCotZt7hN7AV%2BkxullAL6beREfQqEGQain%2BIannNC1QLQk%2BJNR7j0xMIn7mRP0ZS3E9nUqJPV1KyevLi4C3sh5L9KHL1sK3sL5%2FPaipNNBY6Ru%2FrF43eeJVlkoTFUkrLNk0zUlI2GRQ3unAaelo%2B57lcsvd3u0IxGw0NeoVja1a4CaaO7vSXdq8UT9WmhV1c9PDDa%2FnMzdqBc1LatTJz1YRQ9lFFEmjoqHRpKi%2FZyKDrPcMZbvupPZOvaRbqlHQvNEsaGQDc7Yi7NRx6ncaOXW7%2BKxbTFy4okHTZSsBaB1bQedtCBAtXtJ9DL4ENUWdB3SEdID0BikhOpwzw6mbEY2TolDCv9LOWv4tpedokj%2BoP1MdZBR%2FC89QA6meh%2FCADpDqeDyhIDwhG46QYEdIsCMkwhK6zhK6jggV7v7mz2YSvRtEZ9CgKzqB0K%2BoAfFe0RHFq6gjlJlDho%2FICIZzQRcQjgwiEUo9yid5RwdgWIrwhEQ4ko99ZU0Utnx36a3x%2B3K3kUhrvLBYbAwwwaR5tf50JuTDsQ8tw7IJlo1IrRA2oRwJJmbAMPgJtX2BrZxgK0c0j3xOMzImnM1oQlhh%2B2MnjxKhXzlVgSMdvfqaLsVDcr%2F4DqqP9A1Llk0P0DuH8AAAAABJRU5ErkJggg%3D%3D" class="text" alt="Twitter">',
        youtube: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABaAQMAAABKVczBAAAABlBMVEX%2F%2F%2F8AAABVwtN%2BAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB%2BACFRcpEfAITwMAAADESURBVDjLxdQxDoMwDAVQVx4YcwSO4qPRo%2FUokTgAHRkQqdJChP8fXCTUeuMpwkkMX6RWeZds1ZdWc33uyqGyX%2FBZMhxhbS%2FcS%2BTm4S7q4eGb1DYEycOTofcwh7CIXQCDh%2FWnMCGMCJmgnWCHdpPb4LIiCIEhJARFEAJDSAiKIASGkBC6cIVFXTTcqUWn1fDGLLp1mgtNzhAKDHtEmBD%2B9CWfgiv%2B29NxMX%2BRQXGOUfRROFJ8csBSBCuG9HFryx7trYPIC1ga%2FcdoBLZOAAAAAElFTkSuQmCC" class="text" alt="YouTube">'
    },
    processTouch: undefined,
    processScroll: undefined,
    processed_metadata_elements: document.documentElement.getElementsByClassName("news-metadata-processed")
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
    if (News.features.metadata) window.addEventListener("touchstart", News.processTouch, false);
    document.documentElement.setAttribute("data-news-features", features.join(" "));
}

News.initFootnotes = function() {
    if (!News.features.footnotes) return;
    var i;
    document.body.appendChild(document.createElement("footer")).id = "news-footnotes";
    document.body.appendChild(document.createElement("div")).id = "news-footnotes-padding";
    for (i = 0; i < News.footnotes.length; i++) {
        if ((i+1) < 10) {
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
    var elements = News.getMetadataElements();
    var i;
    var element;
    var metadata;
    for (i = 0; i < elements.length; i++) {
        element = elements.item(i);
        if (element.classList.contains("news-metadata-processed")) continue;
        element.classList.add("news-metadata-processed");
        element.addEventListener("touchstart", News.processTouch, false);
        metadata = document.createElement("small");
        metadata.className = "news-metadata";
        element.appendChild(metadata);
        if (element.hasAttribute("data-news-metadata-url")) metadata.insertAdjacentHTML('beforeend', '<a href="' + element.getAttribute("data-news-metadata-url") + '" title="Website" target="_blank">🔗</a>');
        if (element.hasAttribute("data-news-metadata-twitter")) {
            if (element.getAttribute("data-news-metadata-twitter")[0] === "@") element.setAttribute("data-news-metadata-twitter", element.getAttribute("data-news-metadata-twitter").substr(1));
            metadata.insertAdjacentHTML('beforeend', '<a href="https://twitter.com/' + element.getAttribute("data-news-metadata-twitter") + '" title="Twitter" target="_blank">' + News.metadata_logos.twitter + '</a>');
        }
        if (element.hasAttribute("data-news-metadata-facebook")) metadata.insertAdjacentHTML('beforeend', '<a href="https://www.facebook.com/' + element.getAttribute("data-news-metadata-facebook") + '" title="Facebook" target="_blank">' + News.metadata_logos.facebook + '</a>');
        if (element.hasAttribute("data-news-metadata-instagram")) metadata.insertAdjacentHTML('beforeend', '<a href="https://www.instagram.com/' + element.getAttribute("data-news-metadata-instagram") + '/" title="Instagram" target="_blank">' + News.metadata_logos.instagram + '</a>');
        if (element.hasAttribute("data-news-metadata-tumblr")) metadata.insertAdjacentHTML('beforeend', '<a href="https://' + element.getAttribute("data-news-metadata-tumblr") + '.tumblr.com/" title="Tumblr" target="_blank">' + News.metadata_logos.tumblr + '</a>');
        if (element.hasAttribute("data-news-metadata-medium")) metadata.insertAdjacentHTML('beforeend', '<a href="https://medium.com/' + element.getAttribute("data-news-metadata-medium") + '" title="Medium" target="_blank">' + News.metadata_logos.medium + '</a>');
        if (element.hasAttribute("data-news-metadata-youtube")) metadata.insertAdjacentHTML('beforeend', '<a href="' + element.getAttribute("data-news-metadata-youtube") + '" title="YouTube" target="_blank">' + News.metadata_logos.youtube + '</a>');
        if (element.hasAttribute("data-news-metadata-patreon")) metadata.insertAdjacentHTML('beforeend', '<a href="https://www.patreon.com/' + element.getAttribute("data-news-metadata-patreon") + '" title="Patreon" target="_blank">' + News.metadata_logos.patreon + '</a>');
    }
    News.is_initialized.metadata = true;
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

News.processTouch = function(e) {
    var i;
    if (News.features.metadata && News.is_initialized.metadata) {
        for (i = 0; i < News.processed_metadata_elements.length; i++) {
            if (News.processed_metadata_elements.item(i).hasAttribute("data-news-metadata-activated")) News.processed_metadata_elements.item(i).removeAttribute("data-news-metadata-activated");
        }
        if (e.target.classList.contains("news-metadata-processed")) e.target.setAttribute("data-news-metadata-activated", "");
    }
}
