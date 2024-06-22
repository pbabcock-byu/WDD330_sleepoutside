// ProductList.mjs
function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=">
        <img src="" alt="Image of ">
        <h3 class="card__brand"></h3>
        <h2 class="card__name"></h2>
        <p class="product-card__price">$</p>
      </a>
    </li>`
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
      // our dataSource will return a Promise...so we can use await to resolve it.
      const list = await this.dataSource.getData();
      // render the list - to be completed
      this.renderList(list);
    }
    renderList(list){
        //filter out bad products before sending to render
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
    // Stretch Activity Step 2
    showFourTents(list) { 
        return list.filter(function(product){ return product.Id != "989CG" && product.Id != "880RT"});
    } 

  }