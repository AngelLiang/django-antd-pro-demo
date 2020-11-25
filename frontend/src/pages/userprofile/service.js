import request from 'umi-request';

export async function queryCurrentUser() {
  return request('/api/auth/currentUser/');
}
