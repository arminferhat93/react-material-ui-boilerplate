import httpRequest from 'services/httpRequest';
import { IAuthCredentials } from '../models/IAuthState';

class ServerManager {
  static fetchTodo = async (url: string) => {
    return httpRequest.get(url, {
      showSpinner: true,
    });
  };

  static fetchMultiRequest = async (url: string) => {
    return httpRequest.get(url);
  };

  static login = async (body: IAuthCredentials) => {
    return httpRequest.post('/auth', body);
  };
}
export default ServerManager;
