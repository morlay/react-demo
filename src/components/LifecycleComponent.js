import React from 'react';
import utils from '../helpers/utils';

const LifeCycleComponent = React.createClass({

  getDefaultProps() {
    utils.log('getDefaultProps')
    return {}
  },

  getInitialState() {
    utils.log('getInitialState')
    return {}
  },

  componentWillMount() {
    utils.log('componentWillMount')
  },

  componentDidMount() {
    utils.log('componentDidMount')
  },

  componentWillReceiveProps(nextProps) {
    utils.log('componentWillReceiveProps', nextProps)
  },

  shouldComponentUpdate(nextProps, nextState) {
    utils.log('shouldComponentUpdate', nextProps, nextState)
    return true
  },

  componentWillUpdate(nextProps, nextState) {
    utils.log('componentWillUpdate', nextProps, nextState)
  },

  componentDidUpdate(prevProps, prevState) {
    utils.log('componentDidUpdate', prevProps, prevState)
  },

  componentWillUnmount() {
    utils.log('componentWillUnmount')
  },

  render() {
    utils.log('render')
    return null
  }

})

export default LifeCycleComponent;
