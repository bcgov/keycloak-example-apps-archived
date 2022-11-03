import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

export const app = createApp(App)

app.config.productionTip = false

app.use(pinia)

app.use(router)

app.mount('#app')
