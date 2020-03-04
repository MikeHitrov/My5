import React, { Component } from 'react';

export const CloudContext = React.createContext({});

export const withCloudContext = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <CloudContext.Consumer>
          {context => <WrappedComponent {...context} {...this.props} />}
        </CloudContext.Consumer>
      );
    }
  };
};
