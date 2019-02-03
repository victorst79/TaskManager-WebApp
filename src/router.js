import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Weather from './views/Weather.vue'
import Chat from './views/Chat.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }
  ]
})
