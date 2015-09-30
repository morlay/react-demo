import React from 'react'
import ReactTestUtils from 'react/lib/ReactTestUtils'

import { expect } from 'chai'

import ContextChildComponent from './components/ContextChildComponent'

describe('Contexts', () => {

  context('When single injection', ()=> {

    let context;

    class Container extends React.Component {

      static childContextTypes = {
        object: React.PropTypes.object
      };

      getChildContext() {
        return context
      }

      render() {
        return this.props.children()
      }
    }


    it('child Component should get context from parent Component', () => {

      context = {
        object: {
          a: 1
        }
      };

      const container = ReactTestUtils.renderIntoDocument(
        <Container>
          {() => <ContextChildComponent/>}
        </Container>
      );

      const contextChildComponent = ReactTestUtils.findRenderedComponentWithType(container, ContextChildComponent);

      expect(contextChildComponent.context.object).to.eql(context.object)


    });

  });

  context('When multi injection', () => {

    let context = {};

    class Container extends React.Component {

      static childContextTypes = {
        object: React.PropTypes.object
      };

      getChildContext() {
        return {
          object: context.object
        }
      }

      render() {
        return this.props.children()
      }
    }

    class ContainerInner extends React.Component {

      static childContextTypes = {
        func: React.PropTypes.func
      };

      getChildContext() {
        return {
          func: context.func
        }
      }

      render() {
        return this.props.children()
      }
    }


    it('context should be injected by Container', () => {

      context = {
        object: {
          a: 1
        },
        func: function test() {
        }
      };


      const container = ReactTestUtils.renderIntoDocument(
        <Container>
          {() => (
            <ContainerInner>
              {() => <ContextChildComponent/>}
            </ContainerInner>
          )}
        </Container>
      );

      const contextChildComponent = ReactTestUtils.findRenderedComponentWithType(container, ContextChildComponent);

      expect(contextChildComponent.context).to.eql(context)

    });

  });


});
