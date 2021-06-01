import request from 'umi-request';

export async function queryList(params) {
  return request('/api/queryTableList',{
    params
  });
}

export async function queryTabList(params) {
  return request('/api/queryTabList',{
    params
  });
}
