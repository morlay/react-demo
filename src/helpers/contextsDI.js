import React from 'react';

export const inject = (injectables) => {

  return (Component) => {

    Component.contextTypes = Object.entries(injectables)
      .reduce((contextTypes, [k, v]) => {
        contextTypes[k] = v.type;
        return contextTypes;
      }, {});

    return class Injector extends React.Component {
      static WrappedComponent = Component

      render() {
        return <Component {...this.props} />;
      }
    };

  };

};

export const provide = (providing) => {

  return (Component) => class Provider extends React.Component {

    static childContextTypes = Object.entries(providing)
      .reduce((contextTypes, [k, v]) => {
        contextTypes[k] = v.type;
        return contextTypes;
      }, {});

    getChildContext() {
      return Object.entries(providing).reduce((contextTypes, [k, v]) => {
        contextTypes[k] = v.value.call(this);
        return contextTypes;
      }, {});
    }

    render() {
      return <Component {...this.props} />;
    }
  };

};
