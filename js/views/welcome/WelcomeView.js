import React from 'react';
import Relay from 'react-relay';

class WelcomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    }
  }

  render() {
    console.log('Welcome view state:', this.state);
    return (
      <div>
        The welcome view
      </div>
    )
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
