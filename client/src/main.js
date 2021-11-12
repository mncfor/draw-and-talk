import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ButtonSpecialOnlyIcon from '@/components/UI/ButtonSpecialOnlyIcon'
import '@/assets/main.scss'

createApp(App)
.use(store)
.use(router)
.component('ButtonSpecialOnlyIcon', ButtonSpecialOnlyIcon)
.mount('#app')
