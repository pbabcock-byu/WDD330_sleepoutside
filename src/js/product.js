// Add getParams funtion to the below import - week 2 step 5 URL Parameters
import { getParams, loadHeaderFooter } from "./utils.mjs";
// note that the ProductData.mjs module is imported.
import ExternalServices from "./ExternalServices.mjs";

import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

// an instance of the ProductData class is then created.
const dataSource = new ExternalServices("tents");

// Added week 2 step 5 point 4 to test getParams function
const productId = getParams("product");
// Added week 2 step 5 point 4 to test out our findProductById method
//console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();
