import getRelativePathNoHash from './getRelativePathNoHash';

export default (href) => {
    const hashRegex = /#[^\/]+$/;
    const targetSelectorArr = href && (href.match(hashRegex) || ['body']) || window.location.href.match(hashRegex);
    const targetElement = targetSelectorArr ? document.querySelector(targetSelectorArr[0]) : null;
    if (!targetElement) return;
    // timeOut must be large enough to allow full page loading and therefore correct scrolling
    const timeOut = getRelativePathNoHash(href) === getRelativePathNoHash(window.location.pathname + window.location.hash) ? 0 : 500;
    setTimeout(() => targetElement.scrollIntoView(), timeOut);
}
