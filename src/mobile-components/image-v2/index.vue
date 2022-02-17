<template>
  <van-image class="van-image-v2" v-bind="$attrs" @click="onClick" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "van-image-v2",
  props: {
    href: {
      type: String,
      default: "",
    },
    target: {
      type: String,
      default: "_blank",
    },
  },
  setup(props) {
    const onClick = () => {
      if (props.href) {
        window.open(props.href, props.target);
      }
      console.log("image click");
    };
    return {
      onClick,
    };
  },
});
</script>

<style lang="stylus" scoped>
.van-image-v2 {
  display: block;
}
</style>
