import React from 'react'
import GenerateTechTiles from './GenerateTechTiles';
import webpackIcon from '../../../assets/images/webpackIcon.svg'
import ReactIcon from '../../../assets/images/reactIcon' 

export default () => {
    return (
        <section id="about">
            <h2>About</h2>
            <div className="contentGrid">
                <div className="contentColumn icons">
                    <img src={webpackIcon} />
                    <div>webpack</div>
                    <ReactIcon />
                    <div>React</div>
                </div>
                <div className="contentColumn">
                    <p>
                        This website was built using webpack and is front end only (has no custom server). It takes advantage of webpack’s code splitting and tree shaking capabilities to optimize performance. Front End projects that were originally stand-alone and non-React based have been converted to React components and hosted on this website locally. They are navigated to with React Router. Full stack projects (with custom servers) are hosted externally on Heroku and open a new tab when navigated to from this page. This website’s source code can be viewed on GitHub <a href=" https://github.com/joops75/portfolio" target="_blank">here</a>.
                    </p>
                    <GenerateTechTiles commaSeparatedTechString="webpack, React, React Router, React Loadable, Bootstrap, Sass, Masonry" />
                </div>
            </div>
        </section>
    );
}
