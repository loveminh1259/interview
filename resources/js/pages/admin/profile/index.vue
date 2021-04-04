<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
      <div class="row">
        <div class="col-md-6">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.name"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
            id="input-group-3"
            label="Your password:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="password"
              v-model="form.password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import userService from "../../../services/api/users";
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },
      show: true,
    };
  },
  methods: {
    async onSubmit() {
      const result = await this.$swal({
        title: "Enter your password to verify",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Look up",
        showLoaderOnConfirm: true,
        preConfirm: async (password) => {
          try {
            this.form.password_confirmation = password;
            const res = await userService.updateCurrentUser(this.form);
            return res.data;
          } catch (error) {
            console.log(error);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
      if (result.isConfirmed) {
          console.log(result)
        if (result.value.error === 0) {
          this.$swal({
            icon: "success",
            title: "Success",
            text: result.value.message,
          });
        } else {
          this.$swal({
            icon: "error",
            title: "Error",
            text: result.value.message,
          });
        }
      }
    },
    onReset() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    async getCurrentUser() {
      try {
        const res = await userService.getCurrentUser();
        if (res.data.error === 0) {
          this.form = res.data.data;
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>