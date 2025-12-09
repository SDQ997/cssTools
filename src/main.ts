import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import router from './router'
app.use(router)
import store from './store'
app.use(store)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import "@/font/font.css"
//组件
import CtTab from "@/components/CtTab.vue"
app.component("CtTab",CtTab)
import CtPositionSelect from "@/components/CtPositionSelect.vue"
app.component("CtPositionSelect",CtPositionSelect)

app.mount('#app')
