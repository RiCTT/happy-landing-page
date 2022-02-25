import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/style/reset.css";
import vant from "vant";
import "vant/lib/index.css";
// ant-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createPinia } from "pinia";
import registerMobileComponents from "@/mobile-components/index";

const pinia = createPinia();
const app = createApp(App);
app.use(router).mount("#app");
app.use(vant);
app.use(Antd);
app.use(pinia);
app.use(registerMobileComponents);
