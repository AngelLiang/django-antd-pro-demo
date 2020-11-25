import request from 'umi-request';

export async function queryCurrentUser() {
  return request('/api/auth/currentUser/');
}

export async function updateCurrentUser(params) {
  return request('/api/auth/currentUser/', {
    method: 'PATCH',
    data: { ...params, },
  });
}
