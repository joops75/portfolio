export default () => {
    const welcomeSection = document.querySelector('#home #welcomeSection');
    const navbar = document.querySelector('nav');
    if (welcomeSection && welcomeSection.clientHeight + navbar.clientHeight < window.innerHeight) {
        const welcomeSectionHeight = window.innerHeight;
        welcomeSection.style.height = welcomeSectionHeight + 'px';
        const welcomeTitleHeight = document.querySelector('#home #welcome').clientHeight;
        document.querySelector('#home #welcomeGrid').style.height = window.innerHeight - navbar.clientHeight - welcomeTitleHeight + 'px';
    }
}
