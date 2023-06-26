const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    port: 3000, // Change the port number to your desired port
  },
  transpileDependencies: true
});