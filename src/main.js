import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'view-design/dist/styles/iview.css';
import Http from './service/Http'

Vue.config.productionTip = false
Vue.prototype.$Http = Http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
