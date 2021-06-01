import request from 'umi-request';

export async function queryDept(params) {
  return request('/_api/dept/findDept', {
    params
  });
}


export async function addDept(params) {
  return request('/_api/dept/add', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function updateDept(params) {
  return request('/_api/dept/update', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function queryItemDept(params) {
  const { deptId = '' } = params;
  return request(`/_api/dept/get/${deptId}`);
}

export async function dvalidate(params) {
  const { deptId } = params;
  return request(`/_api/dept/dvalidate/${deptId}`);
}

export async function deleteDept(params) {
  return request('/_api/dept/delete', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function queryUser(params) {
  return request('/_api/user/deptUser', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}


export async function addUser(params) {
  return request('/_api/user/add', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function updateUser(params) {
  return request('/_api/user/update', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function resetPassword(params) {
  return request('/_api/user/updatepwd', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function deleteUser(params) {
  return request('/_api/user/delete', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}
