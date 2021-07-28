const Storage = {
  saveCart: carts => {
    localStorage.setItem('carts', JSON.stringify(carts));
  },
  getCart: () => {
    return localStorage.getItem('carts')
      ? JSON.parse(localStorage.getItem('carts'))
      : [];
  },
  removeCart: () => {
    localStorage.removeItem('carts');
  },
};

export default Storage;
