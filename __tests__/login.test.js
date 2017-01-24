// Link.react-test.js
import React from 'react';
import TestUtils from 'react-addons-test-utils'
import Relay from '../__mocks__/react-relay.js';
import LoginView from '../js/views/login/LoginView';

test('LoginView', () => {
  const fixtures = {
    viewer: {
      userInfo: {
        userName: 'Nate'
      }
    }
  }

  const result = TestUtils.renderIntoDocument(
    <LoginView {...fixtures} />
  );

  expect(result.state.fail).toBe('none');
});
