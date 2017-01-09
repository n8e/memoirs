import Relay from 'react-relay';

export default class SignUpMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{signUp}`
  }

  getVariables() {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      userName: this.props.userName,
      email: this.props.email,
      password: this.props.password
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SignUpPayload{
        signUpInfo {
          id
          success
          message
          token
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        signUpInfo: this.props.viewer.signUpInfo.id
      },
    }]
  }
}

SignUpMutation.fragments = {
  viewer: () => Relay.QL`
    fragment on User {
      signUpInfo {
        id
        success
        message
        token
      }
    }
  `
}
