import React, { Component } from 'react';
import self from '../../../assets/images/self.jpg';

export default class Welcome extends Component {
    render() {
        return (
            <section id="welcomeSection">
                <h2 id="welcome">Welcome</h2>
                <div id="welcomeGrid">
                    <div className="contentGrid">
                        <div className="contentColumn">
                            <img id="self" src={self} />
                        </div>
                        <p>
                            Welcome to my web-development portfolio! I’m Simon Cooper, a budding full-stack web developer. This website features some of the projects I have created whilst learning web development. Some date back to 2017, around the time I started learn HTML, CSS and JavaScript. Since then, I’ve continued to learn various other web technologies, many of which are listed with the project descriptions. All of my projects here have some degree of interactivity, feel free to explore them!
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}
