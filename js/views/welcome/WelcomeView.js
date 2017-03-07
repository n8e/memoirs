import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link, hashHistory } from 'react-router';
import EllipsisText from 'react-ellipsis-text';
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

    this.renderAllMemoirs = this.renderAllMemoirs.bind(this);
    this.goToMemoir = this.goToMemoir.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.props.relay.forceFetch();
  }

  handleSearch({ searchInput }) {
    const searchSet = this.props.viewer.memoirs.items.edges;
    const resultSet = [];
    for (let i = 0, n = searchSet.length; i < n; i++) {
      if (searchSet[i].node.title.toLowerCase().includes(searchInput.toLowerCase())) {
        resultSet.push(searchSet[i].node);
      }
    }
    this.setState({ searchResults: resultSet, searching: true });
  }

  handleChange(e) {
    const { value } = e.target;
    this.handleSearch({ searchInput: value });
  }

  goToMemoir(memoirId) {
    hashHistory.push(`/memoir/view?memoirId=${memoirId}`);
  }

  renderSearchMemoirs(memoirs) {
    return memoirs.map(memoir => (
      <div
        key={memoir.memoirId}
        className="flex-child"
        onClick={() => this.goToMemoir(memoir.memoirId)}
      >
        <h4 style={{ color: '#000' }}>
          {memoir.title}
        </h4>
        <EllipsisText text={memoir.content} length={39} />
      </div>
    ));
  }

  renderAllMemoirs(memoirs) {
    return memoirs.map(memoir => (
      <div
        key={memoir.node.memoirId}
        className="flex-child"
        onClick={() => this.goToMemoir(memoir.node.memoirId)}
      >
        <h4 style={{ color: '#000' }}>{memoir.node.title}</h4>
        <EllipsisText text={memoir.node.content} length={40} />
      </div>
			));
  }

  render() {
    let searchForm = null;
    return (
      <div className="flex-container">
        <div>
          <span className="glyphicon glyphicon-search" />
          <input maxLength="10" type="text" onChange={this.handleChange} name="searcherInput" />
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
                maxLength="10"
                type="text"
                addonBefore={<span className="glyphicon glyphicon-search" />}
              />
              <button type="submit">Search</button>
            </fieldset>
          </FRC.Form>
        </div>

        {this.state.searching ?
          this.renderSearchMemoirs(this.state.searchResults) :
          this.renderAllMemoirs(this.props.viewer.memoirs.items.edges)
        }

      </div>
    );
  }
}

WelcomeView.propTypes = {
  viewer: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

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
    `,
  },
});
