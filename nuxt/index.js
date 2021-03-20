const { resolve } = require('path');

module.exports = function nuxtVueIframesModule(moduleOptions) {
    const options = Object.assign({}, this.options.vueIframes, moduleOptions);
    // Register plugin
    this.addPlugin({
        src: resolve(__dirname, 'plugin.template.js'),
        fileName: 'vue-iframes.js',
        options
    })
};


// required by nuxt
module.exports.meta = require('../package.json');
