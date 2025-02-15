<script setup lang="ts">
import {computed, reactive, ref, watchEffect} from "vue";
import type {ICar, ICarDetails, ICarDetailsShow} from "@/typings/car";
import {
    getCarProductService,
    getDetailsService,
    incrementCarProductService,
    updateCarDetailService
} from "@/service/carService.ts";
import type {BaseResponse} from "@/typings/response/BaseResponse.ts";
import {type ComponentSize, ElMessage, type FormInstance, type FormRules} from "element-plus";
import {Operation} from "@/enum";

const carData = reactive<Array<ICar>>([])
const tableData = reactive<Array<ICarDetailsShow>>([])
const drawer = ref<boolean>(false)
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const operation = ref<Operation>(Operation.UPDATE)

const ruleFormData = reactive<ICarDetailsShow>({
    id: "",
    name: "",
    carImage: "",
    autoAirConditioner: "",
    airSystem: "",
    chair: "",
    driverAssistanceImage: false,
    carPlayer: false,
    skylight: false,
    radar: false,
    tirePressureMonitoringFunction: "",
    bluetoothUSB: "",
    nearAndFarLightType: "",
    automaticParking: false,
    launchWithOneClick: false
})

const ruleFormDataCreate = reactive<ICarDetailsShow>({
    id: "",
    name: "",
    autoAirConditioner: "",
    airSystem: "",
    chair: "",
    driverAssistanceImage: false,
    carPlayer: false,
    skylight: false,
    radar: false,
    tirePressureMonitoringFunction: "",
    bluetoothUSB: "",
    nearAndFarLightType: "",
    automaticParking: false,
    launchWithOneClick: false
})

const formData = computed<reactive<ICarDetailsShow>>(() => {
    return operation.value === Operation.UPDATE ? ruleFormData : ruleFormDataCreate;
})

const rules = reactive<FormRules<ICarDetailsShow>>({
    autoAirConditioner: [
        {required: true, message: '请输入自动空调类型', trigger: 'change'},
    ],
    airSystem: [
        {required: true, message: '请输入车辆空气系统类型', trigger: 'change'},
    ],
    chair: [
        {required: true, message: '请输入车辆座椅类型', trigger: 'change'},
    ],
    driverAssistanceImage: [
        {required: true, message: '请输入车辆辅助驾驶影像', trigger: 'change'},
    ],
    carPlayer: [
        {required: true, message: '请输入车辆手机互联', trigger: 'change'},
    ],
    skylight: [
        {required: true, message: '请输入车辆天窗', trigger: 'change'},
    ],
    radar: [
        {required: true, message: '请输入车辆前后雷达', trigger: 'change'},
    ],
    tirePressureMonitoringFunction: [
        {required: true, message: '请输入车辆胎压监测功能', trigger: 'change'},
    ],
    bluetoothUSB: [
        {required: true, message: '请输入车辆蓝牙/USB', trigger: 'change'},
    ],
    nearAndFarLightType: [
        {required: true, message: '请输入车辆远/近光灯类型', trigger: 'change'},
    ],
    automaticParking: [
        {required: true, message: '请输入车辆自动驻车', trigger: 'change'},
    ],
    launchWithOneClick: [
        {required: true, message: '请输入车辆一键启动', trigger: 'change'},
    ],
})

const submit = async (formEl: FormInstance | undefined, action: Operation) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            switch (action) {
                case Operation.UPDATE:
                    const updateResponse = await updateCarDetailService<BaseResponse<String>, ICarDetailsShow>(ruleFormData)
                    ElMessage({
                        type: "success",
                        message: updateResponse.message,
                    })
                    break
                case Operation.CREATE:
                    const incrementResponse = await incrementCarProductService<BaseResponse<String>, ICarDetailsShow>(ruleFormDataCreate)
                    ElMessage({
                        type: "success",
                        message: incrementResponse.message,
                    })
            }
        } else {
            ElMessage({
                type: "error",
                message: "请根据提示完成数据填写后再提交"
            })
        }
    })
}
const operationCreatePayload = (carRow: ICarDetailsShow) => {
    drawer.value = !drawer.value;
    operation.value = Operation.CREATE
}
const operationPayload = (carRow: ICarDetailsShow) => {
    drawer.value = !drawer.value;
    operation.value = Operation.UPDATE
    ruleFormData.id = carRow.id
    ruleFormData.name = carRow.name
    ruleFormData.carImage = carRow.carImage
    ruleFormData.autoAirConditioner = carRow.autoAirConditioner
    ruleFormData.airSystem = carRow.airSystem
    ruleFormData.chair = carRow.chair
    ruleFormData.driverAssistanceImage = carRow.driverAssistanceImage !== "无"
    ruleFormData.carPlayer = carRow.carPlayer !== "无"
    ruleFormData.skylight = carRow.skylight !== "无"
    ruleFormData.radar = carRow.radar !== "无"
    ruleFormData.tirePressureMonitoringFunction = carRow.tirePressureMonitoringFunction
    ruleFormData.bluetoothUSB = carRow.bluetoothUSB
    ruleFormData.nearAndFarLightType = carRow.nearAndFarLightType
    ruleFormData.automaticParking = carRow.automaticParking !== "无"
    ruleFormData.launchWithOneClick = carRow.launchWithOneClick !== "无"
}

const changeId = () => {
    carData.forEach((item: ICar) => {
        if (item.name === ruleFormDataCreate.name) {
            ruleFormDataCreate.id = item.id
        }
    })
}

watchEffect(async () => {
    const carResponse = await getCarProductService<BaseResponse<ICar[]>>()
    const response = await getDetailsService<BaseResponse<ICarDetails[]>>()
    if (response.code === 200 && carResponse.code === 200) {
        carData.push(...carResponse.data)
        for (const car of response.data) {
            const tempDetail: ICarDetailsShow = {...car}
            tempDetail.driverAssistanceImage = !car.driverAssistanceImage ? "无" : "有"
            tempDetail.carPlayer = !car.carPlayer ? "无" : "有"
            tempDetail.skylight = !car.skylight ? "无" : "有"
            tempDetail.radar = !car.radar ? "无" : "有"
            tempDetail.automaticParking = !car.automaticParking ? "无" : "有"
            tempDetail.launchWithOneClick = !car.launchWithOneClick ? "无" : "有"
            tempDetail.carImage = "http://localhost:8080/static/" + car.id + ".png"
            console.log(carData.filter((carItem: ICar) => carItem.id === car.id))
            tempDetail.name = (carData.filter((carItem: ICar) => carItem.id === car.id))[0].name
            tableData.push(tempDetail)
        }
    }
})
</script>

<template>
    <div class="carDetailContainer">
        <el-card style="width: 1250px;height: 700px">
            <el-table :data="tableData" style="width: 100%" height="680">
                <el-table-column fixed label="照片" width="150" align="center">
                    <template #default="scope">
                        <img :src="scope.row.carImage" alt="用户照片" style="width: 130px; height: 70px;">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="车辆名称" width="120" align="center"/>
                <el-table-column prop="autoAirConditioner" label="自动空调" width="120" align="center"/>
                <el-table-column prop="bluetoothUSB" label="蓝牙/USB" width="120" align="center"/>
                <el-table-column prop="nearAndFarLightType" label="远/近光灯" width="120" align="center"/>
                <el-table-column prop="airSystem" label="空气系统" width="120" align="center"/>
                <el-table-column prop="chair" label="座椅" width="120" align="center"/>
                <el-table-column prop="driverAssistanceImage" label="驾驶辅助影像" width="120" align="center"/>
                <el-table-column prop="carPlayer" label="手机互联" width="120" align="center"/>
                <el-table-column prop="skylight" label="天窗" width="120" align="center"/>
                <el-table-column prop="radar" label="前后雷达" width="120" align="center"/>
                <el-table-column prop="tirePressureMonitoringFunction" label="胎压监测功能" width="120" align="center"/>
                <el-table-column prop="automaticParking" label="自动驻车" width="120" align="center"/>
                <el-table-column prop="launchWithOneClick" label="一键启停" width="120" align="center"/>
                <el-table-column fixed="right" label="操作" min-width="120" align="center">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="operationPayload(scope.row)">修改
                        </el-button>
                        <el-button link type="primary" size="small" @click="operationCreatePayload(scope.row)">新增
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
    <el-drawer v-model="drawer" :with-header="false">
        <span> {{ operation === Operation.UPDATE ? "修改" : "新增" }}车辆详情</span>
        <el-form
            ref="ruleFormRef"
            style="max-width: 600px;margin-top: 20px"
            :model="formData"
            label-width="auto"
            class="demo-ruleForm"
            :rules="rules"
            :size="formSize"
            status-icon
        >
            <el-form-item label="车辆照片" prop="carImage" v-show="operation === Operation.UPDATE">
                <img style="width: 100%;height: 150px"
                     :src="formData.carImage"
                     alt="车辆照片"/>
            </el-form-item>
            <el-form-item label="车辆名" prop="name" v-show="operation === Operation.UPDATE">
                <el-input v-model="formData.name" disabled/>
            </el-form-item>
            <el-form-item label="车辆名" prop="name" v-show="operation === Operation.CREATE">
                <el-select v-model="formData.name" clearable placeholder="请选择车辆名字" @change="changeId">
                    <el-option v-for="item in carData" :key="item.id" :label="item.name" :value="item.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="车辆id" prop="id" v-show="operation === Operation.CREATE">
                <el-input v-model="formData.id" disabled/>
            </el-form-item>
            <el-form-item label="自动空调" prop="autoAirConditioner">
                <el-input v-model="formData.autoAirConditioner"/>
            </el-form-item>
            <el-form-item label="空气系统" prop="airSystem">
                <el-input v-model="formData.airSystem"/>
            </el-form-item>
            <el-form-item label="座椅" prop="chair">
                <el-input v-model="formData.chair"/>
            </el-form-item>
            <el-form-item label="驾驶辅助影像" prop="driverAssistanceImage">
                <el-switch v-model="formData.driverAssistanceImage"/>
            </el-form-item>
            <el-form-item label="手机互联" prop="carPlayer">
                <el-switch v-model="formData.carPlayer"/>
            </el-form-item>
            <el-form-item label="天窗" prop="skylight">
                <el-switch v-model="formData.skylight"/>
            </el-form-item>
            <el-form-item label="前后雷达" prop="radar">
                <el-switch v-model="formData.radar"/>
            </el-form-item>
            <el-form-item label="胎压监测功能" prop="tirePressureMonitoringFunction">
                <el-input v-model="formData.tirePressureMonitoringFunction"/>
            </el-form-item>
            <el-form-item label="蓝牙/USB" prop="bluetoothUSB">
                <el-input v-model="formData.bluetoothUSB"/>
            </el-form-item>
            <el-form-item label="远/近光灯类型" prop="nearAndFarLightType">
                <el-input v-model="formData.nearAndFarLightType"/>
            </el-form-item>
            <el-form-item label="自动驻车" prop="automaticParking">
                <el-switch v-model="formData.automaticParking"/>
            </el-form-item>
            <el-form-item label="一键启动" prop="launchWithOneClick">
                <el-switch v-model="formData.launchWithOneClick"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click="submit(ruleFormRef,operation)">
                    {{ operation === Operation.UPDATE ? "修改" : "新增" }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style scoped lang="less">
.carDetailContainer {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>