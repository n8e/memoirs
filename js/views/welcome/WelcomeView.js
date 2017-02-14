import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link, hashHistory } from 'react-router';
import EllipsisText  from 'react-ellipsis-text';

class WelcomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
		};

		this.props.relay.forceFetch();

		this.renderAllMemoirs = this.renderAllMemoirs.bind(this);
		this.goToMemoir = this.goToMemoir.bind(this);
	}

	goToMemoir(memoirId) {
		hashHistory.push(`/memoir/view?memoirId=${memoirId}`);
	}

	renderAllMemoirs(memoirs) {
		return memoirs.map(memoir => {
			return (
				<div key={memoir.node.memoirId} className="flex-child" onClick={() => this.goToMemoir(memoir.node.memoirId)}>
					<h4 style={{color: '#000'}}>{memoir.node.title}</h4>
					<EllipsisText text={memoir.node.content} length={40} />
				</div>
			);
		});
	}

	render() {
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
