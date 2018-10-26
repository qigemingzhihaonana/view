<template>
	<div class="head">
		<el-menu class="el-menu-demo" mode="horizontal" width="100%">
			<el-menu-item index="1">处理中心</el-menu-item>
			<el-submenu index="2">
				<template slot="title">我的工作台</template>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
				<el-menu-item index="2-3">选项3</el-menu-item>
				<el-submenu index="2-4">
					<template slot="title">选项4</template>
					<el-menu-item index="2-4-1">选项1</el-menu-item>
					<el-menu-item index="2-4-2">选项2</el-menu-item>
					<el-menu-item index="2-4-3">选项3</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="3" disabled>消息中心</el-menu-item>
			<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
		</el-menu>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				show: 123,
				activeName: 'fourth'
			}
		},
		created() {
			//      document.addEventListener('click', (e) => {
			//        if(!this.$el.contains(e.target)) {
			//          console.log(this.$el.contains(e.target))
			//          console.log(e.target.className)
			//          this.show = 456
			//        }
			//      })
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}

	}

</script>
<style lang="scss" scoped>
	.head {
		background-color: blue;
		width: 100%;
	}

</style>
