import request from 'umi-request';

export async function queryList(params) {
  return request('/_api/zhdzpjyqcclxx/list', {
    params
  });
}

export async function queryResult(params) {
  return request('/_api/zhdzpjyqcclxx/groupList', {
    params
  });
}


export async function queryConf(params) {
  return request('/_api/zhdzpjyqcclxx/conf', {
    params
  });
}

export async function create(params) {
  return request('/_api/zhdzpjyqcclxx/add', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function deleteItem(params) {
  return request('/_api/zhdzpjyqcclxx/remove', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function update(params) {
  return request('/_api/zhdzpjyqcclxx/update', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

