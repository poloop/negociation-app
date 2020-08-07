module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  env: {
    test: {
      plugins: [
        [
          'babel-plugin-istanbul',
          {
            useInlineSourceMaps: false,
            extension: ['.js', '.vue']
          }
        ]
      ]
    }
  }
};
