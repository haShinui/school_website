// frontend/vue.config.js
module.exports = {
  devServer: {
      port: 8082,  // Specify the port you want to use for the Vue.js development server
      proxy: {
          '/api': {
              target: 'http://127.0.0.1:8000',
              changeOrigin: true,
              secure: false,
          },
      },
  },
};
