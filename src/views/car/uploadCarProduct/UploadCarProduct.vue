<script setup lang="ts">
import {reactive, ref} from "vue";
import type {ComponentSize, FormInstance, FormRules, UploadInstance, UploadProps} from "element-plus";
import type {ICar} from "@/typings/car";
import {ElMessage} from 'element-plus'
import type {BaseResponse} from "@/typings/response/BaseResponse.ts";

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const fileList = ref<any[]>([])

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
        {required: true, message: '请输入车辆原价', trigger: 'change'},
    ],
    currentPrice: [
        {required: true, message: '请输入车辆现价', trigger: 'change'},
    ],
    fuelOilNumber: [
        {required: true, message: '请输入车辆燃油标号', trigger: 'change'},
    ],
    seats: [
        {required: true, message: '请输入车辆座位数量', trigger: 'change'},
    ],
    brand: [
        {required: true, message: '请输入车辆品牌', trigger: 'change'},
    ],
    carImage: [
        {required: true, message: '请上传车辆照片', trigger: 'change'},
    ],
})
const ruleFormData = reactive<ICar>({
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
    fuelOilNumber: 0,
    seats: 0,
    brand: ""
})

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPGOrPNG) {
        ElMessage.error('只能上传 JPG/PNG 格式的图片!')
        return false
    }
    const isLt500K = file.size / 1024 < 500
    if (!isLt500K) {
        ElMessage.error('图片大小不能超过 500KB!')
        return false
    }
    return true
}

const handleFileChange: UploadProps['onChange'] = (uploadFile) => {
    fileList.value = [uploadFile.raw]
    ruleFormData.carImage = uploadFile.raw?.name || ''
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        const formDataImage = new FormData();
        fileList.value.forEach((file) => {
            formDataImage.append('file', file as FileType);
        });
        console.log(formDataImage)
        if (valid) {
            fetch(`http://localhost:8080/business/increment/car/${ruleFormData.name}/${ruleFormData.displacement}/${ruleFormData.specifications}
            /${ruleFormData.firstTag}/${ruleFormData.secondTag}/${ruleFormData.thirdTag}/${ruleFormData.fourthTag}/${ruleFormData.originalPrice}/
            ${ruleFormData.currentPrice}/${ruleFormData.fuelOilNumber}/${ruleFormData.energy}/${ruleFormData.volume}/${ruleFormData.actuation}
            /${ruleFormData.seats}/${ruleFormData.status}/${ruleFormData.brand}`, {
                method: 'POST',
                body: formDataImage,
            }).then((res) => res.json())
                .then((response: BaseResponse<string>) => {
                    if (response.code === 200) {
                        ElMessage.success(response.message)
                    } else {
                        ElMessage.error("添加失败请稍后重试")
                    }
                })
        }
    })
}
</script>

<template>
    <div class="uploadCarProductContainer">
        <el-card style="width: 1250px;height: 700px">
            <el-form
                ref="ruleFormRef"
                :model="ruleFormData"
                :rules="rules"
                label-width="120px"
                class="upload-form"
                :size="formSize"
                status-icon
            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="车辆名字" prop="name">
                            <el-input v-model="ruleFormData.name"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="排量" prop="displacement">
                            <el-input v-model="ruleFormData.displacement"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="规模" prop="specifications">
                            <el-input v-model="ruleFormData.specifications"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="能源类型" prop="energy">
                            <el-input v-model="ruleFormData.energy"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="第一标签" prop="firstTag">
                            <el-input v-model="ruleFormData.firstTag"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="第二标签" prop="secondTag">
                            <el-input v-model="ruleFormData.secondTag"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="第三标签" prop="thirdTag">
                            <el-input v-model="ruleFormData.thirdTag"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="第四标签" prop="fourthTag">
                            <el-input v-model="ruleFormData.fourthTag"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="原价" prop="originalPrice">
                            <el-input v-model="ruleFormData.originalPrice"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="现价" prop="currentPrice">
                            <el-input v-model="ruleFormData.currentPrice"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="燃油标号" prop="fuelOilNumber">
                            <el-input v-model="ruleFormData.fuelOilNumber"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="油箱容积" prop="volume">
                            <el-input v-model="ruleFormData.volume"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="驱动方式" prop="actuation">
                            <el-input v-model="ruleFormData.actuation"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上架状态" prop="status">
                            <el-switch v-model="ruleFormData.status"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="座位数量" prop="seats">
                            <el-input v-model="ruleFormData.seats"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="品牌" prop="brand">
                            <el-input v-model="ruleFormData.brand"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="车辆照片" prop="carImage">
                            <el-upload
                                ref="uploadRef"
                                class="upload-demo"
                                :auto-upload="false"
                                :limit="1"
                                :on-change="handleFileChange"
                                :before-upload="beforeUpload"
                                accept=".jpg,.jpeg,.png"
                            >
                                <template #trigger>
                                    <el-button type="primary">选择图片</el-button>
                                </template>

                                <template #tip>
                                    <div class="el-upload__tip">
                                        jpg/png 格式图片，大小不超过 500KB
                                    </div>
                                </template>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">
                                提交
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped lang="less">
.uploadCarProductContainer {
    width: 100%;
    height: 100%;
}

.upload-form {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    :deep(.el-form-item__label) {
        font-weight: bold;
    }
}

.upload-demo {
    :deep(.el-upload-list) {
        margin-top: 10px;
    }
}
</style>