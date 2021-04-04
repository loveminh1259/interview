<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item @click="showProfile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import authService from '../../../services/api/auth'
export default {
  methods: {
    async logout() {
      const res = await authService.logout()
      if (res.status === 200) {
        this.$store.commit('removeAuthentication')
        this.$router.push({name: 'login'})
      }
    },
    showProfile() {
      this.$router.push({name: 'profile'})
    }
  }
};
</script>