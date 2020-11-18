import request from '@/utils/request';

export async function queryGroup(params) {
  return request('/api/auth/group/', {
    params,
  });
}
export async function addGroup(params) {
  return request('/api/auth/group/', {
    method: 'POST',
    data: { ...params },
  });
}

export async function updateGroup(id, params) {
  return request(`/api/auth/group/${id}/`, {
    method: 'PATCH',
    data: { ...params, },
  });
}
