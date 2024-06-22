// ProductList.mjs
import { renderListWithTemplate,getLocalStorage } from "./utils.mjs";

const cartItemCountElement = document.getElementById("cartItemCount");




function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      </a>
    </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }

    async init() {
        const products = await this.dataSource.getData();
        const filteredProducts = this.filterProducts(products, ["880RR", "985RF", "344YJ", "985PR"]);
        this.renderProductList(filteredProducts);
         this.updateCartItemCount()
        
        
    }

    filterProducts(products, ids) {
        return products.filter(product => ids.includes(product.Id));
      }
    
    renderProductList(products) {
      renderListWithTemplate(productCardTemplate, this.listElement, products);
    }
    // Stretch Activity Step 2
    
    //showFourTents(list) { 
     //   return list.filter(function(product){ return product.Id != "989CG" && product.Id != "880RT"});
    //} 


   updateCartItemCount() {
       const cartItems = getLocalStorage("so-cart");
      const cartItemCount = cartItems.length;
      if (cartItemCountElement != null) {
       cartItemCountElement.textContent = cartItemCount;
      }
     } 

  }

