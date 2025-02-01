import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faFolderOpen, faForward, faHome, faLayerGroup, faSignInAlt, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

library.add(faBars, faHome, faFolderOpen, faSignInAlt, faSquarePlus, faLayerGroup, faForward, faUser)
const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
