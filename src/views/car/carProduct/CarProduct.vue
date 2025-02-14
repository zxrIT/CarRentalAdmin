<script setup lang="ts">
import {reactive, ref, computed, watch} from "vue";
import type {ICar, ICarShow} from "@/typings/car";
import {type ComponentSize, ElMessage, type FormInstance, type FormRules} from 'element-plus'
import type {BaseResponse} from "@/typings/response/BaseResponse.ts";
import {deleteCarProductService, getCarProductService, updateCarProductService} from "@/service/carService.ts";
import {Operation} from "@/enum";

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const reRenderStatus = ref<boolean>(false)
const ruleFormData = reactive<ICar>({
    id: "",
    name: "",
    displacement: "",
    specifications: "",
    energy: "",
    volume: 0,
    actuation: "",
    status: false,
    firstTag: "",
    secondTag: "",
    thirdTag: "",
    fourthTag: "",
    originalPrice: 0,
    currentPrice: 0,
    carImage: "",
    fuelOilNumber: "",
    seats: 0,
    brand: ""
})

const carIconComputed = computed<string>(() => {
    return (import.meta.env.VITE_STATIC_SERVER_URL) + ruleFormData.carImage
})

const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            const updateResponse = await updateCarProductService<BaseResponse<String>, ICar>(ruleFormData)
            ElMessage({
                type: "success",
                message: updateResponse.message,
            })
            reRenderStatus.value = !reRenderStatus.value
        } else {
            ElMessage({
                type: "error",
                message: "请根据提示完成数据填写后再提交"
            })
        }
    })
}

const deleteCar = async (id: string) => {
    const deleteResponse = await deleteCarProductService<BaseResponse<String>>(id)
    if (deleteResponse.code === 200) {
        ElMessage({
            type: "success",
            message: updateResponse.message,
        })
        reRenderStatus.value = !reRenderStatus.value
    } else {
        ElMessage({
            type: "error",
            message: "删除失败"
        })
    }
}

const rules = reactive<FormRules<ICar>>({
    name: [
        {required: true, message: '请输入车辆名字', trigger: 'change'},
    ],
    displacement: [
        {required: true, message: '请输入车辆排量', trigger: 'change'},
    ],
    specifications: [
        {required: true, message: '请输入车辆规模', trigger: 'change'},
    ],
    energy: [
        {required: true, message: '请输入车辆能源类型', trigger: 'change'},
    ],
    volume: [
        {required: true, message: '请输入车辆油箱容积', trigger: 'change'},
    ],
    actuation: [
        {required: true, message: '请输入车辆驱动方式', trigger: 'change'},
    ],
    firstTag: [
        {required: true, message: '请输入车辆第一标签', trigger: 'change'},
    ],
    secondTag: [
        {required: true, message: '请输入车辆第二标签', trigger: 'change'},
    ],
    thirdTag: [
        {required: true, message: '请输入车辆第三标签', trigger: 'change'},
    ],
    fourthTag: [
        {required: true, message: '请输入车辆第四标签', trigger: 'change'},
    ],
    originalPrice: [
        {type: 'number', required: true, message: '请输入车辆原价', trigger: 'change'},
    ],
    currentPrice: [
        {type: 'number', required: true, message: '请输入车辆现价', trigger: 'change'},
    ],
    fuelOilNumber: [
        {required: true, message: '请输入车辆燃油标号', trigger: 'change'},
    ],
    seats: [
        {type: 'number', required: true, message: '请输入车辆座位数量', trigger: 'change'},
    ],
    brand: [
        {required: true, message: '请输入车辆品牌', trigger: 'change'},
    ],
})

const drawer = ref<boolean>(false)
const operation = ref<Operation>(Operation.UPDATE)
const tableData = reactive<Array<ICarShow>>([])

const operationPayload = (row: ICarShow) => {
    drawer.value = true
    operation.value = Operation.UPDATE
    updateRuleFormData(row)
}

const updateRuleFormData = (row: ICarShow) => {
    ruleFormData.id = row.id
    ruleFormData.name = row.name
    ruleFormData.displacement = row.displacement
    ruleFormData.specifications = row.specifications
    ruleFormData.firstTag = row.tags[0]
    ruleFormData.secondTag = row.tags[1]
    ruleFormData.thirdTag = row.tags[2]
    ruleFormData.fourthTag = row.tags[3]
    ruleFormData.originalPrice = parseFloat(row.originalPrice.replace("¥", ""))
    ruleFormData.currentPrice = parseFloat(row.currentPrice.replace("¥", ""))
    ruleFormData.energy = row.energy
    ruleFormData.fuelOilNumber = row.fuelOilNumber.replace("#", "")
    ruleFormData.volume = row.volume.replace("L", "")
    ruleFormData.actuation = row.actuation
    ruleFormData.status = row.status === "已上架"
    ruleFormData.seats = parseInt(row.seats)
    ruleFormData.brand = row.brand
    ruleFormData.carImage = row.id + ".png"
}
watch(reRenderStatus, async () => {
    const carProductResponse = await getCarProductService<BaseResponse<ICar[]>>()
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
}, {immediate: true})
</script>

<template>
    <div class="carProductContainer">
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
                        <el-button link type="primary" size="small" @click="operationPayload(scope.row)">修改
                        </el-button>
                        <el-popconfirm title="确认要删除吗" @confirm="deleteCar(scope.row.id)">
                            <template #reference>
                                <el-button link type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
    <el-drawer v-model="drawer" :with-header="false">
        <span>{{ operation + "车辆信息" }}</span>
        <el-form
            ref="ruleFormRef"
            style="max-width: 600px;margin-top: 20px"
            :model="ruleFormData"
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
        >
            <el-form-item label="车辆名字" prop="name">
                <el-input v-model="ruleFormData.name"/>
            </el-form-item>
            <el-form-item label="排量" prop="displacement">
                <el-input v-model="ruleFormData.displacement"/>
            </el-form-item>
            <el-form-item label="规模" prop="specifications">
                <el-input v-model="ruleFormData.specifications"/>
            </el-form-item>
            <el-form-item label="第一标签" prop="firstTag">
                <el-input v-model="ruleFormData.firstTag"/>
            </el-form-item>
            <el-form-item label="第二标签" prop="secondTag">
                <el-input v-model="ruleFormData.secondTag"/>
            </el-form-item>
            <el-form-item label="第三标签" prop="thirdTag">
                <el-input v-model="ruleFormData.thirdTag"/>
            </el-form-item>
            <el-form-item label="第四标签" prop="fourthTag">
                <el-input v-model="ruleFormData.fourthTag"/>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
                <el-input v-model="ruleFormData.originalPrice"/>
            </el-form-item>
            <el-form-item label="现价" prop="currentPrice">
                <el-input v-model="ruleFormData.currentPrice"/>
            </el-form-item>
            <el-form-item label="能源类型" prop="energy">
                <el-input v-model="ruleFormData.energy"/>
            </el-form-item>
            <el-form-item label="燃油标号" prop="fuelOilNumber">
                <el-input v-model="ruleFormData.fuelOilNumber"/>
            </el-form-item>
            <el-form-item label="油箱容积" prop="volume">
                <el-input v-model="ruleFormData.volume"/>
            </el-form-item>
            <el-form-item label="驱动方式" prop="actuation">
                <el-input v-model="ruleFormData.actuation"/>
            </el-form-item>
            <el-form-item label="上架状态" prop="status">
                <el-switch v-model="ruleFormData.status"/>
            </el-form-item>
            <el-form-item label="座位数量" prop="seats">
                <el-input v-model="ruleFormData.seats"/>
            </el-form-item>
            <el-form-item label="品牌" prop="brand">
                <el-input v-model="ruleFormData.brand"/>
            </el-form-item>
            <el-form-item label="车辆照片" prop="carImage">
                <img style="width: 100%;height: 150px"
                     :src="carIconComputed"
                     alt="车辆照片"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click="submit(ruleFormRef)">
                    {{ operation }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style scoped lang="less">
.carProductContainer {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>