import React, { Component } from 'react';
import Relay from 'react-relay';

import Navigator from '../common/Navigator';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log('viewer in App', this.props.viewer);
    return (
      <div className="App" id="root">
        <Navigator userInfo={this.props.viewer.userInfo} />
        { React.cloneElement(this.props.children, {/*props*/}) }
      </div>
    );
  }
}

// export default App;
export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        userInfo {
          ${Navigator.getFragment('userInfo')}
        }
      }
    `,
  }
})
