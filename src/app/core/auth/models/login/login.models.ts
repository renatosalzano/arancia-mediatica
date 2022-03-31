export interface LoginModel {
  username: string;
  password: string;
  newPasswordRequiredCb?: (...argw: any) => {};
  onSuccessCb?: (...argw: any) => {};
  onFailureCb?: (...argw: any) => {};
}
