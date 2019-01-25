export default (backgroundColor, backgroundImageFile, mainElementName) => {
    if (backgroundColor) document.body.style.background = backgroundColor;
    if (backgroundImageFile) document.body.style.background = `url(${backgroundImageFile})`;
    const navbar = document.querySelector('nav');
    const frameWidth = mainElementName ? document.querySelector(mainElementName).scrollWidth : 0;
    const innerWidth = window.innerWidth;
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
