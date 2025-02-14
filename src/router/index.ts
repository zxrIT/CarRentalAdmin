import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import Home from "@/views/Home/Home.vue"
import CarProduct from "@/views/car/carProduct/CarProduct.vue"
import Login from "@/views/Login/Login.vue"

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
                path: "/carOwner",
                component: () => import("@/views/role/carOwner/CarOwner.vue")
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
        component:
        Login,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router