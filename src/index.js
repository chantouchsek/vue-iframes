import VueIframe from './components/vue-iframe.vue';

// expose component and service to global scope
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({
    install(Vue) {
      Vue.component('vue-iframe', VueIframe);
    }
  });
}

export default {
  install(Vue) {
    Vue.component('vue-iframe', VueIframe);
  },
  VueIframe
};
