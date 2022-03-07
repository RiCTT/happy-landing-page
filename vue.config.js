module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:9999",
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  pages: {
    index: "src/main.ts",
    preview: "src/preview-main.ts",
  },
};
