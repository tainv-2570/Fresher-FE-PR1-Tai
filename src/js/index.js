import Storage from './utils/storage.js';
let carts = Storage.getCart();
const itemTotals = document.getElementById('cartNumbers');
const totalPrice = document.querySelector('.total__price');

export const setItemValues = cart => {
  let tempTotal = 0;
  let itemTotal = 0;

  cart.map(item => {
    tempTotal += item.price * item.amount;
    itemTotal += item.amount;
  });
  totalPrice.innerText = formatter.format(tempTotal * 1000);
  itemTotals.innerText = itemTotal;
};

export const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'VND',
});

document.addEventListener('DOMContentLoaded', () => {
  setItemValues(carts);
});
