import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DatePicker from 'ant-design-vue'
import ref from 'vue-ref'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(DatePicker);
Vue.use(ref)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')