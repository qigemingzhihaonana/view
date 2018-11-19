<template>
    <div class="task-check">
        <div class="table-task">
              <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%">
                <el-table-column
                label="项目名称"
                prop="itemName">
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
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="check(scope.row)">查看详细信息</el-button>
                    <el-button
                    type="success"
                    size="mini"
                    @click="agree(scope.row)">通过</el-button>
                    <el-button
                    size="mini"
                    type="error"
                    @click="handleTask(scope.row)">驳回</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
            <div class="block">
                <el-pagination
                    v-show="tableData.length > 0"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
                </el-pagination>
            </div>
        <el-dialog title="项目信息" :visible.sync="dialogFormVisible" width="60%" :before-close="handleClose">
			<el-form :label-position="labelPosition" :disabled="true" rules="formRules" :model="form" inline ref="formNew">
				<el-form-item label="项目编号:" prop="itemNo">
					<el-input v-model="form.itemNo"></el-input>
				</el-form-item>
				<el-form-item label="项目名称:" prop="itemName">
					<el-input v-model="form.itemName"></el-input>
				</el-form-item>
				<el-form-item label="客户类型:" prop="customerType">
					<el-select v-model="form.customerType" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="业务类型:" prop="businessType">
					<el-select v-model="form.businessType" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="集团样品检测类型:" prop="sampleCkType">
					<el-input v-model="form.sampleCkType"></el-input>
				</el-form-item>
				<!-- <el-form-item label="委托单位:" prop="">
					<el-input v-model="form."></el-input>
				</el-form-item> -->
				<el-form-item label="任务来源:" prop="taskSource">
					<el-input v-model="form.taskSource"></el-input>
				</el-form-item>
				<el-form-item label="项目经理:" prop="managerUser">
					<el-input v-model="form.managerUser"></el-input>
				</el-form-item>
				<el-form-item label="立项时间:" prop="buildTime">
					<el-date-picker
                        v-model="form.buildTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
				</el-form-item>
				<el-form-item label="预估计收入(元):" prop="planSum">
					<el-input v-model="form.planSum"></el-input>
				</el-form-item>
				<el-form-item label="预计完成时间:" prop="planDate">
					<el-date-picker
                        v-model="form.planDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
				</el-form-item>
				<!-- <el-form-item label="项目限额(元):">
					<el-input v-model="formTree.nodetype_name"></el-input>
				</el-form-item> -->
				<el-form-item label="当前成本(元):">
					<el-input v-model="form.currCostSum"></el-input>
				</el-form-item>
				<el-form-item label="当前收入(元):">
					<el-input v-model="form.currIncomeSum"></el-input>
				</el-form-item>
				<el-form-item label="外协成本(元):">
					<el-input v-model="form.thirdCostSum"></el-input>
				</el-form-item>
				<el-form-item label="当前开票总金额(元):">
					<el-input v-model="form.invoiceSum"></el-input>
				</el-form-item>
				<el-form-item label="外协合同编号:">
					<el-input v-model="form.thirdContractNo"></el-input>
				</el-form-item>
				<!-- <el-form-item label="上传合同扫描:">
					


				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible == false">确定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
import { fetchTask, backTask, agreeTask } from '@/api/newTaskCheck'
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pagesize: 20,
            dialogFormVisible: false,

        }
    },
    method: {
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
        },
        /**
         * 查看详细信息
         */
        check(row) {
            this.form = Object.assign({},row)
            this.dialogFormVisible = true
        },
        /**
         * 驳回
         */
        handleTask(row) {
            backTask(row.itemNo).then(() => {
                this.$message({
                    message: '项目已驳回',
                    type: 'success'
                })
            })
        },
        /**
         * 同意项目通过
         */
        agree(row) {
            agreeTask(row.itemNo).then(() => {
                this.$message({
                    message: '项目已通过',
                    type: 'success'
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
