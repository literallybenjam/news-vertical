#  NEWS-VERTICAL  #

A `writing-mode: vertical-rl` newspaper-esque stylesheet for HTML.
Simply inlcude `style.css` in your webpage.
Expected layout and features noted below.

##  Layout:  ##

NEWS-VERTICAL expects pages to have the following layout:

```html
<!DOCTYPE html>
<html>
    <head>
        <!--  head content here …  -->
    </head>
    <body>
        <header>
            <h1>Page Title</h1>
        </header>
        <aside>
            <span>Side content 1</span>
            <span>Side content 2</span>
            <!--  …  -->
        </aside>
        <main>
            <!--  Page content goes here  -->
        </main>
        <footer>Footer content</footer>
    </body>
</html>
```

`<aside>` and `<footer>` are optional, but note that `<header>` must come first and page content must go in `<main>`.
(Alternatively, on a page without a `<header>`, `<main>` will expand to fill the page).

##  Features:  ##

###  writing modes  ###

The `vertical` and `horizontal` classes may be added to a block to change the writing mode.
Using both creates a vertical writing mode that moves from left to right instead of from right to left.
You can set this on the `<html>` element to change the writing mode for the whole document; the default is `vertical`.
Otherwise, it is recommended that you only set `vertical` and `horizontal` classes on elements with class `block` or `text`.

###  blocks  ###

Use `class="block"` to define a block. The maximum `inline-size` for this block is `18rem`, but the block will shrink to fit its content.

###  text  ###

Use `class="text"` to define an inline-block.
You can use this on `<img>` or `<svg>` elements for picture text, or in combination with writing modes to create short spans of text running in a different direction.

###  inline  ###

The `inline` class, when set on a `<ul>` or `<ol>` list, will make the list items run inline rather than in a block.
You can use `inline` in conjunction with `block` and `text` to achieve this style within those display modes.

On other elements, the `inline` class sets `display` to `inline`.

###  pad  ###

The `pad-start` and `pad-end` classes will set `margin-inline-start` and `margin-inline-end`, respectively, to `auto`.
Use both if you want to center content.

###  align  ###

The `align-start` and `align-end` classes will set `text-align` to `start` or `end`.
Use both to justify text.

###  `<u>`  ###

The `<u>` element should be used to mark up chinese (or similar) proper names.
The optional class `title` should be set when marking up titles of works, and will produce a wavy underline.

###  verse  ###

Use `class="verse"` on a `<p>` element to denote a stanza of verse.
Line breaks are preserved in verse elements, although white-space is still collapsed (use non-breaking spaces or other mechanisms to circumvent this).
Wrapped lines should also feature a hanging indent, but no browser currently supports this.

###  footnotes  ###

Use `class="footnote"` to denote text with a footnote.
Elements of this class should contain an element with `class="note"`, whose contents represent the footnote.
The note text is only displayed when the cursor hovers over the footnote element.

###  bibliography  ###

The `bibliography` class, when set on a `<ul>` or `<ol>` list, will format the list as a bibliography.
A sample bibliography markup is as follows:

```html
<ul class="bibliography">
    <li>
        Some Author. <i>An item</i>. <a href="http://example.com">http://example.com</a>.
        <p>
            An annotation for this bibliography item.
        </p>
    </li>
</ul>
```

###  `script.js`  ###

NEWS-VERTICAL doesn't require JavaScript to operate, but including `script.js` can provide enhanced rendering for some elements (for example, footnotes).
To use `script.js`; simply include the file in your document (using `<script src="script.js"></script>` or similar) and run `News.init(features)`, where `features` is an array of the desired features you wish to activate.
The features currently supported by `script.js` are:

- `"footnotes"` : provides enhanced footnote rendering support

##  Considerations:  ##

NEWS-VERTICAL makes fair use of such features as `margin-block-start` to style content (for example, headings) regardless of `writing-mode` or `direction`.
Right now, this is only supported in Firefox and expirimentally in Webkit, which means that margins might be less-optimal in other browsers.
This should only cause minor stylistic variation, as the fallback is usually graceful (in worst-case-scenarios, the browser default).

NEWS-VERTICAL does not choose fonts, but is designed around the following font-weights: `200`, `300`, `400`, `600`, `700`, `900`.
Be sure to select fonts that support these weights elsewhere in your document.
NEWS-VERTICAL does not use italic or oblique styles.
