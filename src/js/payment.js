import orderApi from './api/orderApi.js';
import Storage from './utils/storage.js';
import { setItemValues, formatter } from './index.js';

const productList = document.querySelector('.address__product-list');
const form = document.querySelector('.address__form');

const render = products => {
  const content = products.map(
    product => `<li class="list__item"><img src="assets/images/products/${product.img}" alt="product1">
    <div class="list__item-name">
      <h1>${product.name}</h1>
      <p>Số lượng: ${product.amount}</p>
    </div>
    <p>${product.price}&nbsp;₫</p>
  </li>`
  );
  productList.innerHTML = content.join('');
};

form.addEventListener('submit', e => handelSubmitPayment(e));

const handelSubmitPayment = async e => {
  try {
    e.preventDefault();
    let carts = Storage.getCart();
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    const body = { ...formValues, order_items: carts };
    const res = await orderApi.postOrder(body);
    if (res) {
      Storage.removeCart();
      setItemValues([]);

    }
  } catch (errors) {
    console.log(errors);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  let carts = Storage.getCart();
  render(carts);
});
