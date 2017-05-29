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
      searchInput: null,
      type: 'title',
      searching: false,
      searchResults: [],
    };

    this.renderAllMemoirs = this.renderAllMemoirs.bind(this);
    this.goToMemoir = this.goToMemoir.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.props.relay.forceFetch();
  }

  handleSearch({ searchInput, type }) {
    const searchSet = this.props.viewer.memoirs.items.edges;
    const resultSet = [];
    for (let i = 0, n = searchSet.length; i < n; i += 1) {
      if (searchSet[i].node[type].toLowerCase().includes(searchInput.toLowerCase())) {
        resultSet.push(searchSet[i].node);
      }
    }
    this.setState({ searchResults: resultSet, searching: true });
  }

  /*
  * Add an onChange event on the search input tag and assign this function
  * in order to do the search as the user types
  */
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // this.handleSearch({ searchInput: this.state.searchInput, type: this.state.type });
  }

  handleKeyUp(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (e.keyCode === 13) {
      this.handleSearch({ searchInput: this.state.searchInput, type: this.state.type });
    }
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
        <EllipsisText text={memoir.content} length={50} />
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
    return (
      <div className="flex-container">
        <div className="search-container-div">
          <span className="input-group-addon search-glyph">
            <span className="glyphicon glyphicon-search" />
          </span>
          <input
            maxLength="10"
            type="text"
            name="searchInput"
            onKeyUp={this.handleKeyUp}
            className="form-control search-input"
          />
          <select
            name="type"
            defaultValue={this.state.type}
            onChange={this.handleChange}
            className="input-group-addon search-select"
          >
            <option value="">Select...</option>
            <option value="title">Title</option>
            <option value="content">Content</option>
          </select>
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
  viewer: PropTypes.shape({
    memoirs: PropTypes.shape({
      id: PropTypes.string,
      items: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }).isRequired,
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
