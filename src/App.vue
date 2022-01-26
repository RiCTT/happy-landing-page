<template>
  <div v-if="route.name !== 'PagePreview'">
    <LayoutHeader />
  </div>
  <router-view />
</template>

<script lang="ts">
import LayoutHeader from "@/components/layout-header/index.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    LayoutHeader,
  },
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>

<style lang="stylus">
body {
  background-color: #f6f6f6 !important;
}
#app {
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
}
</style>
