// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context("./", true, /\.vue$/);
// 匹配到的文件名数组
export default {
  install(app) {
    importFn.keys().forEach((item) => {
      // 导入函数根据文件名，导入文件内容
      const component = importFn(item).default;
      // console.log(component)
      // 根据导入的组件文件，实现自动全局注册
      app.component(component.name, component);
    });
  },
};
