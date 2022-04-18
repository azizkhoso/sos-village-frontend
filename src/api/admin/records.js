import axios from 'axios';

const records = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin/records`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding interceptor so that on every request, authorization header should be available
records.interceptors.request.use((config) => {
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

export function getRecords() {
  return records.get();
}

export function getReport(query = { month: 1, year: new Date().getFullYear() }, houseId) {
  return records.get(`/report/${houseId}?month=${query.month}&&year=${query.year}`);
}

export function addRecord(data = { name: '', mother: '' }) {
  return records.post('/', data);
}

export function updateRecord(id, data = { name: '', mother: '' }) {
  return records.post(`/${id}`, data);
}

export function deleteRecord(id) {
  return records.delete(`/${id}`);
}
