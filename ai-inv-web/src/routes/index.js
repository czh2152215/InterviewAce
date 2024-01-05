
import { createRouter, createWebHashHistory } from "vue-router";
import Interview from "../views/interview.vue";
import Transcript from "../views/transcript.vue";
import Home from "../views/home.vue";
import DashBoard from "../views/dashboard.vue";
import Myresume from "../views/myresume.vue";
import MindMap from "../components/mindmap.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/interview", component: Interview },
  { path: "/mindmap", component: MindMap },
  { path: "/transcript", component: Transcript },
  { path: "/home", component: Home },
  { path: "/dashboard", component: DashBoard },
  { path: "/myresume", component: Myresume },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
