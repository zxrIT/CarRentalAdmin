<script setup lang="ts">
import {format} from "date-fns"
import {reactive, watchEffect} from "vue";
import type {BaseResponse} from "@/typings/response/BaseResponse.ts";
import type {IOrder, IOrderShow} from "@/typings/order/order.ts";
import {getOrderService} from "@/service/order.ts";

const tableData = reactive<Array<IOrderShow>>([])

const orderStatus = (status: number): string => {
    switch (status) {
        case 0:
            return "已还车"
        case 1:
            return "用车中"
        case 2:
            return "待取车"
    }
}

watchEffect(async () => {
    const orderResponse = await getOrderService<BaseResponse<Array<IOrder>>>()
    if (orderResponse.code === 200) {
        orderResponse.data.forEach((order) => {
            const tempOrder: IOrderShow = {}
            tempOrder.amount = order.amount
            tempOrder.userId = order.userId
            tempOrder.endTime = format(order.endTime, "yyyy-MM-dd")
            tempOrder.startTime = format(order.startTime, "yyyy-MM-dd")
            tempOrder.orderNo = order.orderNo
            tempOrder.type = order.type
            tempOrder.carType = order.carType
            tempOrder.status = orderStatus(order.status)
            tableData.push(tempOrder)
        })
    }
})
</script>

<template>
    <div class="orderContainer">
        <el-card style="width: 1250px;height: 700px">
            <el-table :data="tableData" style="width: 100%" height="680">
                <el-table-column prop="orderNo" label="订单号" width="120" align="center"/>
                <el-table-column prop="type" label="用车人" width="120" align="center"/>
                <el-table-column prop="carType" label="用车类型" width="120" align="center"/>
                <el-table-column prop="startTime" label="开始时间" width="120" align="center"/>
                <el-table-column prop="endTime" label="结束时间" width="120" align="center"/>
                <el-table-column prop="amount" label="金额" width="120" align="center"/>
                <el-table-column prop="status" label="订单状态" width="120" align="center"/>
                <el-table-column prop="userId" label="订单人" width="250" align="center"/>
            </el-table>
        </el-card>
    </div>
</template>

<style scoped lang="less">
.orderContainer {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>