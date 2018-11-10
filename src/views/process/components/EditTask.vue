<template>
    <div class="edit-task">
        <div class="select">
            <el-select v-model="value" :change="fetchTaskEditMessage" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="task-message">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="节点ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="节点类型"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="域ID">
                </el-table-column>
                <el-table-column
                prop="address"
                label="域名称">
                </el-table-column>
                <el-table-column
                prop="address"
                label="域名称(英文)">
                </el-table-column>
                <el-table-column
                prop="address"
                label="备注">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" size="small">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%" :before-close="handleCloseT">
            	<el-form :label-position="labelPosition" :model="form" inline ref="form" :rules="rules">
                    <el-form-item label="节点ID:">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in optionsTaskId"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="节点类型:">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in optionsTakType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="域ID:">
                        <el-input v-model="formTree.nodetype_name"></el-input>
                    </el-form-item>
                    <el-form-item label="域名称:">
                        <el-input v-model="formTree.nodetype_name"></el-input>
                    </el-form-item>
                    <el-form-item label="域名称(英文):">
                        <el-input v-model="formTree.nodetype_name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input v-model="formTree.nodetype_name"></el-input>
                    </el-form-item>
            	</el-form>
        </el-dialog>
    </div>
</template>
<script>
import { fetch, addTaskEdit, updateTaskEdit, deleTaskEdit } from '@/api/EditTask'
export default {
    data() {
        return {
            tableData: [],
            options: [
                {
                    value: '0',
                    label: '项目管理'
                },
                {
                    value: '1',
                    label: '样品管理'
                },
                {
                    value: '2',
                    label: '订单管理'
                }
            ],
            optionsTaskId: [],
            optionsTakType: [],
            textMap: {
                edit: '编辑',
                create: '新增'
            },
            dialogStatus: undefined,
            dialogFormVisible: false,
            form: {

            }
        }
    },
    create() {
        this.fetchTaskEditMessage()
    },
    methods: {
        fetchTaskEditMessage() {
            fetch(id).then( response => {
                console.info(response)
                this.tableData = response.data.data
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.edit-task {
    display: flex;
    flex-direction: column;
    .select {
        
    }
}
</style>


