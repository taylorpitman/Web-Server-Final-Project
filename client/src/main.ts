import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.min.css'
import { FontAwesomeIcon } from './plugins/font-awesome'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
