import React from 'react';
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom';
import GenerateTechTiles from './GenerateTechTiles';
import githubIcon from '../../../assets/images/githubIcon.png'
import html5Icon from '../../../assets/images/html5Icon.svg';
import css3Icon from '../../../assets/images/css3Icon.svg';
import jsIcon from '../../../assets/images/jsIcon.svg';
import projectInfo from '../../../assets/data/projectInfo';
import { FRONTEND } from '../../../assets/data/projectTypes';

export default class ProjectTiles extends React.Component {
    generateImageAndLink(type, title, href, src) {
        const projectImage = <img className="projectImage" src={src} alt={title} />;
        if (type === FRONTEND) {
            return (
                <Link key={title} to={href}>
                    {projectImage}
                </Link>
            );
        }
        return (
            <a key={title} href={href} target="_blank">
                {projectImage}
            </a>
        );
    }

    render() {
        const projectTiles = projectInfo.map(({ src, href, title, type, description, tech, code }, i) => {
           return (
                <div key={i} className="projectTileBorder">
                    <div className="projectTile">
                        {this.generateImageAndLink(type, title, href, src)}
                        <div className="projectTitle">{title} ({type})</div>
                        <div className="contentGrid sourceCode">
                            <img src={githubIcon} />
                            <a href={code} target="_blank">View source code here</a>
                        </div>
                        <div className="projectDescription">{description}</div>
                        <GenerateTechTiles commaSeparatedTechString={tech} />
                    </div>
                </div>
            );
        });
    
        return (
            <section id="projects">
                <h2>Projects</h2>
                <p>Here is a selection of my personal web-development projects. All projects include the use of HTML, CSS and JavaScript in addition to the technologies listed with each one.</p>
                <div className="contentGrid">
                    <div className="contentColumn icons">
                        <img src={html5Icon} />
                        <div>HTML 5</div>
                    </div>
                    <div className="contentColumn icons">
                        <img src={css3Icon} />
                        <div>CSS 3</div>
                    </div>
                    <div className="contentColumn icons">
                        <img src={jsIcon} />
                        <div>JavaScript</div>
                    </div>
                </div>
                <Masonry
                    className={'projectTiles'}
                    elementType={'div'}
                    options={{ fitWidth: true }} // used with CSS rule 'margin: auto' to center masonry
                >
                    {projectTiles}
                </Masonry>
            </section>
        );
    }
}
