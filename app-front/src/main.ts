import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faHome, faFolderOpen, faSignInAlt, faSquarePlus, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBars, faHome, faFolderOpen, faSignInAlt, faSquarePlus, faLayerGroup);
const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
