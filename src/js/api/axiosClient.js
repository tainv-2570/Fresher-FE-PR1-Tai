const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => JSON.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  }
);
export default axiosClient;
