// import { getLocalStorage } from "./utils.mjs";

// export default class CheckoutProcess{
//     constructor(key,outputSelector){
//         this.key = key;
//         this.outputSelector = outputSelector
//         this.list = []
//         this.itemTotal = 0
//         this.shipping = 0
//         this.tax = 0
//         this.orderTotal = 0
//     }

//     init(){
//         this.list = this.getLocalStorage(this.key) || [];
//         this.calculateItemSummary()
//         this.displayOrderTotals()
//     }

//     getLocalStorage(key) {
//         return JSON.parse(localStorage.getItem(key));
//       }

//   calculateItemSummary(){
//     this.itemTotal = this.list.reduce((sum, item) => sum + item.price * item.quatity, 0);
//     this.displayItemTotal
//   }    

//   calculateOrderTotal(){
//     const itemCount = this.list.reduce((count, item) => count + item.quatity,0);
//     this.shipping = 10 + (itemCount - 1) * 2;
//     this.tax = this.itemTotal * 0.06;
//     this.orderTotal = this.itemTotal + this.shipping + this.tax;
//     this.displayOrderTotals()
//   }
       

//  displayItemTotal(){
//     document.querySelector(this.outputSelector).textContent = `$${this.itemTotal.toFixed(2)}`;
//  } 
//  displayOrderTotals(){
//     document.getElementById("subtotal").textContent = `$${this.itemTotal.toFixed(2)}`;
//     document.getElementById("shipping").textContent = `$${this.shipping.toFixed(2)}`;
//     document.getElementById("tax").textContent = `$${this.tax.toFixed(2)}`;
//     document.getElementById("orderTotal").textContent = `$${this.orderTotal.toFixed(2)}`;
//  }
// 

import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.length;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal;
  }
  calculateOrdertotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  }
  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);

    try {
      const res = await services.checkout(json);
      console.log(res);

      // Clear the cart contents in localStorage
      localStorage.removeItem(this.key);

      // Navigate to the success page
      window.location.href = "success.html";
    } catch (err) {
      console.error("Checkout failed:", err);
      // Use alertMessage to show error message
      alertMessage("Error during checkout: " + JSON.stringify(err.message));
    }
  }
}