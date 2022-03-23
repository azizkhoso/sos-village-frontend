import axios from 'axios';

const login = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/login`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function verifyLogin(token) {
  return login.post('/verify', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function loginAdmin(data) {
  return login.post('/', data);
}
