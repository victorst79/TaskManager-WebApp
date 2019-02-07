import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
require('vue2-animate/dist/vue2-animate.min.css')
import VueSocketIO from 'vue-socket.io'
import Chat from 'vue-beautiful-chat'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.use(Chat)
Vue.use(VueAxios, axios)
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000/',
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')