import axios from 'axios';

const receipts = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin/receipts`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding interceptor so that on every request, authorization header should be available
receipts.interceptors.request.use((config) => {
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

export function getReceipts() {
  return receipts.get();
}

export function addReceipt(data = { registeryNumber: 0, item: '', quantityReceived: 0 }) {
  return receipts.post('/', data);
}

export function updateReceipt(id, data = { registeryNumber: 0, item: '', quantityReceived: 0 }) {
  return receipts.post(`/${id}`, data);
}

export function deleteReceipt(id) {
  return receipts.delete(`/${id}`);
}
