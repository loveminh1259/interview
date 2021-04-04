<template>
  <div class="container">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-collapse class="justify-content-center" id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="(productType, index) in productTypes"
            v-bind:key="index"
            :to="`/products/categories/${productType.PTYP_ID}`"
            >{{productType.name}}</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import productTypeService from "../../../services/client/product-type";
export default {
  methods: {
    async getProductTypes() {
      const res = await productTypeService.get();
      if (res.data.error === 0) return (this.productTypes = res.data.data);
    },
  },
  data() {
    return {
      productTypes: [],
    };
  },
  mounted() {
    this.getProductTypes();
  },
};
</script>
<style scoped>
@import url("./assets/style.css");
</style>