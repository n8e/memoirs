import Relay from 'react-relay';

export default class CreateMemoirMutation extends Relay.Mutation {
	getMutation() {
		return Relay.QL`mutation{createMemoir}`;
	}

	getVariables() {
		return {
			title: this.props.title,
			content: this.props.content,
		};
	}

	getFatQuery() {
		return Relay.QL`
      fragment on CreateMemoirPayload{
        memoir {
          id
          title
          content
        }
      }
    `;
	}

	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs: {
				memoir: this.props.viewer.memoir.id
			},
		}];
	}
}

CreateMemoirMutation.fragments = {
	viewer: () => Relay.QL`
    fragment on User {
      memoir {
        id
        title
        content
      }
    }
  `
};
