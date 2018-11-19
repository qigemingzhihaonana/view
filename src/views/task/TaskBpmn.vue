<template>
    <div class="head">
        <div class="approval-process">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="样品编号">
                    <el-input v-model="itemNo" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="样品名称">
                    <el-input v-model="itemName" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="样品类型">
                    <el-select v-model="businessType" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="clear">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="button-group">
            <el-button type="primary" @click="add">新增</el-button>
        </div>

        <div class="table-process">
            <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column
                label="项目名称"
                prop="date">
                </el-table-column>
                <el-table-column
                label="项目状态"
                prop="name">
                </el-table-column>
                <el-table-column
                label="业务类型"
                prop="name">
                </el-table-column>
                <el-table-column
                label="项目经理"
                prop="name">
                </el-table-column>
                <el-table-column
                label="流程步骤"
                prop="name">
                </el-table-column>
                <el-table-column
                align="right">
                <template slot="header" slot-scope="slot">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="success"
                    @click="handleTask(scope.row)">设置流程</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>

</style>
