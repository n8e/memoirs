// Link.react-test.js
import React from 'react';
import TestUtils from 'react-addons-test-utils'
import Relay from '../__mocks__/react-relay.js';
import LoginView from '../js/views/login/LoginView';

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

test('LoginView initial state', () => {
  expect(result.state.fail).toBe('none');
  expect(result.state.success).toBe('none');
  expect(result.state.user.username).toBe(null);
  expect(result.state.user.password).toBe(null);
});

test('LoginView functions', () => {
  expect(result.onSuccess).toBeDefined();
  expect(typeof result.onSuccess).toBe('function');
  expect(result.onFailure).toBeDefined();
  expect(result.handleChange).toBeDefined();
  expect(result.handleLogin).toBeDefined();
});
