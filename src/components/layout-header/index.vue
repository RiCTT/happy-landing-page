<script lang="tsx">
import { reactive } from "vue";

export default {
  props: ["test"],
  setup() {
    return () => (
      <div class="layout-header-wrapper">
        <div class="layout-icon">icon</div>
        <div class="layout-title">H5制作</div>
        <div class="layout-user">
          <span>user icon</span>
          <span>user info</span>
        </div>
      </div>
    );
  },
};
</script>

<style lang="stylus" scoped>
.layout-header-wrapper {
  display: flex;
  background-color: #fff;
  line-height: 60px;
  padding: 0 20px 0 30px;
}

.layout-title {
  flex: 1;
  text-align: left;
  padding-left: 30px;
}
</style>
