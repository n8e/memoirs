import Relay from 'react-relay';

export default class UpdateMemoirMutation extends Relay.Mutation {
	getMutation() {
		return Relay.QL`mutation{updateMemoir}`;
	}

	getVariables() {
		return {
			memoirId: this.props.memoirId,
			title: this.props.title,
			content: this.props.content,
		};
	}

	getFatQuery() {
		return Relay.QL`
      fragment on UpdateMemoirPayload{
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
				memoir: this.props.viewer.memoir.memoirId
			},
		}];
	}
}

UpdateMemoirMutation.fragments = {
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
