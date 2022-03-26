import axios from 'axios';

const items = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin/items`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding interceptor so that on every request, authorization header should be available
items.interceptors.request.use((config) => {
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

export function getItems() {
  return items.get();
}

export function addItem(data = { name: '', measurementUnit: '', unitShortform: '' }) {
  return items.post('/', data);
}

export function updateItem(id, data = { name: '', measurementUnit: '', unitShortform: '' }) {
  return items.post(`/${id}`, data);
}

export function deleteItem(id) {
  return items.delete(`/${id}`);
}
