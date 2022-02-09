import Vue from 'vue'
import App from './App.vue'

const NotFound = { template: '<p>Page not found</p>' }
const About = { template: '<p>about page</p>' }

const routes = {
  '/': App,
  '/about': About
}

Vue.config.productionTip = false

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
}).$mount('#app')
