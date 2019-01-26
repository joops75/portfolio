import React from "react";
import Welcome from './Welcome';
import ProjectTiles from './ProjectTiles';
import Links from './Links';
import About from './About';
import setNavandBackgroundStyles from '../../../assets/functions/setNavandBackgroundStyles';
import addHiddenBlocks from '../../../assets/functions/addHiddenBlocks';
import scrollToHash from '../../../assets/functions/scrollToHash';
import setWelcomeSectionHeight from '../../../assets/functions/setWelcomeSectionHeight';
import '../styles/main.scss';

export default class Home extends React.Component {
    componentDidMount() {
        setNavandBackgroundStyles('rgb(240, 240, 240)', null, '#home');
        addHiddenBlocks();
        setWelcomeSectionHeight();
        scrollToHash();
    }
    
    render() {
        return (
            <main id="home">
                <Welcome />
                <ProjectTiles />
                <Links />
                <About />
            </main>
        );
    }
}
