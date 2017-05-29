import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { hashHistory } from 'react-router';

import LogoutMutation from '../../mutations/LogoutMutation';

class LogoutView extends Component {
  componentDidMount() {
    const onSuccess = () => { hashHistory.push('/login'); };
    Relay.Store.commitUpdate(new LogoutMutation({
      viewer: this.props.viewer,
    }), { onSuccess });
  }

  render() {
    return (<noscript />);
  }
}

LogoutView.propTypes = {
  viewer: PropTypes.shape({
    userInfo: PropTypes.shape({
      userName: PropTypes.string,
    }),
  }).isRequired,
};

export default Relay.createContainer(LogoutView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${LogoutMutation.getFragment('viewer')}
        userInfo {
          userName
        }
      }
    `,
  },
});
