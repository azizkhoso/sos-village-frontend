import axios from 'axios';

const houses = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin/houses`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding interceptor so that on every request, authorization header should be available
houses.interceptors.request.use((config) => {
  const updated = {
    ...config,
    headers: {
      ...config.headers,
      common: {
        ...config.headers.common,
        authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    },
  };
  return updated;
});

export function getHouses() {
  return houses.get();
}

export function addHouse(data = { name: '', mother: '' }) {
  return houses.post('/', data);
}

export function updateHouse(id, data = { name: '', mother: '' }) {
  return houses.post(`/${id}`, data);
}

export function deleteHouse(id) {
  return houses.delete(`/${id}`);
}
