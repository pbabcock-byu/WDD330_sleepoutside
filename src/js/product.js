
// Add getParams funtion to the below import - week 2 step 5 URL Parameters
import { setLocalStorage, getParams } from "./utils.mjs";
// note that the ProductData.mjs module is imported.
import ProductData from "./ProductData.mjs";
// an instance of the ProductData class is then created.
const dataSource = new ProductData("tents");


// Added week 2 step 5 point 4 to test getParams function
const productId = getParam('product');
// Added week 2 step 5 point 4 to test out our findProductById method
console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
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
