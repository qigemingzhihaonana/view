<template>
	<div>
		<div class="topInput">
			<el-select v-model="bpmn" placeholder="请选择">
				<el-option v-for="item in bpmnOptions" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button-group>
				<el-button type="primary" icon="plus" @click="handlerAdd">新增节点</el-button>
			</el-button-group>
		</div>
		<div class="tab-main">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="是否公用" width="120">
					<template slot-scope="scope">
						<el-popover trigger="hover">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium" v-if="scope.row.a === '0'">是</el-tag>
								<el-tag size="medium" v-if="scope.row.a === '0'">否</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="节点名称" width="120">
					<template slot-scope="scope">
						<el-popover trigger="hover">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{scope.row.}}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="流程名称" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-popover trigger="hover">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{scope.row.}}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="关联业务类型" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-popover trigger="hover">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{scope.row.}}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%" :before-close="handleCloseT">
			<el-form :label-position="labelPosition" :model="form" inline ref="formTree">
				<el-form-item label="业务类型:">
					<el-input v-model="form.nodetype_name"></el-input>
				</el-form-item>
				<el-form-item label="节点名称">
					<el-input v-model="form.nodetype_desc"></el-input>
				</el-form-item>
				<el-form-item label="流程名称">
					<el-input v-model="form.nodetype_desc"></el-input>
				</el-form-item>
				<el-form-item label="关联业务类型:">
					<el-select v-model="form.parm_type" value-key="parm_type.id" placeholder="请选择">
						<el-option v-for="item in myType" :key="item.value" :label="item.parm_type" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否公用:">
					<el-select v-model="form.parm_type" value-key="parm_type.id" placeholder="请选择">
						<el-option v-for="item in myType" :key="item.value" :label="item.parm_type" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('form')">取消</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确定</el-button>
				<el-button v-else type="primary" @click="update('form')">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {

				},
				dialogFormVisible: false,
				textMap: {
					create: '新建',
					edit: '编辑'
				},
				dialogStatus: undefined,
				bpmnOptions: [],
				bpmn: undefined
			}
		},
		methods: {
			/**
			 * 格式化
			 */
			restForm() {
				this.form = {

				}
			},
			/**
			 * 新增
			 */
			handlerAdd() {
				this.dialogFormVisible = true
				this.dialogStatus = 'create'
				this.restForm()
			},
			/**
			 * 删除流程的节点
			 */
			handleDelete(data) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {

					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
			},
			/**
			 * 编辑节点
			 */
			handleEdit(data) {
				this.form = Object.assign({}, data)
				this.dialogFormVisible = true
				this.dialogStatus = 'edit'
			},

		}
	}

</script>


<style lang="scss" scoped>

</style>
