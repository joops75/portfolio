import React from 'react';
import fccIcon from '../../../assets/images/fccIcon.svg'
import githubIcon from '../../../assets/images/githubIcon.png'
import codepenIcon from '../../../assets/images/codepenIcon.png'

export default () => {
    return (
        <section id="links">
            <h2>Links</h2>
            <p>Have a look at other front end projects of mine on CodePen. Peruse my profile at freeCodeCamp, the website where I began learning web development. Check out my GitHub account to view the source code of all the projects listed here and more.</p>
            <div className="contentGrid">
                <div className="contentColumn icons">
                    <a href="https://codepen.io/joops75/pens/popular/?grid_type=list" target="_blank"><img src={codepenIcon} /></a>
                    <div>CodePen</div>
                </div>
                <div className="contentColumn icons">
                    <a href="https://www.freecodecamp.org/joops75" target="_blank"><img src={fccIcon} /></a>
                    <div>freeCodeCamp</div>
                </div>
                <div className="contentColumn icons">
                    <a href="https://github.com/joops75?tab=repositories" target="_blank"><img src={githubIcon} /></a>
                    <div>GitHub</div>
                </div>
            </div>
        </section>
    );
}
