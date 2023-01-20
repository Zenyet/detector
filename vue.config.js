module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/ua/' : ''
};