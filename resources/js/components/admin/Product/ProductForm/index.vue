<template>
  <div>
    <template>
      <div>
        <b-button class="m-1 float-right" @click.prevent="showSidebar()"
          >Add +</b-button
        >
        <b-sidebar id="sidebar-right" v-model="visible" title="Sidebar" right shadow>
          <div class="px-3 py-2">
            <b-form
              @submit.prevent="onSubmit"
              @reset.prevent="onReset"
              v-if="show"
            >
              <b-form-group
                id="input-group-2"
                label="Product name:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.name"
                  placeholder="Enter name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Price:"
                label-for="input-1"
                description="This is the price of the product"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.price"
                  type="number"
                  placeholder="Enter price"
                  autocomplete="off"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="Description"
                label-for="input-3"
              >
                <b-form-textarea
                  id="input-3"
                  v-model="form.description"
                  required
                ></b-form-textarea>
                <b-form-group
                  id="input-group-5"
                  label="Image"
                  label-for="input-5"
                >
                  <b-form-file
                    multiple
                    v-model="form.images"
                    :file-name-formatter="formatNames"
                  ></b-form-file>
                  <b-carousel
                    v-if="form.PRO_ID > 0"
                    id="carousel-1"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1024"
                    img-height="480"
                    style="text-shadow: 1px 1px 2px #333"
                  >
                    <b-carousel-slide
                      v-bind:key="index"
                      v-for="(image, index) in form.images"
                      :img-src="`http://localhost:8000/data/product/${image}`"
                      
                    >
                    </b-carousel-slide>
                    ></b-carousel
                  >
                </b-form-group>
              </b-form-group>
              <b-form-group
                id="input-group-4"
                label="Product type"
                label-for="input-4"
              >
                <b-form-select
                  v-model="form.PTYP_ID"
                  :options="options"
                ></b-form-select>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </div>
        </b-sidebar>
      </div>
    </template>
  </div>
</template>
   
  </div>
</template>

<script>
import productTypeService from "../../../../services/api/product-type";
import productService from "../../../../services/api/product";
export default {
  data() {
    return {
      visible:false,
      form: {
        PRO_ID: 0,
        name: "",
        price: "",
        description: "",
        PTYP_ID: null,
        images: [],
      },
      previews: [],
      options: [],
      show: true,
    };
  },
  props: {
    getProducts: {
      type: Function,
      default: () => {
        return null;
      },
    },
  },
  methods: {
    async loadProduct(id) {
      const res = await productService.get(id)
      if(res.data.error === 0) {
        this.form = res.data.data
      }
    },
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    async getProductTypes() {
      const res = await productTypeService.get();
      if (res.data.error === 0) {
        const data = res.data.data;
        data.forEach((element) => {
          this.options.push({ value: element.PTYP_ID, text: element.name });
        });
      }
    },
    async save(id = 0) {
      const res = await productService.save(id, this.form);
      if (res.data.error === 0) {
        this.$swal({
          icon: "success",
          title: "Success",
          text: res.data.message,
        });
        this.onReset();
        this.getProducts();
      } else {
        this.$swal({
          icon: "error",
          title: "Error",
          text: res.data.message,
        });
      }
    },
    onSubmit() {
      this.save(this.form.PRO_ID);
    },
    onReset() {
      // Reset our form values
      this.form.price = null;
      this.form.name = "";
      this.form.description = "";
      this.form.DTYP_ID = null;
      this.form.PRO_ID = 0
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    showSidebar(id = 0) {
      console.log(id)
      this.visible = true
      this.form.PRO_ID = id
      this.loadProduct(id)
    }
  },
  mounted() {
    this.getProductTypes();
  },
};
</script>