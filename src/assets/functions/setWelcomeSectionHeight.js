export default () => {
    const welcomeSection = document.querySelector('#home #welcome');
    const navbar = document.querySelector('nav');
    if (welcomeSection && welcomeSection.clientHeight + navbar.clientHeight < window.innerHeight) {
        welcomeSection.style.height = window.innerHeight + 'px';
        const welcomeTitleHeight = document.querySelector('#home #welcomeTitle').clientHeight + navbar.clientHeight;
        document.querySelector('#home #welcomeGrid').style.height = window.innerHeight - navbar.clientHeight - welcomeTitleHeight + 'px';
    }
}
