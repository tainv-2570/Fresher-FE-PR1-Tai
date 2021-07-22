import { carts } from './utils/storage.js';
const itemTotals = document.getElementById('cartNumbers');

export const setItemValues = cart => {
  let tempTotal = 0;
  let itemTotal = 0;

  cart.map(item => {
    tempTotal += item.price * item.amount;
    itemTotal += item.amount;
  });
  // cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
  itemTotals.innerText = itemTotal;
};

document.addEventListener('DOMContentLoaded', () => {
  setItemValues(carts);
});
