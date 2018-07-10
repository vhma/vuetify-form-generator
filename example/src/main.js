import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueEvents from 'vue-events'

Vue.use(Vuetify)
Vue.use(VueEvents)

new Vue({
  el: '#app',
  render: h => h(App)
})
