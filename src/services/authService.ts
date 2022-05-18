import ServerManager from '../apis/common.api';
import GlobalManager from '../helpers/globalManager';
import { USER_ROLE } from '../configs';

class AuthService {
  handleAuthentication = () => {
    const accessToken = this.getAccessToken();
    if (!accessToken || !this.isValidToken(accessToken)) return;
    this.setSession('accessToken', accessToken);
  };

  loginWithJwt = async (username: string, password: string) => {
    const roleUser = USER_ROLE.ADMIN;
    const response = await ServerManager.login({ username, password });
    if (!GlobalManager.IsEmpty(response)) {
      const { token, data } = response.data;
      this.setSession('accessToken', token);
      this.setSession('user', JSON.stringify(data));
    }
    return {
      user: username,
      role: roleUser,
    };
  };

  setSession = (key: string, accessToken: string) => {
    localStorage.setItem(key, accessToken);
  };

  logOut = () => {
    localStorage.clear();
  };

  getUser = () => {
    return localStorage.getItem('user') || '';
  };

  getAccessToken = () => localStorage.getItem('accessToken');

  isAuthenticated = () => !!this.getAccessToken();

  isValidToken = (accessToken: string | null) => {
    const expireTime = 1606275140.897;
    if (!accessToken) return false;

    const currentTime = Date.now() / 1000;

    return expireTime < currentTime;
  };
}

const authService = new AuthService();

export default authService;
