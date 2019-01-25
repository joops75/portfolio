import React from "react";
import setNavandBackgroundStyles from '../../../assets/functions/setNavandBackgroundStyles';
import addHiddenBlocks from '../../../assets/functions/addHiddenBlocks';
import '../styles/main.css';

export default class Spinner extends React.Component {
    componentDidMount() {
        setNavandBackgroundStyles('rgb(240, 240, 240)', null, '#spinner');
        addHiddenBlocks();
    }
    
    render() {
        return (
            <div id="spinner" />
        );
    }
}
