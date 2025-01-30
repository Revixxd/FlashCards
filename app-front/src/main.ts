import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faHome, faFolderOpen, faSignInAlt, faSquarePlus, faLayerGroup, faForward, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';

library.add(faBars, faHome, faFolderOpen, faSignInAlt, faSquarePlus, faLayerGroup, faForward, faUser);
const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.mount('#app')
