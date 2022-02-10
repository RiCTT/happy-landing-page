# happy-landing-page

## 项目介绍

  落地页搭建工具，采用流/层布局对页面模块进行排列；包含了常用的组件，比如表单，图片上传等；对页面进行预览，发布等操作；

## 里程碑

### 版本v0.1

  - 基本功能
    - 配置页面的生成，预览
    - 基本的交互，点击，跳转等
  - 遗留/反馈/代办项
    - `feature: `设置组件坐标时，需支持鼠标上下左右，提供像素级别的操作能力
    - `feature: `可根据四角拖拽设置组件大小
    - `bug: `编辑时，第一次渲染点击可能导致组件坐标错位
    - `bug: `基于Vant UI组件，进行二次封装，方便功能扩展，开发（减少更改数据库数据的次数）

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
    - ✅组件列表展示
    - ✅添加到预览区域
    - ✅提供静态预览
    - ✅处理预览组件的编辑，展示模式
    - 样式style和数据data的处理
    - 保存导出json文件
- 4、表单组件的设计（包含增删表单项
    - 表单组件设计，表单引擎？
    - 表单接口处理？

## 记录/备忘录
  
  - 关于功能实现都写在了一块

    随着功能的开发，开发成本，难度也在逐渐增加，用户体验可能会变的不友好；在做表单控件处理的时候，有个功能是常见的下拉选择框，按理来说选项的增加也是直接坐在逻辑里面比较好，但是否有更好的方式，比如说我下拉只需要选一个选项组id，即绑定上了对应的选项组，`将选项的功能拆分到另一个增删改查的模块当中去，通过id去关联，是否更优雅呢？当然，带来的问题是：需要用户提前在选项组模块中新建好选项，然后记住id，使用`；

  - 关于代码混合，数据不清楚，交互复杂

    一开始为了效果明显，加快开发效率等原因，把数据都写在了各自组件当中，导致每当需要交互，比如向外/内控制，传递数据都时候，会显得操作麻烦，数据流复杂，不清晰等问题；

    解决：新建store来维护一些公共的数据，比如当前点击的组件index，模板组件list等等

  - 关于move事件不流畅的几个原因

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

    vue-cli配置管理

  - [动态表单引擎介绍](https://www.tangshuang.net/8149.html)

    `原子化组件虽然有通用性，任意业务场景都可以去配置，但是，配置的工作量实在太大了，没有什么意义。我推荐的，是一种业务组件的配置，根据自己的业务场景，把所有业务组件提炼出来，在每一个表单的可视化编辑界面，运营者们只需要做少量的工作去修改对应业务的参数。`

    一些思考：原子化组件的通用性，再加上一些定制化参数，其实就等于模板；当模板越来越多的时候，形成模板库，用户生产模板，用户使用模板，形成产品的闭环，生态也会趋于稳定发展的趋势？另，结合业务来看，开发一套动态表单并不难，无非是一串JSON，渲染这串JSON映射的组件，但业务场景来看，可并不单纯是填写表单，提交表单，通常还需要一些数据/表单之间的联动，比如某个标签下的用户只能领取特定优惠券；又或者是当A成立时，B表单控件才出现等等

  - [阿里巴巴Formily](https://github.com/alibaba/formily/blob/formily_next/README.md)
  - [H5-dooring](https://h5.dooring.cn/h5_plus)