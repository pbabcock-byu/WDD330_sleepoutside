import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let currentCart = getLocalStorage("so-cart"); //retrieve from LS
  if (!Array.isArray(currentCart)) {
    //is it an array
    currentCart = [];
  }
  currentCart.push(product); //add to cart
  setLocalStorage("so-cart", currentCart); // save to LS
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
