export default (backgroundColor, backgroundImageFile, mainElementName) => {
    const navbar = document.querySelector('nav');
    const frameWidth = mainElementName ? document.querySelector(mainElementName).scrollWidth : 0;
    const innerWidth = window.innerWidth;
    const setBackgroundImageSizeAndPosition = () => {
        document.body.style.backgroundPositionY = navbar.clientHeight + 10 + 'px';
        document.body.style.backgroundSize = `${window.innerWidth - 40}px ${window.innerHeight - navbar.clientHeight - 20}px`;
    }
    if (backgroundColor) document.body.style.background = backgroundColor;
    if (backgroundImageFile) {
        document.body.style.background = `url(${backgroundImageFile})`;
        if (mainElementName === '#home') {
            document.body.style.background = `rgb(240, 240, 240) url(${backgroundImageFile}) no-repeat fixed center`;
        }
    }
    if (/url\(".*\.svg"\)/.test(document.body.style.background)) {
        // a mainElementName of 'body' means the page is being resized
        // otherwise alternate page navigation is taking place (need to wait for navbar to collapse)
        mainElementName === 'body' ? setBackgroundImageSizeAndPosition() : setTimeout(setBackgroundImageSizeAndPosition, 500);
    }
    if (window.getComputedStyle(navbar).position === 'absolute') {
        navbar.style.width = innerWidth >= frameWidth ? '100%' : frameWidth + 'px';
    } else {
        navbar.style.width = '100%';
    }
    if (!document.querySelector('.collapse.navbar-collapse.show')) {
        document.querySelector('body').style.paddingTop = navbar.clientHeight + 'px';
    }
    if (mainElementName !== 'body') window.scrollTo(0, 0);
}
