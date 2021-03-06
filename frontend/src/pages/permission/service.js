import request from '@/utils/request';

export async function queryPermission(params) {
  return request('/api/auth/permission/', {
    params,
  });
}

export async function updatePermission(id, params) {
  return request(`/api/auth/permission/${id}/`, {
    method: 'PATCH',
    data: { ...params, },
  });
}
