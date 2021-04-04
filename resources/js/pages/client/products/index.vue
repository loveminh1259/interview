<template>
  <div>
      <h1 class="p-3 text-center">Products</h1>
    <div class="row justify-content-center">
      <div
        class="col-3"
        v-for="(product, index) in products"
        v-bind:key="index"
      >
        <product-card :productData="product"></product-card>
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "../../../components/client/product-card";
import productService from "../../../services/client/product";
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async getProducts() {
      const res = await productService.get();
      if (res.data.error === 0) {
        this.products = res.data.data;
      }
    },
    async getByProductType(ptyp_id) {
      const res = await productService.getByProductType(ptyp_id)
      if(res.data.error === 0) this.products = res.data.data
    }
  },
  components: {
    "product-card": ProductCard,
  },
  mounted() {
    const ptyp_id = this.$route.params.ptyp_id
    if(ptyp_id !== undefined) {
      this.getByProductType(ptyp_id)
    } else {
      this.getProducts();
    }
  },
};
</script>