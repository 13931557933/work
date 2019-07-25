import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import ElementUi from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUi)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
