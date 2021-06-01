import {request} from 'umi';

export interface LoginParamsType {
  username: string;
  password: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/_api/login/account', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function outLogin() {
  return request('/_api/login/logout');
}
