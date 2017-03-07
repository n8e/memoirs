import React, { Component, PropTypes } from 'react';

import Navigator from '../common/Navigator';
import { getUserInfo } from '../../reusable/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: getUserInfo().userName,
        loggedIn: getUserInfo().loggedIn,
        token: getUserInfo().token,
      },
    };
  }

  render() {
    return (
      <div className="App" id="root">
        <Navigator userInfo={this.state.userInfo} />
        { React.cloneElement(this.props.children, {/* props*/}) }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
