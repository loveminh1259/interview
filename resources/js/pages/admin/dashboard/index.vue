<template>
  <div>
    <page-header pageHeader="Dashboard"></page-header>
    <div class="page-content">
      Welcome to page-content
    </div>
  </div>
</template>
<script>
import PageHeader from "../../../components/admin/PageHeader";
export default {
  components: {
    "page-header": PageHeader,
  },
};
</script>
<style scoped>
@import url("./assets/style.css");
</style>