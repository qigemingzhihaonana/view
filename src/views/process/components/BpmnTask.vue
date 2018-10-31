<template>
  <div class="task">
    <div class="topInput">
      <el-select v-model="bpmn" placeholder="请选择">
        <el-option
          v-for="item in bpmnOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button-group>
				<el-button type="primary" icon="plus" @click="handlerAdd">新增节点</el-button>
			</el-button-group>
    </div>

     <div class="tab-main">
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="节点ID"
          width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" >{{scope.row.}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="节点名称"
          width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" >{{scope.row.}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="对用表名"
          width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" >{{scope.row.}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="表主键"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" >{{scope.row.}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="链接"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" >{{scope.row.}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" >{{scope.row.}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%" :before-close="handleCloseT">
			<el-form :label-position="labelPosition" :model="form" inline ref="formTree">
				<el-form-item label="流程节点ID:">
					<el-input v-model="formTree.nodetype_name"></el-input>
				</el-form-item>
				<el-form-item label="流程节点名称">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
				<el-form-item label="排序">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
        <el-form-item label="业务类型:">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
        <el-form-item label="对应表名:">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
        <el-form-item label="对应表主键:">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
        <el-form-item label="链接:">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
        <el-form-item label="对应的外键:">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
        <el-form-item label="对应的序列名称:">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
        <el-form-item label="流程分组名称:">
					<el-input v-model="formTree.nodetype_desc"></el-input>
				</el-form-item>
        <el-form-item label="是否可汇总:">
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
      currentPage: 1,
      pagesize: 20,
      dialogFormVisible: false,
      textMap: {
        create: '新建',
        edit: '编辑'
      },
      dialogStatus: undefined
    }
  },
  methods: {
    handleSizeChange(size) {
        this.pagesize = size;
    },
    handleCurrentChange(currentPage){
        this.currentPage = currentPage;
    },
    cancel() {
      this.restform()
      this.dialogFormVisible = false
    },
    create(data) {

    },
    update(data) {

    },
    handleEdit(data) {
      this.form = Object.assign({}, data)
      this.dialogFormVisible = true
      this.dialogStatus = 'edit'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
