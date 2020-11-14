import request from '@/utils/request';

export async function queryUser(params) {
  return request('/api/auth/user/', {
    params,
  });
}
