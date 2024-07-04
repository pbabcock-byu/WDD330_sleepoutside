import { resolve } from "path";
// eslint-disable-next-line import/namespace
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve(__dirname, "src/product-listing/index.html"),
        checkoutsuccess: resolve(__dirname, "src/checkout/success.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
      },
    },
  },
});
