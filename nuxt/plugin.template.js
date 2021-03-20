import Vue from 'vue';
import VueIframes from 'vue-iframes';

export default () => {
    const iframeOptions = <%= serialize(options) %> || {}
    Vue.use(VueIframes, iframeOptions);
}
