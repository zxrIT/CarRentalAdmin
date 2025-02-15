import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import "@/assets/static/less/reset.less"
import App from './App.vue'
import {createPinia, type Pinia} from "pinia";

const pinia: Pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')