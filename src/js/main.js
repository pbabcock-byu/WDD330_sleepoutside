//import ProductData from "./ProductData.mjs";
//import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";



document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

// PB: Superscript for the cart counter in the header
const cartItems = Object.keys(localStorage);
const cartItemCount = cartItems.length;
const cartItemCountElement = document.querySelector("#cartItemCount");
if (cartItemCountElement != null) {
  cartItemCountElement.textContent = cartItemCount;
}

});