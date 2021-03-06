// @ts-ignore
import {request} from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryMenu() {
  return request<API.MenuData>('/_api/menu/getUserMenu');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

export async function upLoadFiles(params: any) {
  return request('/_api/file/upload', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}
