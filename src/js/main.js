// PB: Superscript for the cart counter in the header
const cartItems = Object.keys(localStorage);
const cartItemCount = cartItems.length;
const cartItemCountElement = document.getElementById("cartItemCount");
if (cartItemCountElement != null) {
  cartItemCountElement.textContent = cartItemCount;
}

import ProductData from "./ProductData.mjs";
const dataSource = new ProductData("tents");

import ProductList from "./ProductList.mjs";


const element = document.querySelector(".product-list");
const listing = new ProductList("tents", dataSource, element);

listing.init();
