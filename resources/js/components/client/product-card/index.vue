<template>
  <div class="container page-wrapper">
    <div class="page-inner">
      <div class="row">
        <div class="el-wrapper">
          <div class="box-up" @click="showDetails()" style="cursor: pointer">
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide
                v-for="(image, index) in productData.images"
                v-bind:key="index"
                :img-src="`http://localhost:8000/data/product/${image.name}`"
              >
              </b-carousel-slide>
            </b-carousel>

            <div class="img-info">
              <div class="info-inner">
                <span class="p-name">{{ productData.description }}</span>
                <span class="p-company">{{ productData.name }}</span>
              </div>
              <!-- <div class="a-size">Available sizes : <span class="size">S , M , L , XL</span></div> -->
            </div>
          </div>

          <div class="box-down">
            <div class="h-bg">
              <div class="h-bg-inner"></div>
            </div>

            <a class="cart" href="#">
              <span class="price">{{ productData.price }} VND</span>
              <span class="add-to-cart">
                <span class="txt">Add in cart</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    showDetails() {
      this.$router.push(`/products/${this.productData.PRO_ID}`);
    },
  },
  props: {
    productData: {
      type: Object,
      default: () => {
        return {
          name: "",
          description: "",
          price: 0,
          image: [],
        };
      },
    },
  },
};
</script>
<style scoped>
@import url("./assets/style.css");
</style>