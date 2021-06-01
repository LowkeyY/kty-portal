import request from 'umi-request';

export async function queryList() {
  return request('/_api/xmjcxx/list');
}

export async function deleteProject(params) {
  return request('/_api/xmjcxx/delete', {
    method: "POST",
    data:params,
    requestType: 'form'
  });
}
