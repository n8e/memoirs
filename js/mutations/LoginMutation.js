import Relay from 'react-relay';

export default class LoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{login}`
  }

  getVariables() {
    return {
      username: this.props.username,
      password: this.props.password
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LoginPayload{
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
        userInfo: this.props.viewer.userInfo.id
      },
    }]
  }
}

LoginMutation.fragments = {
  viewer: () => Relay.QL`
    fragment on User {
      userInfo {
        id
        loggedIn
        userName
        token
      }
    }
  `
}
