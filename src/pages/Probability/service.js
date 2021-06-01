import request from 'umi-request';

export async function queryList(params) {
  return request('/_api/zhdzpjcqbjcxx/list', {
    params
  });
}

export async function queryResult(params) {
  return request('/_api/zhdzpjcqbzylsj/list', {
    params
  });
}

export async function queryTotal(params) {
  return request('/_api/zhdzpjqbzylhz/list', {
    params
  });
}

export async function queryConf(params) {
  return request('/_api/zhdzpjcqbjcxx/conf', {
    params
  });
}

export async function create(params) {
  return request('/_api/zhdzpjcqbjcxx/add', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function deleteItem(params) {
  return request('/_api/zhdzpjcqbjcxx/remove', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function update(params) {
  return request('/_api/zhdzpjcqbjcxx/update', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function calculateItem(params) {
  return request('/_api/zhdzpjcqbzylsj/submitSelect', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function calculateAll(params) {
  return request('/_api/zhdzpjcqbzylsj/submit', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function calculateTotal(params) {
  return request('/_api/zhdzpjqbzylhz/submit', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}
