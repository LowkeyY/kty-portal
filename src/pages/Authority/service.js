import request from 'umi-request';


export async function queryRole(params) {
  return request('/_api/role/list', {
    params
  });
}

export async function createRole(params) {
  return request('/_api/role/add', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function updateRole(params) {
  return request('/_api/role/update', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function deleteRole(params) {
  const { roleId } = params;
  return request(`/_api/role/remove/${roleId}`, {
    method: "POST"
  });
}

export async function queryMenu() {
  return request('/_api/menu/getMenuAll');
}

export async function saveAuthority(params) {
  return request('/_api/role/updateRoleMenus', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

