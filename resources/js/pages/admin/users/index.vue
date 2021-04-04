<template>
  <div>
    <page-header pageHeader="Users"></page-header>
    <user-form
      ref="childComponent"
      :getUsers="getUsers"
    ></user-form>
    <b-table :fields="fields" hover :items="users">
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(action)="data">
        <b-dropdown id="dropdown-1" text="Action" class="m-md-2">
          <b-dropdown-item @click="edit(data.item.USE_ID)"
            >Edit</b-dropdown-item
          >
          <b-dropdown-item @click="remove(data.item.USE_ID)"
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
import UserForm from "../../../components/admin/Users/UserForm";
import userService from '../../../services/api/users'
export default {
  methods: {
    async getUsers(id = 0) {
      const res = await userService.get(id);
      if (res.status === 200) {
        this.users = res.data.data;
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
      const res = await userService.remove(id);
      if (res.data.error === 0) {
        this.$swal({
          icon: "success",
          title: "success",
          text: res.data.message,
        });
        this.getUsers()
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
      fields: ["index", "name", "email", "action"],
      users: [],
    };
  },
  components: {
    "page-header": PageHeader,
    "user-form": UserForm,
  },
  mounted() {
    this.getUsers();
  },
};
</script>