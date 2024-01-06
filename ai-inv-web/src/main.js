
import { createApp } from "vue";
import ElementPlus from "element-plus";
import router from "./routes";

import "./style.css";
import "element-plus/dist/index.css";

import App from './App.vue';
import store from './storage';


const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);

app.mount("#app");
