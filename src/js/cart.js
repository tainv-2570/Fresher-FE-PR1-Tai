import Storage from './utils/storage.js';
import { setItemValues, formatter } from './index.js';

const cartList = document.querySelector('.cart__table-list');
const btnRemoveToCarts = document.getElementsByClassName('btn--removeToCart');
const inputAmounts = document.getElementsByClassName('cart__table-input');

const render = products => {
  const content = products.map(
    product => `<tr>
    <td width="17%"><img src="./assets/images/products/${
      product.img
    }" alt="product-1.jpg"></td>
    <td width="30%">
      <h1 class="product__name">${product.name}</h1>
    </td>
    <td width="15%">
      <p class="product__price">${product.price}&nbsp;₫</p>
    </td>
    <td width="15%">
      <input class="cart__table-input" type="number" data-id=${
        product.id
      } name="amount" min="1" value="${product.amount}">
    </td>
    <td width="17%">
      <p class="product__price">${
        parseInt(product.amount) === 1
          ? `${product.price}&nbsp;₫`
          : product.total
      }</p>
    </td>
    <td width="6%">
      <i class="fas fa-trash-alt btn--removeToCart" data-id=${product.id}></i>
    </td>
  </tr>`
  );

  cartList.innerHTML = content.join('');

  for (let i = 0; i < btnRemoveToCarts.length; i++) {
    let button = btnRemoveToCarts[i];
    button.addEventListener('click', e => removeToCart(e));
  }

  for (let i = 0; i < inputAmounts.length; i++) {
    let input = inputAmounts[i];
    input.addEventListener('change', e => handelChangeAmount(e));
  }
};

const removeToCart = e => {
  let { id } = e.target.dataset;
  let carts = Storage.getCart();
  const cartsFiltered = carts.filter(item => item.id !== parseInt(id));
  setItemValues(cartsFiltered);
  Storage.saveCart(cartsFiltered);
  cartList.removeChild(e.target.parentElement.parentElement);
};

const handelChangeAmount = e => {
  let { dataset, value } = e.target;
  let carts = Storage.getCart();
  const tempItem = carts.find(item => item.id === parseInt(dataset.id));
  if (parseInt(value) > 0) {
    tempItem.amount = parseInt(value);
  } else {
    tempItem.amount = 1;
    e.target.value = 1;
  }

  const total = parseInt(tempItem.amount * tempItem.price * 1000);
  tempItem.total = formatter.format(total);
  e.target.parentElement.nextElementSibling.children[0].innerText =
    formatter.format(total);
  setItemValues(carts);
  Storage.saveCart(carts);
};

document.addEventListener('DOMContentLoaded', () => {
  let carts = Storage.getCart();
  render(carts);
  setItemValues(carts);
});
