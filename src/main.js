import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/scss/reset.scss"
import "./assets/scss/basic.scss"
// import "./assets/scss/application.scss"


const app = createApp(App)

app.use(router)

app.mount('#app')
