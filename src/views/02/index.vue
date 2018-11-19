<template>
	<div class="type-message">
		<div class="top-message">
			<el-input placeholder="客户类型" v-model="listQuery.sample_client" style="width: 200px;" @keyup.enter.native="handleFilter" />
			<el-input placeholder="检测类型" v-model="listQuery.business_type" style="width: 200px;" @keyup.enter.native="handleFilter" />
			<el-input placeholder="检测大类" v-model="listQuery.sample_sup_class" style="width: 200px;" @keyup.enter.native="handleFilter" />
			<el-input placeholder="规格型号" v-model="listQuery.sample_type" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
			<el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
			<el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
			<el-button :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
		</div>

		<div class="message">
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" v-loading="listLoading">
				<el-table-column prop="create_time" label="创建日期" width="150">
				</el-table-column>
				<el-table-column prop="create_oper" label="创建用户" width="150">
				</el-table-column>
				<el-table-column label="项目检测">
					<el-table-column prop="check_proj_type" label="检测项目类型" width="120">
					</el-table-column>
					<el-table-column label="检测基本信息">
						<el-table-column prop="check_sup_class" label="检测大类" width="120">
						</el-table-column>
						<el-table-column prop="check_class" label="检测小类" width="120">
						</el-table-column>
						<el-table-column prop="standard_request" label="标准要求" width="300">
						</el-table-column>
						<el-table-column prop="standard_day" label="检测天数" width="120">
						</el-table-column>
					</el-table-column>
					<el-table-column label="仪表信息">
						<el-table-column prop="dev_name" label="仪表名称" width="120">
						</el-table-column>
						<el-table-column prop="dev_type" label="仪表类型" width="120">
						</el-table-column>
						<el-table-column prop="dev_code" label="仪表编号" width="300">
						</el-table-column>
					</el-table-column>
					<el-table-column prop="date" label="更新日期" width="150">
					</el-table-column>
					<el-table-column prop="date" label="更新用户" width="150">
					</el-table-column>
				</el-table-column>
			</el-table>
		</div>

		<div>
			<el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
			</el-pagination>
		</div>
		<el-dialog title="新增检测" :visible.sync="dialogFormVisible" width="60%" :before-close="handleClose">
			<el-form v-loading="listLoading" :inline="true" :model="formNew" class="form-inline">
				<el-form-item label="检测类型">
					<el-input v-model="formNew.check_proj_type" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="客户类型">
					<el-input v-model="formNew.sample_client" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item>
					<el-upload class="upload-demo" drag action="/" :before-upload="beforeUpload" multiple ref="newupload" :auto-upload="false" accept=".xls, .xlsx" :on-change="newhandleChange">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em> </div>
						<div class="el-upload__tip" slot="tip">请注意您只能上传.xls .xlsx格式的文件</div>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="newSubmitForm('formNew')" class="yes-btn">
						确 定
					</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getMessage,
		addCheckStander,
		delectStander
	} from '@/api/02'
	export default {
		data() {
			return {
				dialogFormVisible: false,
				currentPage: 1,
				pagesize: 20,
				tableData: [],
				listQuery: {
					sample_client: undefined,
					check_proj_type: undefined,
					sample_sup_class: undefined,
					sample_type: undefined
				},
				listLoading: false,
				downloadLoading: false,
				formNew: {
					check_proj_type: undefined,
					sample_client: undefined
				}
			}
		},
		created() {
			this.handleFilter()
		},
		methods: {
			/*
			得到检测标准
			*/
			handleFilter() {
				this.listLoading = true
				getMessage(this.listQuery).then(response => {
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
					const data = []
					if (response.data.length !== undefined) {
						this.tableData = response.data.data
					} else {
						table.push(response.data.data)
						this.tableData = data
					}
				})
			},
			/*新增检测标准*/
			handleCreate() {
				this.dialogFormVisible = true
				this.restFormNew()
			},
			/*初始化上传*/
			restFormNew() {
				this.formNew = {
					check_proj_type: undefined,
					sample_client: undefined
				}
			},
			/*拦截文件上传，自定义格式*/
			beforeUpload(file) {
				/*将文件添加到自定义数据中*/
				this.listLoading = true
				let myFile = new FormData()
				console.log(file)
				myFile.append('file', file)
				myFile.append('check_proj_type', this.formNew.check_proj_type)
				myFile.append('sample_client', this.formNew.sample_client)
				addCheckStander(myFile).then(() => {
					this.newhandlesuccess()
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
				this.dialogFormVisible = false
				return true
				this.handleFilter()
			},
			/*导出文件*/
			handleDownload() {

			},
			handleSizeChange(size) {
				this.pagesize = size;
			},
			 handleCurrentChange(currentPage){
				this.currentPage = currentPage;
			},
			handleClose() {
				this.dialogFormVisible = false
				this.restFormNew()
			},
			newhandlesuccess() {
				 this.$message({
					message: '文件上传成功',
					type: 'success'
					});
			}
		}
	}

</script>
