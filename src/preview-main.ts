import { createApp } from "vue";
import PagePreview from "./page/page-preview/index.vue";
import "@/style/reset.css";
import vant from "vant";
import "vant/lib/index.css";
// ant-design-vue
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import { createPinia } from "pinia";
import registerMobileComponents from "@/mobile-components/index";

const pinia = createPinia();
const app = createApp(PagePreview);
app.use(vant);
app.use(pinia);
app.use(registerMobileComponents).mount("#app");
