import global from 'global';

export function storeLoginObj(loginObj) {
  global.loggedIn = loginObj.loggedIn;
  global.userName = loginObj.userName;
  global.token = loginObj.token;
  return global;
}

export function clearLoginObj() {
  global.loggedIn = false;
  global.userName = '';
  global.token = '';
  return {};
}

export function getUserInfo() {
  return {
    loggedIn: global.loggedIn,
    userName: global.userName,
    token: global.token,
  };
}
