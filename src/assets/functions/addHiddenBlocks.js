// from https://stackoverflow.com/questions/4481485/changing-css-pseudo-element-styles-via-javascript/12207551#answer-8051488
// add hidden blocks to href nav locations for correct vertical scrolling with fixed navbar

export default () => {
    // don't run function if nav is not fixed as hidden blocks for correct vertical navigation will not be required
    if (window.getComputedStyle(document.querySelector('nav')).position === 'absolute') return;

    var addRule = (function (style) {
        var sheet = document.head.appendChild(style).sheet;
        return function (selector, css) {
            var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
                return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
            }).join(";");
            sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
        };
    })(document.createElement("style"));
    
    const navbarHeight = document.querySelector('nav').clientHeight;
    addRule("main h2::before", {
        display: "block",
        content: "''",
        "margin-top": -navbarHeight + 'px',
        height: navbarHeight + "px",
        visibility: "hidden",
        "pointer-events": "none"
    });
}
