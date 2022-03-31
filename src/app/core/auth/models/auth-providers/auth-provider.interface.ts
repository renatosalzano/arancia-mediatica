import { LoginModel } from "../login/login.models";

export interface AuthProviderInterface {

	/**
	 * Federated login.
	 */
	federatedLogin();

	/**
	 * Login local user.
	 */
	login(requestModel: LoginModel);

	/**
	 * Logout current user.
	 */
	logout();

	/**
	 * Change user password
	 * TODO type callback functions
	 */
	changePwd(newPassword: string, onSuccessCb?, onFailureCb?);

	/**
	 * Check whether there's an active user session
	 */
	isAuthenticated(): Promise<boolean>;
}
