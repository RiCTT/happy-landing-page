<script lang="tsx">
import { RedditOutlined, UserOutlined } from "@ant-design/icons-vue";

export default {
  props: ["test"],
  components: {
    RedditOutlined,
    UserOutlined,
  },
  setup() {
    return () => (
      <div class="layout-header-wrapper">
        <div class="layout-icon">
          <reddit-outlined />
        </div>
        <div class="layout-title">H5制作</div>
        <div class="layout-user">
          <span>
            <user-outlined style={{ fontSize: "20px" }} />
          </span>
          <span class="layout-user-info">test(173040121319)</span>
        </div>
      </div>
    );
  },
};
</script>

<style lang="stylus" scoped>

.layout-icon {
  font-size: 30px;
  color: skyblue;
}
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

.layout-user-info {
  margin: 0 10px;
}
</style>
