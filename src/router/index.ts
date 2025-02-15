import {createRouter, createWebHistory, useRouter} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import Home from "@/views/Home/Home.vue"
import CarProduct from "@/views/car/carProduct/CarProduct.vue"
import Login from "@/views/Login/Login.vue"
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import type {IUser} from "../typings/user/IUser.ts";
import {useUserStore} from "../store";
import {ElMessage} from "element-plus";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        component: Home,
        redirect: "/carProduct",
        children: [
            {
                path: "/carProduct",
                component: CarProduct
            },
            {
                path: "/carDetail",
                component: () => import("@/views/car/carDetail/CarDetail.vue")
            },
            {
                path: "/user",
                component: () => import("@/views/role/user/User.vue")
            },
            {
                path: "/order",
                component: () => import("@/views/order/Order.vue")
            },
            {
                path: "/vehicleInspection",
                component: () => import("@/views/vehicleInspection/VehicleInspection.vue")
            },
            {
                path: "/upload",
                component: () => import("@/views/car/uploadCarProduct/UploadCarProduct.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component:
        Login,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name === "login") {
        next()
    }
    const {getStorage} = useLocalStorage()
    const userStore = useUserStore();
    const user: IUser = JSON.parse(getStorage("user"))
    if (user === undefined || user === null) {
        ElMessage.error('您还没有登录或登录已过期，请重新登录后再使用')
        next("/login")
    }
    userStore.changeUserAction(user)
    if (userStore.userState.id.length > 0) {
        next()
    } else {
        ElMessage.error('您还没有登录或登录已过期，请重新登录后再使用')
        next("/login")
    }
})

export default router