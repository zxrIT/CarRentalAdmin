import {defineStore} from 'pinia'
import {reactive} from "vue";
import type {IUser} from "../typings/user/IUser.ts";

export const useUserStore = defineStore("user", () => {
    const changeUserAction = (user: IUser) => {
        userState.id = user.id;
        userState.username = user.username;
        userState.password = user.password;
        userState.account = user.account;
        userState.roleId = user.roleId;
        userState.userIcon = user.userIcon;
        userState.points = user.points;
        userState.phone = user.phone;
    }

    const userState = reactive<IUser>({
        id: "",
        username: "",
        phone: "",
        roleId: 0,
        userIcon: "",
        points: 0,
        password: "",
        account: ""
    })

    return {
        userState,
        changeUserAction,
    }
})