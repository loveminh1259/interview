
<template>
  <div>
    <layout v-if="!isHomePage">
      <router-view />
    </layout>
    <content-component v-if="isHomePage">
      <router-view />
    </content-component>
  </div>
</template>

<script>
import ContentComponent from "./components/client/content-component";
import layout from "./components/admin/layout";
export default {
  data() {
    return {
      isHomePage: false,
    };
  },
  mounted() {},
  components: {
    layout,
    "content-component": ContentComponent,
  },
  watch: {
    $route(to, from) {
      this.isHomePage = to.meta.isHomePage;
    },
  },
};
</script>
<style>
</style>