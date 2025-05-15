import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.min.css'
import { FontAwesomeIcon } from './plugins/font-awesome'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'bulma/css/bulma.css'
import "@/assets/main.css"
import Oruga from '@oruga-ui/oruga-next';

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router).use(Buefy, {
  defaultIconPack: 'fas',
})
app.use(Oruga)

app.mount('#app')


