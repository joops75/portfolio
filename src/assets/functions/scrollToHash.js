import getRelativePathNoHash from './getRelativePathNoHash';

export default (href) => {
    const hashRegex = /#[^\/]+$/;
    const targetSelectorArr = href && (href.match(hashRegex) || ['body']) || window.location.href.match(hashRegex);
    const targetElement = targetSelectorArr ? document.querySelector(targetSelectorArr[0]) : null;
    if (!targetElement) return;
    const { userAgent } = window.navigator;
    const firefoxRE = /Firefox\/(\d*\.?\d*)/i;
    const scrollParams = userAgent.match(firefoxRE) && +userAgent.match(firefoxRE)[1] >= 64 ? { behavior: 'smooth' } : true;
    // timeOut must be large enough to allow full page loading and therefore correct scrolling
    const timeOut = getRelativePathNoHash(href) === getRelativePathNoHash(window.location.pathname + window.location.hash) ? 0 : 500;
    // only use the experimental options object on scrollIntoView if on Firefox >= 64 (doesn't work accurately on Chrome 72)
    setTimeout(() => targetElement.scrollIntoView(scrollParams), timeOut);
}
