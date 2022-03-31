import { LoginModel } from '../login/login.models';

export interface AuthProviderInterface {
  /**
   * Federated login.
   */
  federatedLogin(): any;

  /**
   * Login local user.
   */
  login(requestModel: LoginModel): any;

  /**
   * Logout current user.
   */
  logout(): any;

  /**
   * Change user password
   * TODO type callback functions
   */
  changePwd(newPassword: string, onSuccessCb?: any, onFailureCb?: any): any;

  /**
   * Check whether there's an active user session
   */
  isAuthenticated(): Promise<boolean>;
}
