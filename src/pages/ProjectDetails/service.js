import request from 'umi-request';

export async function queryList() {
  return request('/_api/project/filelist');
}

export async function queryMembers() {
  return request('/_api/project/members ');
}

export async function queryCountry() {
  return request('/_api/project/countries');
}

export async function queryTask() {
  return request('/_api/project/tasklist');
}

export async function queryInfo(params) {
  return request('/_api/xmjcxx', {
    params
  });
}

export async function updateInfo(params) {
  return request('/_api/xmjcxx/update', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function updateProgress(params) {
  return request('/_api/xmztxx/update', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}

export async function addVersion(params) {
  return request('/_api/xmjcxx/apply', {
    method: "POST",
    data: params,
    requestType: 'form'
  });
}
