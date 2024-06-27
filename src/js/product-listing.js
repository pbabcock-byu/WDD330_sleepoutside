import ProductData from "./ProductData.mjs";
//import ProductList from "./ProductList.mjs";
//import productList from "./ProductList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";


document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

// PB: Superscript for the cart counter in the header
const cartItems = Object.keys(localStorage);
const cartItemCount = cartItems.length;
const cartItemCountElement = document.getElementById("cartItemCount");
if (cartItemCountElement != null) {
  cartItemCountElement.textContent = cartItemCount;
}
});




const category = getParams("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
