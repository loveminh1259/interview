<template>
  <div>
    <page-header pageHeader="Product type"></page-header>
    <product-type-form
      ref="childComponent"
      :getProductTypes="getProductTypes"
    ></product-type-form>
    <b-table :fields="fields" hover :items="productTypes">
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(action)="data">
        <b-dropdown id="dropdown-1" text="Action" class="m-md-2">
          <b-dropdown-item @click="edit(data.item.PTYP_ID)"
            >Edit</b-dropdown-item
          >
          <b-dropdown-item @click="remove(data.item.PTYP_ID)"
            >Delete</b-dropdown-item
          >
        </b-dropdown>
      </template>
    </b-table>
  </div>
</template>
<script>
import PageHeader from "../../../components/admin/PageHeader";
import productTypeService from "../../../services/api/product-type";
import ProductTypeForm from "../../../components/admin/Product/ProductTypeForm";
export default {
  methods: {
    async getProductTypes(id = 0) {
      const res = await productTypeService.get(id);
      if (res.status === 200) {
        this.productTypes = res.data.data;
      }
    },
    edit(id) {
      this.$refs.childComponent.showForm(id);
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
    async delete(id) {
      const res = await productTypeService.remove(id);
      console.log(res)
      if (res.data.error === 0) {
        this.$swal({
          icon: "success",
          title: "success",
          text: res.data.message,
        });
        this.getProductTypes()
      } else {
        this.$swal({
          icon: "error",
          title: "Error",
          text: res.data.message,
        });
      }
    },

  },

  data() {
    return {
      fields: ["index", "name", "action"],
      productTypes: [],
    };
  },
  components: {
    "page-header": PageHeader,
    "product-type-form": ProductTypeForm,
  },
  mounted() {
    this.getProductTypes();
  },
};
</script>