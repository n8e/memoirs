import React, { Component } from 'react';
import Relay from 'react-relay';

class WelcomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
		};

		this.props.relay.forceFetch();

		this.renderAllMemoirs = this.renderAllMemoirs.bind(this);
	}

	renderAllMemoirs(memoirs) {
		return memoirs.map(memoir => {
			return (
				<div key={memoir.node.memoirId} className="flex-child">
					<span>{memoir.node.title}</span>
					<blockquote>{memoir.node.content}</blockquote>
				</div>
			);
		});
	}

	render() {
		console.log('this.props.viewer.memoirs.items.edges', this.props.viewer.memoirs.items.edges);
		return (
      <div className="flex-container">
				{ this.renderAllMemoirs(this.props.viewer.memoirs.items.edges) }
      </div>
		);
	}
}


export default Relay.createContainer(WelcomeView, {
	fragments: {
		viewer: () => Relay.QL`
      fragment on User {
        memoirs {
          id
					items(first:16) {
						edges {
							node {
								id
								memoirId
								title
								content
							}
						}
						totalCount
					}
        }
      }
    `
	}
});
