import VueIframe from './components/Iframe/index.vue';

// expose component and service to global scope
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({
    install(NewVue) {
      NewVue.component('vue-iframe', VueIframe);
    }
  });
}

export default {
  install: function(NewVue) {
    NewVue.component('vue-iframe', VueIframe);
  },
  VueIframe
};
