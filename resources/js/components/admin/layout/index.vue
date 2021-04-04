<template>
  <div>
    <div v-if="layout === 'not-full'">
      <side-bar></side-bar>
      <content-component>
        <nav-bar></nav-bar>
        <slot />
      </content-component>
    </div>
    <div v-else><slot /></div>
  </div>
</template>
<script>
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Content from "../Content";
export default {
  components: {
    "nav-bar": Navbar,
    "side-bar": Sidebar,
    'content-component': Content,
  },
  data() {
    return {
      layout: '',
    }
  },
  mounted() {
  },
  watch: {
    $route(to, from) {
        this.layout = to.meta.layout
    }
  }
};
</script>