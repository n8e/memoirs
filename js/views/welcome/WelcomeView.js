import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link, hashHistory } from 'react-router';
import EllipsisText  from 'react-ellipsis-text';
import FRC from 'formsy-react-components';
const { Input } = FRC;

class WelcomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			searchTerm: null,
			searching: false,
			searchResults: [],
		};

		this.props.relay.forceFetch();

		this.renderAllMemoirs = this.renderAllMemoirs.bind(this);
		this.goToMemoir = this.goToMemoir.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSearch({searchInput}) {
		let searchSet = this.props.viewer.memoirs.items.edges,
			resultSet = [];
		for (let i = 0, n = searchSet.length; i < n; i++) {
			if (searchSet[i].node.title.toLowerCase().includes(searchInput.toLowerCase())) {
				resultSet.push(searchSet[i].node);
			}
		}
		this.setState({ searchResults : resultSet, searching: true });
	}

	handleChange(e) {
		const { value } = e.target;
		this.handleSearch({searchInput: value});
	}

	goToMemoir(memoirId) {
		hashHistory.push(`/memoir/view?memoirId=${memoirId}`);
	}

	renderSearchMemoirs(memoirs) {
		return memoirs.map(memoir => {
			return (
				<div key={memoir.memoirId} className="flex-child" onClick={() => this.goToMemoir(memoir.memoirId)}>
					<h4 style={{color: '#000'}}>{memoir.title}</h4>
					<EllipsisText text={memoir.content} length={39} />
				</div>
			);
		});
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
		let searchForm = null;
		return (
      <div className="flex-container">
				<div>
					<span className="glyphicon glyphicon-search"></span>
					<input type="text" onChange={this.handleChange} name="searcherInput" />
				</div>
				<div>
					<FRC.Form
						onSubmit={this.handleSearch}
						layout="horizontal"
						validateOnSubmit={false}
            validatePristine={false}
            disabled={false}
            ref={(form) => { searchForm = form; }}
					>
						<fieldset>
							<Input
								name="searchInput"
								value=""
								label="Search Memoir by Title"
								type="text"
								addonBefore={<span className="glyphicon glyphicon-search"></span>}
							/>
							<button type="submit">Search</button>
						</fieldset>
					</FRC.Form>
				</div>

				{
					this.state.searching ?
					this.renderSearchMemoirs(this.state.searchResults) :
					this.renderAllMemoirs(this.props.viewer.memoirs.items.edges)
				}

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


const isEquivalent = (a, b) => {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
