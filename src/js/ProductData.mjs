const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res){
    const data = await res.json();
    if (res.ok) {
        return data;
    }else{
        throw{ name: "servicesError",message: data};
    }
}



export default class ProductData {

   constructor(category) {
  // this.category = category;
  //   // this.path = `../json/${this.category}.json`;
  }
 
   async  getData(category){
   const response = await fetch(baseURL + `products/search/${category}`);
   const data = await convertToJson(response);
   return data.Result;
  }

 
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  
   
  }








 

