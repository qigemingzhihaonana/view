<template>
    <div class="task-start">
        <div class="head">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="项目编号">
                    <el-input v-model="itemNo" placeholder="项目编号"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="itemName" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="业务类型">
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
        <div class="table-task">
              <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column
                label="项目名称"
                width="200px"
                prop="itemName">
                </el-table-column>
                <el-table-column
                label="项目状态"
                width="150px"
                prop="name">
                </el-table-column>
                <el-table-column
                label="业务类型"
                width="200px"
                prop="businessType">
                </el-table-column>
                <el-table-column
                label="项目经理"
                width="100px"
                prop="managerUser">
                </el-table-column>
                <!-- <el-table-column
                label="流程步骤"
                prop="name">
                </el-table-column> -->
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
                    v-if="this.active !== 1 || this.active !== 2"
                    @click="handleEdit(scope.row)">查看项目详细信息</el-button>
                    <el-button
                    size="mini"
                    v-if="this.active !== 1 "
                    @click="handleStop(scope.row)" >挂起</el-button>
                    <el-button
                    v-if="this.active !== 1"
                    size="mini"
                    @click="handleStop(scope.row)" >激活</el-button>
                    <el-button
                    size="mini"
                    v-if="this.active === 1"
                    type="success"
                    @click="handleTask(scope.row)">设置流程</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%" :before-close="handleClose">
            <el-steps :active=active align-center process-status="wait" finish-status="success">
                <el-step title="项目立项" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="项目审批中" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step v-if="this.stop === false" title="项目运行中" description="这段就没那么长了"></el-step>
                <el-step v-if="this.stop === true" title="项目挂起" description="这段就没那么长了"></el-step>
            </el-steps>
			<el-form :disabled="show" label-position="left" rules="formRules" :model="form" inline ref="form">
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
				<el-button @click="dialogFormVisible == false">取消</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确定</el-button>
				<el-button v-else type="primary" @click="update('form')">确定</el-button>
			</div>
		</el-dialog>

    <el-dialog :title=taskName :visible.sync="dialogFormVisibleStopTask" width="60%" :before-close="handleClose">
        <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入项目挂起的原因"
            v-model="taskStopReason">
        </el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleStopTask == false">取消</el-button>
            <el-button type="primary" @click="sure">确定</el-button>
		</div>
    </el-dialog>

    <el-dialog title="流程设置" :visible.sync="dialogFormVisibleTask" width="60%" :before-close="handleCloseTask">

    </el-dialog>

    </div>
</template>

<script>
import { queryTask, addTask, editTask, stopTask, taskStep, } from '@/api/NewTask'
export default {
    data() {
        return {
            taskStopReason: '',
            show: false,
            active: 1,
            key: undefined,
            itemNo: '',
            itemName: '',
            businessType: '',
            stop: false,
            taskName: this.itemName,
            dialogFormVisibleStopTask: false,
            taskStopReason: undefined,
            form: {
                thirdContractNo: undefined,
                itemNo: undefined,
                customerType: undefined,
                businessType: undefined,
                sampleCkType: undefined,
                taskSource: undefined,
                managerUser: undefined,
                buildTime: undefined,
                planSum: undefined,
                planDate: undefined,
                currCostSum: undefined,
                currIncomeSum: undefined,
                thirdCostSum: undefined,
                invoiceSum: undefined,
                thirdContractNo: undefined
            },
            options: [],
            tableData: [],
            search: undefined,
            textMap: {
                create: '项目立项',
                edit: '编辑'
            },
            dialogStatus: undefined,
            dialogFormVisible: false,
            dialogFormVisibleTask: false,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
    },
    create() {
        this.onSubmit()
    },
    methods: {
        /**
         * 编辑
         */
        handleEdit(row) {
            this.dialogFormVisible = true
            console.log(row.procInstId)
            taskStep(row.procInstId).then(response => {
                console.log(response)
                this.active = response.data.data.code
                if (this.active !== 1) {
                    this.show = false
                }
            })
            this.dialogStatus = 'edit'
            this.form = Object.assign({}, row)
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        /**
         * 项目立项
         */
        add() {
            console.log(this.show)
            this.restForm()
            this.show = false
            console.log(this.show)
            this.dialogFormVisible = true
            this.dialogStatus = 'create'
             console.log(this.show)
            this.$nextTick(() => {
                this.$refs['form'].clearValidate
            })
        },
        /**
         * 格式化
         */
        restForm() {
            this.form = {
                thirdContractNo: undefined,
                itemNo: undefined,
                customerType: undefined,
                businessType: undefined,
                sampleCkType: undefined,
                taskSource: undefined,
                managerUser: undefined,
                buildTime: undefined,
                planSum: undefined,
                planDate: undefined,
                currCostSum: undefined,
                currIncomeSum: undefined,
                thirdCostSum: undefined,
                invoiceSum: undefined,
                thirdContractNo: undefined
            }
        },
        /**
         * 查询
         */
        onSubmit() {
            queryTask(this.itemNo, this.itemName, this.businessType).then(response => {
                console.log(response)
                if (response.data.data.length === 1 || response.data.data.length === undefined) {
                    const data = []
                    data.push(response.data.data)
                    this.tableData = data
                } else if (response.data.data.length === 0) {
                    this.$message({
                        type: 'error',
                        message: '没有项目启动'
                    })
                }
                this.tableData = response.data.data
                console.log(this.tableData)
            }) 
        },
        /**
         * 清除
         */
        clear() {
            this.itemNo = undefined,
            this.itemName = undefined,
            this.businessType = undefined
        },
        /**
         * 设置流程
         */
        handleTask(row) {
            this.dialogFormVisibleTask = true
        },
        handleClose() {
            this.dialogFormVisible = false
            this.restForm()
        },
        handleCloseTask() {
            this.dialogFormVisibleTask = false
        },
        /**
         * 提交项目信息
         */
        create() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    addTask(this.form).then(() => {
                        this.onSubmit()
                        this.dialogFormVisible = false
                        this.$message({
                            message: '项目创建成功，等待审批',
                            type: 'success'
                        })
                    })
                }
            })
        },
        /**
         * 修改项目信息
         */
        update() {
            this.$refs['form'].validate((valid) => {
                if(valid) {
                    editTask(this.form).then(() => {
                        this.onSubmit()
                        this.$message({
                            message: '项目修改成功，灯带审批',
                            type: 'message'
                        })
                        this.$nextTick(() => {
                            this.$refs['form'].clearValidate
                        })
                    })
                }
            })
        },
        /**
         * 弹出挂起项目提示
         */
        handleStop(row) {
            this.dialogFormVisibleStopTask = true
            this.taskStopReason = undefined
        },
        /**
         * 项目挂起
         */
        sure() {
            this.dialogFormVisibleStopTask = false
            stopTask(this.form.itemNo, taskStopReason).then(() => {
                this.onSubmit()
                this.$message({
                    type: 'success',
                    message: '项目已经挂起'
                })
            })
        }
    }
}
</script>

