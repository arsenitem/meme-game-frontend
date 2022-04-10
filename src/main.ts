import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import socket from './socket';

createApp(App).use(router).use(store).provide('$socket', socket).mount('#app')
