import request from '@/utils/request';

export async function queryUser(params) {
  return request('/api/auth/user/', {
    params,
  });
}
export async function addUser(params) {
  return request('/api/auth/user/create_user/', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateUser(id, params) {
  return request(`/api/auth/user/${id}/`, {
    method: 'PATCH',
    data: { ...params, },
  });
}

export async function setUserPassword(id, params) {
  return request(`/api/auth/user/${id}/set_password/`, {
   method: 'POST',
   data: { ...params},
});
}
