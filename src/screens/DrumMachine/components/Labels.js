import React from 'react';

class Labels extends React.Component {
  render() {
    return (
      <div>
        <div className='label' id='powerLabel'>pow</div>
        <div className='label' id='volumeLabel'>vol</div>
        <div className='label' id='bankLabel'>set</div>
      </div>
    )
  }
}

export default Labels;
