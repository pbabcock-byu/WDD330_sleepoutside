
import { renderListWithTemplate } from "./utils.mjs";

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
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    
      const products = await this.dataSource.getData();
      const filteredProducts = this.filterProducts(products, ["880RR", "985RF", "344YJ", "985PR"]);
      this.renderProductList(filteredProducts);
    
  }
  filterProducts(products, ids) {
    return products.filter(product => ids.includes(product.Id));
  }

  renderProductList(products) {
    renderListWithTemplate(productCardTemplate, this.listElement, products);
  }

//   renderProductList(products) {
    
//     const htmlStrings = products.map(productCardTemplate);
//     this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
//   }
}
