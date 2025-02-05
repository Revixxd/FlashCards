import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faFolderOpen, faForward, faHome, faLayerGroup, faSignInAlt, faSquarePlus, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

library.add(faBars, faHome, faFolderOpen, faSignInAlt, faSquarePlus, faLayerGroup, faForward, faUser, faEye, faEyeSlash)
const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.mount('#app')
