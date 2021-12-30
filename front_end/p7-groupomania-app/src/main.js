
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from './plugins/font-awesome';


import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'



createApp(App)
    .use(VuesticPlugin)
    .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");