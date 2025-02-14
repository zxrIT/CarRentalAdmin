<script setup lang="ts">
import {Bicycle, Male, Bell, View, Van} from '@element-plus/icons-vue'
import {LeftNavEnum} from "@/enum";
</script>

<template>
    <div class="leftNavigateContainer">
        <el-menu
            :router="true"
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="LeftNavEnum.CAR_PRODUCT"
            text-color="#fff"
        >
            <el-menu-item>
                <el-icon>
                    <Bicycle/>
                </el-icon>
                <span>华子租车</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Bicycle/>
                    </el-icon>
                    <span>车辆管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="LeftNavEnum.CAR_PRODUCT">车辆信息管理</el-menu-item>
                    <el-menu-item :index="LeftNavEnum.CAR_DETAIL">车辆详情管理</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <Male/>
                    </el-icon>
                    <span>角色管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="LeftNavEnum.USER">用户管理</el-menu-item>
                    <el-menu-item :index="LeftNavEnum.CAR_OWNER">车主管理</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item :index="LeftNavEnum.ORDER">
                <el-icon>
                    <Bell/>
                </el-icon>
                <span>订单管理</span>
            </el-menu-item>
            <el-menu-item :index="LeftNavEnum.VEHICLE_INSPECTION">
                <el-icon>
                    <View/>
                </el-icon>
                <span>车辆审查</span>
            </el-menu-item>
            <el-menu-item :index="LeftNavEnum.UPLOAD">
                <el-icon><Van /></el-icon>
                <span>车辆上传</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<style scoped lang="less">
.leftNavigateContainer {
    height: 100%;
    width: 100%;
}
</style>