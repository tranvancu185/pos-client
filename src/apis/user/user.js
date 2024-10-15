import axiosRequest from 'src/utils/request';

const prefix = '/user';

export const getListUser = async ({ params }) => {
  return await axiosRequest({
    url: `${prefix}`,
    method: 'GET',
    params,
  });
};

export const createUser = async ({ data }) => {
  return await axiosRequest({
    url: `${prefix}/create`,
    method: 'POST',
    data,
  });
};

export const updateUser = async ({ data }) => {
  return await axiosRequest({
    url: `${prefix}/update`,
    method: 'PUT',
    data,
  });
};

export const deleteUser = async ({ data }) => {
  return await axiosRequest({
    url: `${prefix}/delete`,
    method: 'DELETE',
    data,
  });
};

export const getUserById = async ({ id }) => {
  return await axiosRequest({
    url: `${prefix}/detail/${id}`,
    method: 'GET',
  });
};

export const getProfile = async () => {
  return await axiosRequest({
    url: `${prefix}/profile`,
    method: 'GET',
  });
};
