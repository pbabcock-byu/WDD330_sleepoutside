import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";


const productDataInstance = new ProductData("tents")

const productListElement = document.querySelector(".product-list");

const productListing = new ProductListing("tents", productDataInstance, productListElement);
productListing.init();

