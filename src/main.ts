import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import vfmPlugin from 'vue-final-modal'
import App from './App.vue';
import store from './store';
import router from './router';
import socket from './socket';
createApp(App).use(router).use(store).use(vfmPlugin).provide('$socket', socket).mount('#app')
