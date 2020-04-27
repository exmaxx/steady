module.exports = {
  lintOnSave: false,

  // This places sources in `webpack-debug-ready` folder. Otherwise there are many files with similar names.
  // See https://github.com/vuejs/vue-cli/issues/2978 for details.
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'eval-source-map'

      config.output.devtoolFallbackModuleFilenameTemplate =
        'webpack:///[resource-path]?[hash]'

      config.output.devtoolModuleFilenameTemplate = (info) => {
        // In my case this condition filtered my original files
        return info.moduleId === ''
          ? `webpack-debug-ready:///${info.resourcePath}`
          : `webpack-generated:///${info.resourcePath}?${info.hash}`
      }
    }
  },
}
