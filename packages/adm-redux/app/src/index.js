console.log('kula')
console.log('ho ho', API_KEY);

if (module.hot) {
  // module.hot.accept('./App', () => {
  //   /* For Webpack 2.x
  //      Need to disable babel ES2015 modules transformation in .babelrc
  //      presets: [
  //        ["es2015", { "modules": false }]
  //      ]
  //   */
  //   render();
  // });
  module.hot.accept();
}
