import ExternalServices from "./ExternalServices.mjs";
//import ProductList from "./ProductList.mjs";
//import productList from "./ProductList.mjs";
import { getParams, loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import ProductList from "./ProductList.mjs";

// document.addEventListener("DOMContentLoaded", async () => {
//     await loadHeaderFooter();

// // PB: Superscript for the cart counter in the header
// const cartItems = Object.keys(localStorage);
// const cartItemCount = cartItems.length;
// const cartItemCountElement = document.getElementById("cartItemCount");
// if (cartItemCountElement != null) {
//   cartItemCountElement.textContent = cartItemCount;
// }
// });

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  // PB: Superscript for the cart counter in the header
  const cartItems = getLocalStorage("so-cart");
  const cartItemCount = cartItems.length;
  const cartItemCountElement = document.querySelector("#cartItemCount");
  if (cartItemCountElement != null) {
    cartItemCountElement.textContent = cartItemCount;
  }
});

const category = getParams("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
