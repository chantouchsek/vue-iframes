# vue-iframes
> Vue js component for creating dynamic async iframes based on Aaron Peter's article: http://www.aaronpeters.nl/blog/iframe-loading-techniques-performance?%3E#dynamic

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-iframes.svg?style=flat-square)](https://npmjs.com/package/vue-iframes)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue-iframes.svg?style=flat-square)](https://npmjs.com/package/vue-iframes)
[![npm](https://img.shields.io/npm/dm/vue-iframes.svg?style=flat-square)](https://npmjs.com/package/vue-iframes)

## Requirements
* [Vue.js](http://vuejs.org/) (^v2.1.4)

## Installation

## Vue Support

Supports on Vue >= 2

## Installation and Usage

```javascript
npm install vue-iframes --save-dev
```

```javascript
import Vue from 'vue'
import VueIframe from 'vue-iframes'

Vue.use(VueIframe)
```

## Nuxt Support
---
- Create `~/plugins/vue-iframes.js`

```js
import Vue from 'vue'
import VueIframe from 'vue-iframes'

Vue.use(VueIframe)
```

## Components
```js
<template>
  <vue-iframe
    :src="src"
    allow="camera *; geolocation *; microphone *; autoplay *"
    frame-id="my-ifram"
    @load="onLoad"
    name="my-frame"
    width="150px"
    height="200px"
  />
</template>

<script>
export default {
  name: 'MyIframe',
  data: () => ({
    myIframe: null
  }),
  methods: {
    onLoad(frame) {
      this.myIframe = frame.contentWindow
    }
  }
}
</script>
```

### Contributing

Pull requests are welcome, or open up an issue if you have ideas for additional functionality, new features or bugs.
