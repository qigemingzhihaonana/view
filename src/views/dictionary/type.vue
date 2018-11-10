<template>
	<div class="diction">
		<div class="dir-tree">
			<el-button-group>
				<el-button type="primary" icon="plus" @click="handlerAddTree">添加</el-button>
				<el-button type="primary" icon="edit" @click="handlerEditTree">编辑</el-button>
				<el-button type="primary" icon="delete" @click="handleDeleteTree">删除</el-button>
			</el-button-group>
			<el-tree :props="props" :data="treeData" node-key="id" highlight-current ref="menuTree" @node-click="getNodeData">
			</el-tree>
		</div>
		<div class="dir-main" v-show="show">
			<div class="topButton">
				<el-button-group>
					<el-button type="primary" icon="plus" @click="handlerAdd">新增字段</el-button>
				</el-button-group>
			</div>
			<div class="tableMessage">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column type="index" width="30">
					</el-table-column>
					<el-table-column label="创建时间" width="180">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.create_time }}</span>
						</template>
					</el-table-column>
					<el-table-column label="字段值" width="180">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<p>字段中文名: {{ scope.row.parm_type_name_cn }}</p>
								<p>字段英文名: {{ scope.row.parm_type_name }}</p>
								<p>更新时间: {{ scope.row.update_time }}</p>
								<p>更新人员: {{ scope.row.update_oper }}</p>
								<p>创建人员: {{ scope.row.create_oper }}</p>
								<div slot="reference" class="name-wrapper">
									<el-tag size="medium">{{ scope.row.parm_value }}</el-tag>
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
		</div>

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%" :before-close="handleClose">
			<el-form :label-position="labelPosition" :model="form" inline ref="form">
				<el-form-item label="字段中文值:">
					<el-input style="width: 150px" v-model="form.parm_type_name_cn"></el-input>
				</el-form-item>
				<el-form-item label="字段英文值:">
					<el-input style="width: 150px" v-model="form.parm_type_name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('form')">取消</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确定</el-button>
				<el-button v-else type="primary" @click="update('form')">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog :title="textMapT[dialogStatusT]" :visible.sync="dialogFormVisibleT" width="60%" :before-close="handleCloseT">
			<el-form :label-position="labelPosition" :model="formTree" inline ref="formTree">
				<el-form-item label="节点名称:">
					<el-input v-model="formTree.nodetype_name"></el-input>
				</el-form-item>
				<el-form-item label="节点描述">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
				<el-form-item label="类型:">
					<el-select v-model="formTree.parm_type" value-key="parm_type.id" placeholder="请选择">
						<el-option v-for="item in myType" :key="item.value" :label="item.parm_type" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelT('formTree')">取消</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="createT('formTree')">确定</el-button>
				<el-button v-else type="primary" @click="updateT('formTree')">确定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
import { 
    fetchMessage,
    fetchALLmessage,
    updatMessage,
    delectMessage,
    addMessage
 } from "@/api/type";
	export default {
		name: 'dirction',
		data() {
			return {
				optionForm: [],
				labelPosition: 'left',
				props: {
					label: 'name',
					id: 'id'
				},
				formTree: {
					nodetype_name: undefined,
					nodetype_desc: undefined,
					parm_type: undefined
				},
				currentId: -1,
				show: false,
				form: {
					id: undefined,
					parm_type_name: undefined,
					parm_type_name_cn: undefined,
				},
				textMap: {
					edit: '编辑',
					create: '创建'
				},
				textMapT: {
					edit: '编辑',
					create: '创建'
				},
				dialogStatus: undefined,
				dialogFormVisible: false,
				dialogStatusT: undefined,
				dialogFormVisibleT: false,
			}
		},
		created() {
			this.getTreeName()
		},
		methods: {
			handleClose() {
				this.dialogStatus = undefined,
					this.dialogFormVisible = false
			},
			handleCloseT() {
				this.dialogStatusT = undefined,
					this.dialogFormVisibleT = false
			},
			//初始化弹框
			restform() {
				this.form = {
					parm_type_name: undefined,
					parm_type_name_cn: undefined,
				}
			},
			//获取数据字典名称
			getTreeName() {
				fetchMessage().then(response => {
                    this.treeData = response.data.data
                })
			},
			//获取详细数据信息
			getNodeData(data) {
				console.log(data)
				this.currentId = data.id
				this.$store.dispatch('GetTreeMessage', this.currentId).then(() => {
					this.show = true
				})
				getparamType().then(response => {
					this.optionForm = response.data.data
				})
			},
			//编辑
			handleEdit(data) {
				this.form = Object.assign({}, data)
				this.dialogStatus = 'edit'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs.form.clearValidate()
				})
			},
			//删除
			handleDelete(data) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning',
					center: true
				}).then(() => {
					this.$store.dispatch('Delect', data.parm_value).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '出现故障，已取消删除'
						});
					});
				})
			},
			//取消
			cancel() {
				this.restform()
				this.dialogFormVisible = false
			},
			//新建提交
			create(form) {
				this.$store.dispatch('CreateNew', this.form).then(() => {
					this.dialogStatus = undefined
					this.dialogFormVisible  = false
					this.$message({
						type: 'success',
						message: '创建成功!'
					});
				})
			},
			//更新
			update(form) {
				this.$store.dispatch('Update', this.form).then(() => {
					this.dialogStatus = undefined
					this.dialogFormVisible = false
					this.$message({
						type: 'succss',
						message: '更新成功!'
					})
				})
			},
			//打开新建弹框
			handlerAdd() {
				this.restform()
				this.dialogStatus = 'create'
				this.dialogFormVisible = true
			},
			//新增数据字典
			handlerAddTree() {
				this.$store.dispatch('type')
				this.dialogStatusT = 'create',
				this.dialogFormVisibleT = true
			},
			//确认新建数字典
			cancelT() {
				this.restformT()
				this.dialogFormVisibleT = false
			},
			createT(data) {
				console.log(data)
				this.$store.dispatch('newTree', this.formTree).then(() => {
					this.dialogStatusT = undefined
					this.dialogFormVisible = false
					this.$message({
						type: 'success',
						message: '新建成功!'
					})
				})
			},
			updateT(data) {
				this.$store.dispatch('updateTree', this.formTree).then(() => {
					this.dialogStatusT = undefined
					this.dialogFormVisibleT = false
					this.$message({
						type: 'success',
						message: '更新成功'
					})
				})
			},

			//删除数据字典
			handleDeleteTree() {
				const id = this.currentId
				if (id !== -1) {
					this.$store.dispatch('delTree', id).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功'
						})
					})
				} else {
					this.$message({
						type: 'error',
						message: '请选择删除选项'
					})
				}
			},
			//编辑数据字典，只有基本信息
			handlerEditTree() {
				const id = this.currentId
				if (id !== -1) {
					console.log(id)
					const data = this.treeData.filter(word => (word.id === this.currentId))
					console.log(data[0])
					this.formTree = Object.assign({}, data[0])
					this.dialogStatusT = 'edit',
						this.dialogFormVisibleT = true
				} else {
					this.$message({
						type: 'error',
						message: '请选择更新选项'
					})
				}
			},
			restformT() {
				this.fotmTree = {
					nodetype_name: undefined,
					nodetype_desc: undefined,
					parm_type: '0'
				}
			}
		}
	}

</script>
<style lang="scss" scoped>
	.diction {
		display: flex;
		flex-direction: row;
		position: relative;
		flex-wrap: nowrap;

		.dir-main {
			margin-left: 300px;
			flex-direction: column;
			position: absolute;
			width: 600px;

			.tableMessage {
				margin-top: 20px;
			}
		}
	}

</style>
