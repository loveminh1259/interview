 <template>
  <div class="sidebar">
    <div class="logo text-center p-3">SHOP ADMIN</div>
    <div class="navigation-bar">
      <ul>
        <li>
          <router-link :to="{name: 'dashboard'}"><i class="fas fa-home"/> Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{name: 'products'}"><i class="fas fa-cube"></i> Products</router-link>
        </li>
        <li>
          <router-link :to="{name: 'product-type'}"><i class="fas fa-cube"></i> Product Type</router-link>
        </li>
         <li>
          <router-link :to="{name: 'users'}"><i class="fas fa-cube"></i> Users</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {};
  },
};
</script>
<style>
@import url('./assets/style.css');
</style>