<template>
  <div>
    <template>
      <div>
        <b-button class="m-1 float-right" @click="showForm()"
          >Add +</b-button
        >
        <b-sidebar id="sidebar-right" title="Sidebar" right shadow v-model="visible">
          <div class="px-3 py-2">
            <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
              <b-form-group
                id="input-group-1"
                label="Name:"
                label-for="input-1"
                description="Name for product type"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter name"
                  required
                ></b-form-input>
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
export default {
  data() {
    return {
      form: {
        name: "",
        PTYP_ID: 0
      },
      visible: false,
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
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
          this.save();
        }
      });
    },
    async save(id = 0) {
      const res = await productTypeService.save(this.form.PTYP_ID, this.form);
      const icon = res.data.error === 0 ? "success" : "error";
      if (res.data.error === 0) {
          this.getProductTypes();
          this.onReset();
      }
      this.$swal({
        icon: icon,
        title: icon,
        text: res.data.message,
      });
      // }
    },
    async loadProductType(id) {
      const res = await productTypeService.get(id)
      if(res.data.error === 0) {
        this.form = res.data.data
      }
    },
    onReset(event) {
      // event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.$nextTick(() => {
        this.show = true;
      });
    },
    showForm(id = 0) {
      console.log(this.$refs)
      this.visible = true
      this.PTYP_ID = id
      if(id > 0) {
        this.loadProductType(id)
      }
    }
  },
  props: {
    getProductTypes: {
      type: Function,
      default: () => {
        return null
      }
    }
  }
};
</script>