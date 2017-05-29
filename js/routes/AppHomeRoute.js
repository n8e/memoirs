import Relay, { Route } from 'react-relay';

export default class extends Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
