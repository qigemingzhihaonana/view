<template>
	<div class="task-set">
		<div class="top-set">
			<el-form :inline="true" class="form-inline">
				<el-form-item label="审批人">
					<el-input v-model="user" placeholder="流程类型"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="delect">删除</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="set-main">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" label width="55">
				</el-table-column>
				<el-table-column label="序号" width="120">
					<template slot-scope="scope">
						<el-tag size="medium">{{ scope.row. }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="流程名称" width="120">
					<template slot-scope="scope">
						<el-tag size="medium">{{ scope.row. }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope" width="80">
						<el-tag size="medium">{{ scope.row. }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="办理人" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-tag size="medium">{{ scope.row. }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="下一流程">
					<template slot-scope="scope">
						<el-tag size="medium">{{ scope.row. }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	export function {
		data() {
			return {
				user: undefined,
				tableData: [],

			}
		}
	}

</script>
<style lang="scss" scoped>

</style>
