<template>
	<div class="diction">
		<div class="dir-tree">
			<el-button-group>
				<el-button type="primary" icon="plus" @click="handlerAddTree">添加</el-button>
				<el-button type="primary" icon="edit" @click="handlerEditTree">编辑</el-button>
				<el-button type="primary" icon="delete" @click="handleDeleteTree">删除</el-button>
			</el-button-group>
				<el-tree
				:props="props" 
				:data="treeData" 
				node-key="id" 
				highlight-current 
				ref="menuTree" 
				@node-click="getNodeData">
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
					<el-table-column label="字段值" width="180">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<p>字段中文名: {{ scope.row.parm_name }}</p>
								<p>字段英文名: {{ scope.row.parm_name_en }}</p>
								<p>排序: {{ scope.row.parm_number }}</p>
								<p v-if="scope.row.is_show === '0'">是否有效: 有效 </p>
								<p v-if="scope.row.is_show === '1'">是否有效: 无效 </p>
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
			<el-form label-position="left" :model="form" inline :rules="rules" ref="form">
				<el-form-item label="字段值:" prop="dep_name">
					<el-input v-model="form.parm_value"></el-input>
				</el-form-item>
				<el-form-item label="字段中文值:" prop="dep_english_name">
					<el-input v-model="form.parm_name"></el-input>
				</el-form-item>
				<el-form-item label="字段英文值:" prop="dep_area">
					<el-input v-model="form.parm_name_en"></el-input>
				</el-form-item>
				<el-form-item label="排序:">
					<el-input v-model="form.parm_number"></el-input>
				</el-form-item>
				<el-form-item label="是否有效:">
					<el-select v-model="form.is_show">
						<el-option v-for="item in is_show" :key="item.key" :label="item.label" :value="item.value">
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

		<el-dialog :title="textMapT[dialogStatusT]" :visible.sync="dialof=gFormVisibleT" width="60%" :before-close="handleClose">
			<el-form label-position="left" :model="formTree" inline ：rules="ruleTree" ref="formTree">
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
		mapGetters
	} from 'vuex'
	export default {
		name: 'dirction',
		data() {
			return {
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
					parm_name: undefined,
					parm_name_en: undefined,
					parm_number: undefined,
					parm_value: undefined,
					is_show: '0'
				},
				is_show: [{
						label: '是',
						value: '0'
					},
					{
						label: '否',
						value: '1'
					}
				],
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
		computed: {
			...mapGetters([
				'treeData',
				'tableData',
				'myType'
			])
		},
		methods: {
			//初始化弹框
			restform() {
				this.form = {
					parm_name: undefined,
					parm_name_en: undefined,
					parm_number: undefined,
					parm_value: undefined,
					is_show: '0'
				}
			},
			//获取数据字典名称
			getTreeName() {
				this.$store.dispatch('GetTree')
			},
			//获取详细数据信息
			getNodeData(data) {
				console.log(data)
				this.currentId = data.id
				this.$store.dispatch('GetTreeMessage', this.currentId).then(() => {
					this.show = true
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
					confirmButtonText: '确定',
					cancelButtonText: '取消',
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
							message: '已取消删除'
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
				this.$store.dispatch('CreateNew', form).then(() => {
					this.$message({
						type: 'success',
						message: '创建成功!'
					});
				})
			},
			//更新
			update(form) {
				this.$store.dispatch('Update', form).then(() => {
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
				this.$store.dispatch('newTree', data).then(() => {
					this.$message({
						type: 'success',
						message: '新建成功!'
					})
				})
			},
			updateT(data) {
				this.$store.dispatch('updateTree', data).then(() => {
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
					this.restformT()
					this.dialogStatusT = 'create',
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
		flex: 1;
		background-color: aqua;

		.dir-main {
			position: absolute;
			overflow: auto;
		}
	}

</style>
