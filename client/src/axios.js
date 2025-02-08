import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Thay đổi URL này thành URL API của bạn
  timeout: 10000, // Thời gian chờ yêu cầu (10 giây)
  headers: {
    'Content-Type': 'application/json',
    // Thêm các header khác nếu cần
  },
});

// Bạn có thể thêm các interceptor nếu cần
instance.interceptors.request.use(
  config => {
    // Thêm logic trước khi gửi yêu cầu
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    // Thêm logic trước khi trả về phản hồi
    return response.data;
  },
  error => {
    return error.data;
  }
);

export default instance;