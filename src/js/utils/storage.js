const Storage = {
  saveCart: cartItem => {
    const foundIndex = Storage.getCart().findIndex(
      item => item.id === cartItem.id
    );

    if (foundIndex === -1) {
      carts = [...carts, cartItem];
    } else {
      carts[foundIndex].amount += 1;
    }

    localStorage.setItem('carts', JSON.stringify(carts));
  },
  getCart: () => {
    return localStorage.getItem('carts')
      ? JSON.parse(localStorage.getItem('carts'))
      : [];
  },
};

export default Storage;

export let carts = Storage.getCart();
