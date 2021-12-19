import Vue from 'vue';
import VueIframes from 'vue-iframes';

const iframeOptions = <%= serialize(options) %> || {}
Vue.use(VueIframes, iframeOptions);
