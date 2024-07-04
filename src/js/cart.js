/* eslint-disable no-console */
import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  // PB: Superscript for the cart counter in the header
  updateCartItemCount();
  renderCartContents();
});

function updateCartItemCount() {
  const cartItems = getLocalStorage("so-cart");
  const cartItemCount = cartItems.length;
  const cartItemCountElement = document.getElementById("cartItemCount");
  updateCartTotal();
  if (cartItemCountElement != null) {
    cartItemCountElement.textContent = cartItemCount;
  }
}

function sumFinalPrices() {
  let totalSum = 0;
  let jsonString = localStorage.getItem("so-cart"); //changing to double quote

  if (jsonString) {
    let itemsArray = JSON.parse(jsonString);
    itemsArray.forEach((item) => {
      if (item.FinalPrice) {
        totalSum += item.FinalPrice;
      }
    });

    if (totalSum === 0) {
      hideTotal();
    } else {
      showTotal();
    }
  }

  return totalSum;
}

// Function to update the total in the DOM
function updateCartTotal() {
  // Get the total sum
  let total = sumFinalPrices();

  // Find the span element where the total should be displayed
  let cartTotalElement = document.querySelector(".cartTotal");

  if (cartTotalElement) {
    cartTotalElement.innerText = "$ " + total.toFixed(2); // Format the total to 2 decimal places
  }
}

// showTotal checks if the html class total has a hide class. If it does the hide class is removed and replaced with show to affect it's visibility on the cart index.html webpage.
function showTotal() {
  const totalClass = document.querySelector(".total");
  if (totalClass.classList.contains("hide")) {
    totalClass.classList.remove("hide");
    totalClass.classList.add("show");
  }
}
// hideTotal checks if the html class total has a show class. If it does the show class is removed and replaced with hide to affect it's visibility on the cart index.html webpage.
function hideTotal() {
  const totalClass = document.querySelector(".total");
  if (totalClass.classList.contains("show")) {
    totalClass.classList.remove("show");
    totalClass.classList.add("hide");
  }
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems)) {
    //console.error("Cart items should be an array", cartItems);
    //return;
  }
  const htmlItems = cartItems.map(cartItemTemplate).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;
  addRemoveEventListeners();

  addQuantityEventListeners();
}

function cartItemTemplate(item) {
  return `<li class = "cart-card divider">
  
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class = "cart-card__quantity_container"><span class = "cart-card_reduceItem"> - </span> <span class = "cart-card__quantity"> ${item.quantity}</span> <span class = "cart-card_addItem"> + </span></div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <p class="cart-card__subtotalItem">$${item.subTotalItem}</p>
  <span></span>
  <span></span>

    <div class="remove-from-cart" data-id="${item.Id}">X</div>

  
</li>`;

  // return newItem;
}

function addRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      const confirmDelete = confirm(
        "Are you sure you want to delete this item from the cart?",
      );
      if (confirmDelete) {
        removeFromCart(productId);
      }
    });
  });
}

function removeFromCart(productId) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  updateCartItemCount();
}

function addQuantityEventListeners() {
  const increaseButtons = document.querySelectorAll(".cart-card_addItem");
  const decreaseButtons = document.querySelectorAll(".cart-card_reduceItem");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const cartCardElement = event.target.closest(".cart-card");
      console.log(cartCardElement); // Debugging line
      if (cartCardElement) {
        const productId =
          cartCardElement.querySelector(".remove-from-cart").dataset.id;
        updateItemQuantity(productId, 1);
      }
    });
  });

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const cartCardElement = event.target.closest(".cart-card");
      console.log(cartCardElement); // Debugging line
      if (cartCardElement) {
        const productId =
          cartCardElement.querySelector(".remove-from-cart").dataset.id;
        updateItemQuantity(productId, -1);
      }
    });
  });
}

function updateItemQuantity(productId, change) {
  let cartItems = getLocalStorage("so-cart");
  const itemIndex = cartItems.findIndex((item) => item.Id === productId);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity += change;
    //const itemsubtotal =
    // cartItems[itemIndex].quantity * cartItems[itemIndex].FinalPrice;
    //cartItems[itemIndex].subTotalItem = itemsubtotal;
    if (cartItems[itemIndex].quantity <= 0) {
      cartItems = cartItems.filter((item) => item.Id !== productId);
    }
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
    updateCartItemCount();
  }
}
