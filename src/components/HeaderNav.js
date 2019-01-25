import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import portfolioIcon from '../assets/images/portfolioIcon.svg';
import projectInfo from '../assets/data/projectInfo';
import { FRONTEND, FULLSTACK } from '../assets/data/projectTypes';
import scrollToHash from '../assets/functions/scrollToHash';
import setWelcomeSectionHeight from '../assets/functions/setWelcomeSectionHeight';
import addHiddenBlocks from '../assets/functions/addHiddenBlocks';
import setNavandBackgroundStyles from '../assets/functions/setNavandBackgroundStyles';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.handleResize = this.handleResize.bind(this);
        this.toggle = this.toggle.bind(this);
        this.togglefrontEndDropdownIsOpen = this.togglefrontEndDropdownIsOpen.bind(this);
        this.togglefullStackDropdownIsOpen = this.togglefullStackDropdownIsOpen.bind(this);
        this.close = this.close.bind(this);
        this.onExited = this.onExited.bind(this);
        this.state = {
            isOpen: false,
            frontEndDropdownIsOpen: false,
            fullStackDropdownIsOpen: false
        };
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize() {
        setNavandBackgroundStyles(null, null, 'body');
        addHiddenBlocks();
        setWelcomeSectionHeight();
    }
    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }
    togglefrontEndDropdownIsOpen() {
        this.setState({ frontEndDropdownIsOpen: !this.state.frontEndDropdownIsOpen });
    }
    togglefullStackDropdownIsOpen() {
        this.setState({ fullStackDropdownIsOpen: !this.state.fullStackDropdownIsOpen });
    }
    closefrontEndDropdown() {
        this.setState({ frontEndDropdownIsOpen: false });
    }
    closefullStackDropdown() {
        this.setState({ fullStackDropdownIsOpen: false });
    }
    close(e) {
        this.setState({ isOpen: false });
        scrollToHash(e.target.attributes.href.nodeValue);
        this.closefrontEndDropdown();
        this.closefullStackDropdown();
    }
    onExited() {
        document.querySelector('body').style.paddingTop = document.querySelector('nav').clientHeight + 'px';
        addHiddenBlocks();
        setWelcomeSectionHeight();
    }
    generateDropdownItems(projectType) {
        return projectInfo.map(({ href, title, type }) => {
            if (type !== projectType) return;
            return <a key={title} className="dropdown-item" href={href} target={type === FRONTEND ? '' : '_blank'} onClick={this.close}>{title}</a>
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    {/* place NavbarToggler after NavbarBrand for right alignment */}
                    <NavbarToggler onClick={this.toggle} />
                    <NavbarBrand href="/#/" onClick={this.close}><img src={portfolioIcon} />S. Cooper's Portfolio</NavbarBrand>
                    <Collapse onExited={this.onExited} isOpen={this.state.isOpen} navbar>
                        {/* remove ml-auto class for left alignment */}
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/#/#welcome" onClick={this.close}>Welcome</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/#projects" onClick={this.close}>Projects</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/#links" onClick={this.close}>Links</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/#about" onClick={this.close}>About</NavLink>
                            </NavItem>
                            <Dropdown isOpen={this.state.frontEndDropdownIsOpen} toggle={this.togglefrontEndDropdownIsOpen} nav inNavbar>
                                <DropdownToggle
                                    tag="a"
                                    onClick={this.togglefrontEndDropdownIsOpen}
                                    data-toggle="dropdown"
                                    aria-expanded={this.state.frontEndDropdownIsOpen}
                                    nav
                                    caret
                                >
                                    View Front-End Projects
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.generateDropdownItems(FRONTEND)}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown isOpen={this.state.fullStackDropdownIsOpen} toggle={this.togglefullStackDropdownIsOpen} nav inNavbar>
                                <DropdownToggle
                                    tag="a"
                                    onClick={this.togglefullStackDropdownIsOpen}
                                    data-toggle="dropdown"
                                    aria-expanded={this.state.fullStackDropdownIsOpen}
                                    nav
                                    caret
                                >
                                    View Full-Stack Projects
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.generateDropdownItems(FULLSTACK)}
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
