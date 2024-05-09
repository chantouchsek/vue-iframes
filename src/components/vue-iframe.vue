<template>
  <div class="vue-iframe" />
</template>
<script>
  import { v4 } from 'uuid';
  import debounce from 'lodash.debounce';

  export default {
    name: 'VueIframe',
    props: {
      src: {
        type: String,
        required: true
      },
      crossorigin: {
        type: String,
        default: 'anonymous'
      },
      target: {
        type: String,
        default: '_parent'
      },
      className: {
        type: String,
        required: false
      },
      allow: {
        type: String,
        default: 'camera *; geolocation *; microphone *; autoplay *'
      },
      name: {
        type: String,
        default: 'vue-iframes'
      },
      frameId: {
        type: String,
        default: 'vue-iframes'
      },
      scrolling: String,
      width: [String, Number],
      height: [String, Number]
    },
    data () {
      return {
        iframeEl: {},
        iframeLoadedMessage: `IFRAME_LOADED_${v4()}`,
        iframeOnReadyStateChangeMessage: `IFRAME_ON_READ_STATE_CHANGE_${v4()}`
      };
    },
    methods: {
      removeIframe () {
        while (this.$el.firstChild) {
          this.$el.removeChild(this.$el.firstChild);
        }
      },
      setIframeUrl () {
        if(!this.iframeEl.contentWindow) {
          this.initIframe()
        }
        this.$nextTick(() => {
          const iframeDoc = this.iframeEl.contentWindow.document;
          iframeDoc.open()
              .write(`
              <body onload="window.location.href='${this.src}'; parent.postMessage('${this.iframeLoadedMessage}', '*')"></body>
              <script>
                window.document.onreadystatechange = function () {
                  if (window.document.readyState === 'complete') {
                    parent.postMessage('${this.iframeOnReadyStateChangeMessage}', '*')
                  }
                };
              <\/script>
              `);
          iframeDoc.close(); //iframe onload event happens
        })
      },
      reinitIframe: debounce(function () {
        this.removeIframe();
        this.initIframe();
      }, 200),
      initIframe () {
        this.iframeEl = document.createElement('iframe');
        this.iframeEl.setAttribute('style', 'visibility: hidden; position: absolute; top: -99999px; border: none;');
        this.iframeEl.setAttribute('id', this.frameId)
        this.iframeEl.setAttribute('frameborder', 0)
        this.iframeEl.setAttribute('id', this.frameId)
        if (this.src) this.iframeEl.setAttribute('iframe-src', this.src);
        if (this.className) this.iframeEl.setAttribute('class', this.className);
        if (this.crossorigin) this.iframeEl.setAttribute('crossorigin', this.crossorigin);
        if (this.target) this.iframeEl.setAttribute('target', this.target);
        if (this.allow) this.iframeEl.setAttribute('allow', this.allow);
        if (this.name) this.iframeEl.setAttribute('name', this.name);
        if (this.scrolling) this.iframeEl.setAttribute('scrolling', this.scrolling);
        if (this.width) this.iframeEl.setAttribute('width', this.width);
        if (this.height) this.iframeEl.setAttribute('height', this.height);
        this.$el.appendChild(this.iframeEl);
        this.setIframeUrl();
      },
      listenForEvents () {
        // Create IE + others compatible event handler
        const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
        const events = window[eventMethod];
        const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
        // Listen to message from child window
        events(messageEvent, event => {
          if (event.data === this.iframeLoadedMessage) {
            this.$emit('iframe-load', event.data);
            this.iframeEl.setAttribute('style', 'visibility: visible; border: none;');
          }
          if (event.data === this.iframeOnReadyStateChangeMessage) {
            this.$emit('load', this.iframeEl);
          }
        }, false);
      }
    },
    created () {
      this.listenForEvents();
      this.initIframe();
    },
    watch: {
      src: {
        immediate: true,
        handler() {
          this.reinitIframe();
        }
      }
    },
  };
</script>

<style lang="less">
    .vue-iframe {
        height: 100%;
        width: 100%;

        iframe {
            height: 100%;
            width: 100%;
        }
    }
</style>
