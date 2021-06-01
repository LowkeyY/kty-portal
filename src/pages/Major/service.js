import request from 'umi-request';

export async function queryMajor() {
  return request('/_api/zyxx/list');
}

export async function queryModelType() {
  return request('/_api/mklx/list');
}

export async function queryModel(params) {
  return request('/_api/zyxx', {
    params
  });
}


export async function createMajor(params) {
  return request('/_api/zyxx/add', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function updateMajor(params) {
  return request('/_api/zyxx/update', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function deleteMajor(params) {
  return request('/_api/zyxx/remove', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}


export async function createModel(params) {
  return request('/_api/mkxx/add', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function updateModel(params) {
  return request('/_api/mkxx/update', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function deleteModel(params) {
  return request('/_api/mkxx/remove', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function createModelType(params) {
  return request('/_api/mklx/add', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function deleteModelType(params) {
  return request('/_api/mklx/remove', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}
