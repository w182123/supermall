import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import toast from 'components/common/toast'
import fastClick from 'fastclick'
import lazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(toast)

Vue.use(lazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

//定义$bus,事件总线
Vue.prototype.$bus = new Vue()

// 清除手机端点击300ms的延迟
fastClick.attach(document.body)

new Vue({
  // el:'#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')
