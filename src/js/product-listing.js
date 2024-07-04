import ExternalServices from "./ExternalServices.mjs";

import { getParams, loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import ProductList from "./ProductList.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  // PB: Superscript for the cart counter in the header
  const cartItems = getLocalStorage("so-cart");
  const cartItemCount = cartItems.length;
  const cartItemCountElement = document.querySelector("#cartItemCount");
  if (cartItemCountElement != null) {
    cartItemCountElement.textContent = cartItemCount;
  }

  const sortSelect = document.querySelector("#sortSelect");
  sortSelect.addEventListener("change", () => {
    const sortValue = sortSelect.value;
    if (sortValue) {
      listing.sortProducts(sortValue);
    } else {
      listing.renderProductList(listing.filteredProducts); // Render the products unsorted
    }
  });

  const category = getParams("category");
  const dataSource = new ExternalServices();
  const element = document.querySelector(".product-list");
  const listing = new ProductList(category, dataSource, element);

  listing.init();
});
