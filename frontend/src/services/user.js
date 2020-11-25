import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/auth/currentUser/');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function updateCurrentUser(params) {
  return request('/api/auth/currentUser/', {
    method: 'PATCH',
    data: { ...params, },
  });
}
