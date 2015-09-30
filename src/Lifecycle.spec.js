import React from 'react'
import ReactTestUtils from 'react/lib/ReactTestUtils'
import proxyquire from 'proxyquire'

import { expect } from 'chai'
import { sandbox } from 'sinon'

describe('Lifecycle', () => {

  const sinon = sandbox.create();

  let Component;
  let log;

  beforeEach(()=> {
    log = sinon.spy();
    Component = proxyquire('./components/LifecycleComponent', {
      '../helpers/utils': {
        log: log
      }
    });
  });

  afterEach(() => {
    sinon.restore()
  });

  context('When Component mounting', () => {

    const mountingMethods = [
      'getDefaultProps',
      'getInitialState',
      'componentWillMount',
      'render',
      'componentDidMount'
    ];

    it(`should call ${mountingMethods.join(',')}`, () => {

      ReactTestUtils.renderIntoDocument(<Component/>);

      expect(log.callCount).to.eql(mountingMethods.length);
      expect(log.args.map((value)=>value[0])).to.eql(mountingMethods);

    });

  });

  context('When Component updating', () => {

    const updatingMethods = [
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'render',
      'componentDidUpdate'
    ];

    it(`should call ${updatingMethods.join(',')}`, () => {

      class Container extends React.Component {
        constructor(props, context) {
          super(props, context)
          this.state = {}
        }

        render() {
          return <Component {...this.state}/>
        }
      }

      const container = ReactTestUtils.renderIntoDocument(<Container/>);

      log.reset();

      container.setState({
        someProp: true
      });

      expect(log.callCount).to.eql(updatingMethods.length);
      expect(log.args.map((value)=>value[0])).to.eql(updatingMethods);

    });

  });

  context('When Component unmounting', () => {

    const unmountingMethods = [
      'componentWillUnmount'
    ];

    it(`should call ${unmountingMethods.join(',')}`, () => {

      class Container extends React.Component {
        constructor(props, context) {
          super(props, context)
          this.state = {}
        }

        clear() {
          this.setState({
            hidden: true
          })
        }

        render() {
          if (this.state.hidden) {
            return null;
          }
          return <Component />
        }
      }

      const container = ReactTestUtils.renderIntoDocument(<Container/>);

      log.reset();

      container.clear();

      expect(log.callCount).to.eql(unmountingMethods.length);
      expect(log.args.map((value)=>value[0])).to.eql(unmountingMethods);

    });

  });

});
