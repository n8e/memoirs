import React, { Component } from 'react';
import Relay from 'react-relay';

class WelcomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
		};
	}

	render() {
		return (
      <div className="flex-container">
        <div className="flex-child">The welcome view</div>
        <div className="flex-child">Configuration</div>
        <div className="flex-child">Other content</div>
      </div>
		);
	}
}


export default Relay.createContainer(WelcomeView, {
	fragments: {
		viewer: () => Relay.QL`
      fragment on User {
        userInfo {
          id
        }
      }
    `
	}
});
