import React from 'react'
import ReactTestUtils from 'react/lib/ReactTestUtils'

import { expect } from 'chai'

import { provide, inject } from './helpers/contextsDI'


describe('ContextsDI', () => {

  it('child Component should get context from parent Component', () => {

    let context = {
      object: {
        a: 1
      }
    };

    @provide({
      object: {
        type: React.PropTypes.object,
        value() {
          return context.object
        }
      }
    }) class Container extends React.Component {
      render() {
        return this.props.children()
      }
    }

    @inject({
      object: {
        type: React.PropTypes.object
      }
    }) class Component extends React.Component {
      render() {
        return <span></span>
      }
    }


    const container = ReactTestUtils.renderIntoDocument(
      <Container>
        {() => <Component/>}
      </Container>
    );

    const contextChildComponent = ReactTestUtils.findRenderedComponentWithType(container, Component.WrappedComponent);

    expect(contextChildComponent.context.object).to.eql(context.object)

  });

});
