import axiosClient from './axiosClient.js';

class ProductApi {
  constructor(url) {
    this.url = url;
  }
  getAll = params => {
    return axiosClient.get(this.url, { params });
  };
}
const productApi = new ProductApi('/products');
export default productApi;
