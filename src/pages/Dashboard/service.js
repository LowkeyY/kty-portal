import request from 'umi-request';

export async function queryProjects() {
  return request('/_api/projects');
}

export async function queryNotice() {
  return request('/_api/projects/notice');
}
