<template>
  <div>
    <div class="card">
      <div class="card__title">
        <div class="icon">
          <a href="#"><i class="fa fa-arrow-left"></i></a>
        </div>
        <h3>New products</h3>
      </div>
      <div class="card__body">
        <div class="half">
          <div class="featured_text">
            <h1>{{ product.name }}</h1>
            <p class="sub">{{ product.type }}</p>
            <p class="price">{{ product.price }} VND</p>
          </div>
          <div class="image">
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
            
              <b-carousel-slide v-for="(image, index) in product.images" v-bind:key="index"
                :img-src="`http://localhost:8000/data/product/${image.name}`"
              >
              </b-carousel-slide>
            </b-carousel>
          </div>
        </div>
        <div class="half">
          <div class="description">
            <p>{{ product.description }}</p>
          </div>
          <span class="stock"><i class="fa fa-pen"></i> In stock</span>
          <div class="reviews">
            <ul class="stars">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star-o"></i></li>
            </ul>
            <span>(64 reviews)</span>
          </div>
        </div>
      </div>
      <div class="card__footer">
        <div class="recommend">
          <p>Recommended by</p>
          <h3>Andrew Palmer</h3>
        </div>
        <div class="action">
          <button type="button">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productService from "../../../services/client/product";
export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    async getProduct(id) {
      const res = await productService.get(id);
      if (res.data.error === 0) {
        this.product = res.data.data;
      }
    },
  },
  mounted() {
    const PRO_ID = this.$route.params.id;
    this.getProduct(PRO_ID);
  },
};
</script>
<style scoped>
@import url("./assets/style.css");
</style>