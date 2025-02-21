import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faBook, faEye, faEyeSlash, faFolderOpen, faForward, faHome, faLayerGroup, faSignInAlt, faSquarePlus, faUser, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

library.add(faBars, faHome, faFolderOpen, faSignInAlt, faSquarePlus, faLayerGroup, faForward, faUser, faEye, faEyeSlash, faPlus, faBook)

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.mount('#app')
