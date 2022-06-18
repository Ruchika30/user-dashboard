

// import promiseMemoize from 'promise-memoize';
import { API_ROUTES } from '../network/apiRoutes'
import { api } from './api';

export const userSignup = async params => {
  const response = await api({ type: 'POST', requestURL: `${API_ROUTES.signUp}`, data: params });

  return response;
};

export const userLogin = async params => {
  const response = await api({ type: 'POST', requestURL: `${API_ROUTES.login}`, data: params });

  return response;
};

export const listUsers = async ({
  pageNumber, pageSize
}) => {
  const response = await api({ type: 'GET', requestURL: `${API_ROUTES.listUsers}`, pageNo: pageNumber, pagesize: pageSize });

  return response;
}


export const createUserService = async params => {
  const response = await api({ type: "POST", requestURL: `${API_ROUTES.listUsers}`, data: params });

  return response;
}

export const updateUser = async ({ id, ...params }) => {
  const response = await api({ type: 'PUT', requestURL: `${API_ROUTES.listUsers}/${id}`, data: params });

  return response;
}



export const deleteUserService = async ({ id }) => {
  const response = await api({ type: 'DELETE', requestURL: `${API_ROUTES.listUsers}/${id}` });

  return response;
}


