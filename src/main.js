import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VueAvatar from "@webzlodimir/vue-avatar";
import "@webzlodimir/vue-avatar/dist/style.css";
import Notifications from '@kyvg/vue3-notification'
import router from './routes'

createApp(App).use(Notifications).component('VueAvatar', VueAvatar).use(router).mount('#app')

