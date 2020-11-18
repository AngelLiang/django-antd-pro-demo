import request from '@/utils/request';

export async function queryPermission(params) {
  return request('/api/auth/permission/', {
    params,
  });
}
