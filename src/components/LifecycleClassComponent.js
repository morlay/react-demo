import React from 'react';
import utils from '../helpers/utils';

class LifecycleClassComponent extends React.Component {

  static propTypes = {
    type: React.PropTypes.string
  }

  static defaultProps = {
    type: 'default'
  }

  constructor(props, context) {
    super(props, context)
    utils.log('constructor')
    this.state = {};
  }

  componentWillMount() {
    utils.log('componentWillMount')
  }

  componentDidMount() {
    utils.log('componentDidMount')
  }

  componentWillReceiveProps() {
    utils.log('componentWillReceiveProps')
  }

  shouldComponentUpdate() {
    utils.log('shouldComponentUpdate')
    return true
  }

  componentWillUpdate() {
    utils.log('componentWillUpdate')
  }

  componentDidUpdate() {
    utils.log('componentDidUpdate')
  }

  componentWillUnmount() {
    utils.log('componentWillUnmount')
  }

  render() {
    utils.log('render')
    return null
  }

}

export default LifecycleClassComponent;
