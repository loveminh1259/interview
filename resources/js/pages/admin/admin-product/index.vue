<template>
  <div>
    <page-header pageHeader="product"></page-header>
    <div class="page-content">
      <product-form
        ref="childComponent"
        :getProducts="getProducts"
      ></product-form>
      <b-table hover :fields="fields" :items="products">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>

        <!-- A custom formatted column -->
        <template #cell(action)="data">
          <b-dropdown id="dropdown-1" text="Action" class="m-md-2">
            <b-dropdown-item @click="edit(data.item.PRO_ID)"
              >Edit</b-dropdown-item
            >
            <b-dropdown-item @click="remove(data.item.PRO_ID)"
              >Delete</b-dropdown-item
            >
          </b-dropdown>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import PageHeader from "../../../components/admin/PageHeader";
import productService from "../../../services/api/product";
import ProductForm from "../../../components/admin/Product/ProductForm";
export default {
  methods: {
    async getProducts(id = 0) {
      const res = await productService.get(id);
      if (res.status === 200) {
        this.products = res.data.data;
      }
    },
    edit(id) {
      this.$refs.childComponent.showSidebar(id);
    },
    async delete(id) {
      const res = await productService.remove(id);
      console.log(res)
      if (res.data.error === 0) {
        this.$swal({
          icon: "success",
          title: "success",
          text: res.data.message,
        });
        this.getProducts();
      } else {
        this.$swal({
          icon: "error",
          title: "Error",
          text: res.data.message,
        });
      }
    },
    remove(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(id)
        }
      });
    },
  },
  data() {
    return {
      fields: ["index", "name", "description", "action"],
      products: [],
    };
  },
  components: {
    "page-header": PageHeader,
    "product-form": ProductForm,
  },
  mounted() {
    this.getProducts();
  },
};
</script>