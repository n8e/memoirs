export function storeLoginObj(loginObj) {
  localStorage.setItem('loggedIn', loginObj.loggedIn);
  localStorage.setItem('userName', loginObj.userName);
  return localStorage.setItem('token', loginObj.token);
}

export function clearLoginObj() {
  localStorage.removeItem('loggedIn');
	localStorage.removeItem('userName');
  return localStorage.removeItem('token');
}

export function getUserInfo() {
  console.log('IN HERE');
  return {
    loggedIn: localStorage.getItem('loggedIn'),
    userName: localStorage.getItem('userName'),
    token: localStorage.getItem('token')
	};
}
