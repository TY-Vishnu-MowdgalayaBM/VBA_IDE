import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSplit from 'vue-split-panel'

Vue.use(VueSplit)
const initUSE = async () => {
  const events: Vue = new Vue()
  Object.defineProperties(Vue.prototype, {
    $events: {
      get: function () {
        return events
      }
    }
  })

  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

initUSE()
