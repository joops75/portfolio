import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Title from './Title'
import Display from './Display'
import Labels from './Labels'
import Power from './Power'
import Volume from './Volume'
import Set from './Set'
import DrumPads from './DrumPads'
import setNavandBackgroundStyles from '../../../assets/functions/setNavandBackgroundStyles';
import * as actionCreators from '../actions/actionCreators';

class App extends React.Component {
  componentDidMount() {
    setNavandBackgroundStyles(null, require('../assets/images/Light Wood Table Texture.jpg'), '#drummachine');
  }

  render() {
    return (
      <div id="drummachine">
        <div id="unit">
          <Title />
          <Display {...this.props} />
          <Labels />
          <Power {...this.props} />
          <Volume {...this.props} />
          <Set {...this.props} />
          <DrumPads {...this.props} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ display, text, set, volume, keys}) {
  return {
    display: display,
    text: text,
    set: set,
    volume: volume,
    keys: keys
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
