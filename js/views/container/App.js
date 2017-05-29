import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

import Navigator from '../common/Navigator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: this.props.viewer.userInfo.userName,
        loggedIn: this.props.viewer.userInfo.loggedIn,
        token: this.props.viewer.userInfo.token,
      },
    };
  }

  render() {
    return (
      <div className="App" id="root">
        <Navigator userInfo={this.state.userInfo} />
        { React.cloneElement(this.props.children, {/* props*/}) }
      </div>
    );
  }
}

App.propTypes = {
  viewer: PropTypes.shape({
    userInfo: PropTypes.shape({
      userName: PropTypes.string,
      loggedIn: PropTypes.bool,
      token: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        userInfo {
          userName
          loggedIn
          token
        }
      }
    `,
  },
});
