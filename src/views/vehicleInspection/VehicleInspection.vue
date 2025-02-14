<script setup lang="ts">

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
                        <el-button link type="primary" size="small" @click="operationPayload(scope.row)">通过
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