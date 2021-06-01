import request from 'umi-request';

export async function createSubmit(params) {
  return request('/_api/xmjcxx/add',{
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}
