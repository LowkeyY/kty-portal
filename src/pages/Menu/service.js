import request from 'umi-request';

export async function queryMenu(params) {
  return request('/_api/menu/getMenuTree', {
    params
  });
}


export async function addMenu(params) {
  return request('/_api/menu/add', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function updateMenu(params) {
  return request('/_api/menu/updateMenu', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function deleteMenu(params) {
  return request('/_api/menu/remove', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function queryItemMenu(params) {
  return request('/_api/menu/getMenuById', {
   params
  });
}




