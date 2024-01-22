import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { initializeApp } from "firebase/app";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

const firebaseConfig = {
  apiKey: "AIzaSyByuVX4iiymiDpycmt7S_blh4QGPMkHOIw",
  authDomain: "jwt-firebase-vue3-d7996.firebaseapp.com",
  projectId: "jwt-firebase-vue3-d7996",
  storageBucket: "jwt-firebase-vue3-d7996.appspot.com",
  messagingSenderId: "119599397233",
  appId: "1:119599397233:web:74409a9206cb3e07d15ed0"
};

import App from './App.vue'
import router from './router'

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')




