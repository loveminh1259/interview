<template>
  <div>
    <template>
      <div>
        <b-button class="m-1 float-right" @click.prevent="showForm(0)"
          >Add +</b-button
        >
        <b-sidebar
          id="sidebar-right"
          title="Sidebar"
          right
          shadow
          v-model="visible"
        >
          <div class="px-3 py-2">
            <b-form
              @submit.prevent="onSubmit"
              @reset.prevent="onReset"
              v-if="show"
            >
              <b-form-group
                id="input-group-1"
                label="Name:"
                label-for="input-1"
                description="Name of user"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Email:"
                label-for="input-2"
                description="Email of user"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.email"
                  type="email"
                  autocomplete="off"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="Password:"
                label-for="input-3"
                description="Password of user"
              >
                <b-form-input
                  id="input-3"
                  autocomplete="off"
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-4"
                label="Permissions:"
                label-for="input-4"
              >
                <v-select
                  multiple
                  v-model="form.permissions"
                  :options="options"
                  label="text"
                  :reduce="(permission) => permission.value"
                />
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
import userService from "../../../../services/api/users";
import permissionService from "../../../../services/api/permission";
import permission from "../../../../services/api/permission";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        USE_ID: 0,
        permissions: [],
      },
      options: [],
      visible: false,
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      console.log(this.form.permissions);
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
    async getAllPermission() {
      const res = await permissionService.get();
      if (res.data.error === 0) {
        const data = res.data.data;
        data.forEach((element) => {
          this.options.push({ value: element.PER_ID, text: element.title });
        });
      }
    },
    async save(id = 0) {
      const res = await userService.save(this.form.USE_ID, this.form);
      const icon = res.data.error === 0 ? "success" : "error";
      if (res.data.error === 0) {
        this.getUsers();
        this.onReset();
      }
      this.$swal({
        icon: icon,
        title: icon,
        text: res.data.message,
      });
      // }
    },
    async loadUser(id) {
      const permissions = this.form.permissions;
      const res = await userService.get(id);
      if (res.data.error === 0) {
        this.form = res.data.data;
      }
    },
    onReset(event) {
      // event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.$nextTick(() => {
        this.show = true;
      });
    },
    showForm(id = 0) {
      this.visible = true;
      this.USE_ID = id;
      if (id > 0) {
        this.loadUser(id);
      }
    },
  },
  props: {
    getUsers: {
      type: Function,
      default: () => {
        return null;
      },
    },
  },
  mounted() {
    this.getAllPermission();
  },
};
</script>