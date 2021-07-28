import axiosClient from './axiosClient.js';

class OrderApi {
  constructor(url) {
    this.url = url;
  }

  postOrder = params => {
    return axiosClient.post(this.url, params);
  };
}
const orderApi = new OrderApi('/order');
export default orderApi;
