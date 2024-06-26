/* eslint-disable no-console */
import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

// PB: Superscript for the cart counter in the header
//const cartTotalItems = Object.keys(localStorage);
//const cartItemCount = cartTotalItems.length;

const cartItemCountElement = document.getElementById("cartItemCount");

function updateCartItemCount() {
  const cartItems = getLocalStorage("so-cart");
  const cartItemCount = cartItems.length;
  if (cartItemCountElement != null) {
    cartItemCountElement.textContent = cartItemCount;
  }
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems)) {
    //console.error("Cart items should be an array", cartItems);
    //return;
  }
  const htmlItems = cartItems.map(cartItemTemplate).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;
  addRemoveEventListeners();
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span></span>
  <span></span>

    <button class="remove-from-cart" data-id="${item.Id}">X</button>

  
</li>`;

  // return newItem;
}

function addRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      removeFromCart(productId);
    });
  });
}

function removeFromCart(productId) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  updateCartItemCount();
}

renderCartContents();
updateCartItemCount();
loadHeaderFooter();
