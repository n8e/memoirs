import Relay from 'react-relay';

export default class LogoutMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{logout}`;
  }

  getVariables() {}

  getFatQuery() {
    return Relay.QL`
      fragment on LogoutPayload{
        userInfo {
          id
          loggedIn
          userName
          token
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        userInfo: this.props.viewer.userInfo.id,
      },
    }];
  }
}

LogoutMutation.fragments = {
  viewer: () => Relay.QL`
    fragment on User {
      userInfo {
        id
        loggedIn
        userName
        token
      }
    }
  `,
};
