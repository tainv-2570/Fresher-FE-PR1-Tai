import productApi from './api/productApi.js';
import Storage, { carts } from './utils/storage.js';
import { setItemValues } from './index.js';

const productLists = document.getElementById('product_lists');
const productGrid = document.getElementById('product_grid');
const addBtns = document.getElementsByClassName('btn--cart');

const fetchProducts = async () => {
  try {
    const products = await productApi.getAll({ params: '_page=1&_limit=9' });
    render(products);
  } catch (errors) {
    if (errors.response.status === 404) {
      renderError(errors.response);
    }
  }
};

const render = products => {
  const contentGrid = products.map(
    product => `<div class='col-sm-6 col-md-6 col-lg-4'>
    <div class='product'>
      <div class='product__image'>
        <div class='product__image-line'></div><img class='product__image-main' src='./assets/images/products/${product.img}' alt='product14'>
        <div class='product__image-action'>
          <p class='action__item'><i class='fas fa-heart'></i>Yêu thích</p>
          <p class='action__item'><i class='fas fa-signal'></i>So sánh</p><i class='fas fa-external-link-alt'></i>
        </div>
      </div><a href='./detail.html'>
        <h1 class='product__name'>${product.name}</h1>
        <p class='product__price'>${product.price} <span class='product__price-discount'> 450.000đ</span></p></a>
        <button class='btn btn--black btn--cart' data-id= ${product.id}>add to cart</button>
    </div>
  </div>`
  );
  const contentLists = products.map(
    product => `<div class="col-sm-12">
    <div class="product row">
      <div class="col-md-4">
        <div class="product__image">
          <div class="product__image">
            <div class="product__image-line"></div><img class="product__image-main" src="./assets/images/products/${product.img}" alt="product14">
            <div class="product__image-action">
              <p class="action__item"><i class="fas fa-heart"></i>Yêu thích</p>
              <p class="action__item"><i class="fas fa-signal"></i>So sánh</p><i class="fas fa-external-link-alt"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="product__info">
          <h1 class="product__name">${product.name}</h1>
          <p class="product__price">${product.price} </p>
          <p class="product__desc">${product.desc}</p>
          <button class="btn btn--black btn--cart" data-id= ${product.id}>add to cart</button><span class="product__info-action"><span class="action__item"><i class="fas fa-heart"></i>Yêu thích</span><span class="action__item"><i class="fas fa-signal"></i>So sánh</span></span>
        </div>
      </div>
    </div>
  </div>`
  );
  productLists.innerHTML = contentLists.join('');
  productGrid.innerHTML = contentGrid.join('');

  for (let i = 0; i < addBtns.length; i++) {
    let button = addBtns[i];
    const id = button.dataset.id;
    button.addEventListener('click', () =>
      addToCart(products.find(item => item.id === parseInt(id)))
    );
  }
};

const renderError = errors => {
  const content = `<p>${errors.statusText}: Không tìm thấy sản phẩm nào!</p>`;
  productLists.innerHTML = content;
  productGrid.innerHTML = content;
};

const addToCart = product => {
  const cartItem = { ...product, amount: 1 };
  Storage.saveCart(cartItem);
  setItemValues(carts);
};

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  setItemValues(carts);
});
