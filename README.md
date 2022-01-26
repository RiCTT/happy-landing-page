# happy-landing-page

## 项目介绍

  落地页搭建工具，采用流/层布局对页面模块进行排列；包含了常用的组件，比如表单，图片上传等；对页面进行预览，发布等操作；

## TODO/代办项

 - 参考[轻叶](https://h5.adplusx.com/delivery/tool/landing)来`一步步实现`
 - 0、vscode自定义代码snippet
 - 1、注入全局的一些东西，UI组件库，路由管理等
 - 2、

## 记录/备忘录

  `tsc`写法
  
  ```js
  <script lang="tsx">
  import { defineComponent, reactive, ref } from "vue";

  export default {
    props: ["test"],
    setup() {
      const state = reactive({
        name: 123,
      });
      return () => <div>{state.name}455</div>;
    },
  };
  </script>
  ```

  `template`写法

  ```js
  <template>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
  </template>

  <script lang="ts">
  import { defineComponent } from "vue";
  import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

  export default defineComponent({
    name: "Home",
    components: {
      HelloWorld,
    },
  });
  </script>

  ```


### 参考文档
  - [Configuration Reference](https://cli.vuejs.org/config/).
