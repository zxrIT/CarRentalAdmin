<script setup lang="ts">
import {reactive, watchEffect} from "vue";
import type {ICar, ICarShow} from "@/typings/car";
import type {BaseResponse} from "@/typings/response/BaseResponse.ts";
import {
    dismissVehicleInspectionService,
    getVehicleInspectionService,
    throughVehicleInspectionService
} from "@/service/vehicleInspection.ts";
import {ElMessage} from "element-plus";

const tableData = reactive<Array<ICarShow>>([])
watchEffect(async () => {
    const carProductResponse = await getVehicleInspectionService<BaseResponse<ICar[]>>()
    if (carProductResponse.code === 200) {
        carProductResponse.data.forEach((car: ICar) => {
            const tempCar: ICarShow = {
                id: car.id,
                name: car.name,
                image: import.meta.env.VITE_STATIC_SERVER_URL + car.carImage,
                displacement: car.displacement,
                specifications: car.specifications,
                energy: car.energy,
                volume: car.volume + "L",
                actuation: car.actuation,
                status: car.status ? "已上架" : "未上架",
                tags: [car.firstTag, car.secondTag, car.thirdTag, car.fourthTag],
                originalPrice: "¥" + car.originalPrice,
                currentPrice: "¥" + car.currentPrice,
                fuelOilNumber: "#" + car.fuelOilNumber,
                seats: car.seats.toString() + "座",
                brand: car.brand,
            }
            tableData.push(tempCar)
        })
    }
})
const through = async (id: string) => {
    const response = await throughVehicleInspectionService<BaseResponse<string>>(id)
    if (response.code === 200) {
        ElMessage.success(response.message)
    } else {
        ElMessage.error("通过失败，请稍后重试")
    }
}

const dismiss = async (id: string) => {
    const response = await dismissVehicleInspectionService<BaseResponse<string>>(id)
    if (response.code === 200) {
        ElMessage.success(response.message)
    } else {
        ElMessage.error("驳回失败，请稍后重试")
    }
}
</script>

<template>
    <div class="vehicleInspectionContainer">
        <el-card style="width: 1250px;height: 700px">
            <el-table :data="tableData" style="width: 100%" height="680">
                <el-table-column fixed label="照片" width="150" align="center">
                    <template #default="scope">
                        <img :src="scope.row.image" alt="用户照片" style="width: 130px; height: 70px;">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="车辆名称" width="120" align="center"/>
                <el-table-column prop="displacement" label="排量" width="120" align="center"/>
                <el-table-column prop="specifications" label="规模" width="120" align="center"/>
                <el-table-column prop="tags" label="标签" width="120" align="center">
                    <template #default="scope">
                        <el-tag
                            v-for="item in scope.row.tags"
                            :key="item"
                            effect="light"
                            style="margin-top: 5px"
                            round
                        >
                            {{ item }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="originalPrice" label="原价" width="120" align="center"/>
                <el-table-column prop="currentPrice" label="现价" width="120" align="center"/>
                <el-table-column prop="energy" label="能源类型" width="120" align="center"/>
                <el-table-column prop="fuelOilNumber" label="燃油编号" width="120" align="center"/>
                <el-table-column prop="volume" label="油箱容积" width="120" align="center"/>
                <el-table-column prop="actuation" label="驱动方式" width="120" align="center"/>
                <el-table-column prop="status" label="上架状态" width="120" align="center"/>
                <el-table-column prop="seats" label="座位数量" width="120" align="center"/>
                <el-table-column prop="brand" label="品牌" width="120" align="center"/>
                <el-table-column fixed="right" label="操作" min-width="120" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确认要通过吗" @confirm="through(scope.row.id)">
                            <template #reference>
                                <el-button link type="primary" size="small">通过
                                </el-button>
                            </template>
                        </el-popconfirm>
                        <el-popconfirm title="确认要驳回吗" @confirm="dismiss(scope.row.id)">
                            <template #reference>
                                <el-button link type="primary" size="small">驳回</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style scoped lang="less">
.vehicleInspectionContainer {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>