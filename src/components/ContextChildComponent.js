import React from 'react';

class ContextChildComponent extends React.Component {

  static contextTypes = {
    object: React.PropTypes.object,
    func: React.PropTypes.func
  };

  render() {
    return null;
  }
}

export default ContextChildComponent;
