import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import store from '@/store/store.js'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/assets/style/fonts.css'

const app = createApp(App)

const toastificationOption = {
  position: 'top-left',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

app
  .use(router)
  .use(store)
  .use(Toast, toastificationOption)
  .mount('#app')
