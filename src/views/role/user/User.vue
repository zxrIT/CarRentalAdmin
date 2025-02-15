<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";
import type {IUser, IUserShow} from "@/typings/user/IUser.ts";
import {getUserService, updateUserService} from "@/service/user.ts";
import type {BaseResponse} from "@/typings/response/BaseResponse.ts";
import {type ComponentSize, ElMessage, type FormInstance, type FormRules} from "element-plus";

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<IUser>>({
    roleId: [
        {required: true, message: '请输入电话号', trigger: 'change'},
    ],
    points: [
        {required: true, message: '请输入电话号', trigger: 'change'},
    ]
})
const tableData = reactive<IUserShow[]>([])
const drawer = ref<boolean>(false)
const ruleFormData = reactive<IUser>({
    id: "",
    username: "",
    phone: "",
    roleId: 0,
    userIcon: "",
    points: 0,
    password: "",
    account: ""
})
watchEffect(async () => {
    const response = await getUserService<BaseResponse<IUser[]>>()
    if (response.code === 200) {
        response.data.forEach((item) => {
            const tempUser: IUserShow = {}
            tempUser.id = item.id
            tempUser.phone = item.phone
            tempUser.userIcon = item.userIcon
            tempUser.points = item.points
            tempUser.roleId = item.roleId === 1 ? "管理员" : "用户"
            tempUser.username = item.username
            tempUser.account = item.account
            tempUser.password = item.password
            tableData.push(tempUser)
        })
    }
})

const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            const response = await updateUserService<BaseResponse<string>>(ruleFormData)
            if (response.code === 200) {
                ElMessage.success(response.message)
            } else {
                ElMessage.error("修改失败，请稍后重试")
            }
        } else {
            ElMessage({
                type: "error",
                message: "请根据提示完成数据填写后再提交"
            })
        }
    })
}

const updateUser = (user: IUserShow) => {
    drawer.value = true
    ruleFormData.id = user.id
    ruleFormData.username = user.username
    ruleFormData.userIcon = user.userIcon
    ruleFormData.phone = user.phone
    ruleFormData.points = user.points
    ruleFormData.roleId = user.roleId === "管理员" ? 1 : 0
    ruleFormData.password = user.password
    ruleFormData.account = user.account
}

const deleteUser = async (id: string) => {
    const response = await deleteUser<BaseResponse<string>>(id)
    if (response.code === 200) {
        ElMessage.success(response.message)
    } else {
        ElMessage.error("删除失败，请稍后重试")
    }
}
</script>

<template>
    <div class="userContainer">
        <el-card style="width: 1250px;height: 700px">
            <el-table :data="tableData" style="width: 100%" height="680">
                <el-table-column fixed label="照片" width="150" align="center">
                    <template #default="scope">
                        <img :src="scope.row.userIcon" alt="用户照片"
                             style="width: 50px; height: 50px;border-radius: 50%">
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="120" align="center"/>
                <el-table-column prop="phone" label="手机号" width="120" align="center"/>
                <el-table-column prop="account" label="账号" width="120" align="center"/>
                <el-table-column prop="password" label="密码" width="280" align="center"/>
                <el-table-column prop="roleId" label="权限" width="120" align="center"/>
                <el-table-column prop="points" label="积分" width="120" align="center"/>
                <el-table-column label="操作" width="120" align="center">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="updateUser(scope.row)">修改
                        </el-button>
                        <el-popconfirm title="确认要删除吗" @confirm="deleteUser(scope.row.id)">
                            <template #reference>
                                <el-button link type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-drawer v-model="drawer" :with-header="false">
            <span>修改用户</span>
            <el-form
                :rules="rules"
                ref="ruleFormRef"
                style="max-width: 600px;margin-top: 20px"
                :model="ruleFormData"
                label-width="auto"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
            >
                <el-form-item label="用户照片" prop="userIcon">
                    <img style="width: 200px;height: 200px;margin-left: 50px;border-radius: 50%"
                         :src="ruleFormData.userIcon"
                         alt="车辆照片"/>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-tooltip content="用户原生数据不能修改">
                        <el-input v-model="ruleFormData.username" disabled/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="账户" prop="username">
                    <el-tooltip content="管理员分配账号后不得修改">
                        <el-input v-model="ruleFormData.account" disabled/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="密码" prop="username">
                    <el-tooltip content="管理员分配账号密码后不得修改">
                        <el-input v-model="ruleFormData.password" disabled/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="电话号" prop="phone">
                    <el-tooltip content="用户原生数据不能修改">
                        <el-input v-model="ruleFormData.phone" disabled/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="权限" prop="roleId">
                    <el-tooltip content="1代表管理员，2代表用户">
                        <el-input v-model="ruleFormData.roleId"/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="积分" prop="points">
                    <el-input v-model="ruleFormData.points"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="submit(ruleFormRef)">
                        修改
                    </el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<style scoped lang="less">
.userContainer {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>