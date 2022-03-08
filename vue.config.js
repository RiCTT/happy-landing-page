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
    // index: "src/main.ts",
    // preview: "src/preview-main.ts",
    index: {
      entry: "src/main.ts",
      template: "public/index.html",
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "chunk-ui-vendors", "index"],
    },
    preview: {
      entry: "src/preview-main.ts",
      template: "public/preview.html",
      chunks: ["chunk-vendors", "chunk-common", "preview"],
    },
  },

  configureWebpack: (config) => {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          common: {
            name: "chunk-common",
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true,
          },
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          uiVendors: {
            name: "chunk-ui-vendors",
            test: /[\\/]node_modules[\\/](ant-design-vue)/,
            chunks: "all",
            priority: 11,
            enforce: true,
          },
        },
      },
    };
  },
};
