import axios from 'axios';

const inkinds = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin/inkinds`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding interceptor so that on every request, authorization header should be available
inkinds.interceptors.request.use((config) => {
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

export function getInkinds() {
  return inkinds.get();
}

export function addInkind(data = { registeryNumber: 0, item: '', quantityReceived: 0 }) {
  return inkinds.post('/', data);
}

export function updateInkind(id, data = { registeryNumber: 0, item: '', quantityReceived: 0 }) {
  return inkinds.post(`/${id}`, data);
}

export function deleteInkind(id) {
  return inkinds.delete(`/${id}`);
}
