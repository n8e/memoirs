import { clearLoginObj, getUserInfo } from '../../reusable/auth';

export function logout() {
  clearLoginObj();
  return { userInfo: getUserInfo() };
}
