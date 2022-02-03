# happy-landing-page

## 项目介绍

  落地页搭建工具，采用流/层布局对页面模块进行排列；包含了常用的组件，比如表单，图片上传等；对页面进行预览，发布等操作；

## TODO/代办项

 - 参考[轻叶](https://h5.adplusx.com/delivery/tool/landing)来`一步步实现`
 - 0、✅vscode自定义代码snippet
 - 1、✅注入全局的一些东西，UI组件库，路由管理等
 - 2、拖拽模块的功能，
    - 2.1✅点击使用该组件；
    - 2.2✅点击预览区域可进行设置显示的位置
    - 2.3选中组件时的交互
      - ✅高亮处理
      - ✅解决因为transform导致删除的体验问题
      - ✅上下/层级按钮
      - ✅删除按钮
      - 可四角伸缩盒子，设置宽高
      - 增加开关模式，进行切换块布局，层布局
 - 3、组件选中区和预览的交互
    - 设计组件的prop结构、表单的交互结构
    - 组件列表展示
    - 添加到预览区域
    - 保存导出json文件
    - 提供静态预览

## 记录/备忘录

  `关于move事件不流畅的几个原因`

    move事件会穿透，当同级元素Amove到B元素上时，此时逻辑移动的元素变成了A，解决方案是当mousedown的时候，记录下生效的元素，此后处理函数的对象都是该元素；

    move事件性能，采用事件委托，绑定在同一个父级上，判断下target，提升性能，提高用户体验；

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
