<template>
  <div class="head">
   <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">{{show}}</el-tab-pane>
   </el-tabs>
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
      document.addEventListener('click', (e) => {
        if(!this.$el.contains(e.target)) {
          console.log(this.$el.contains(e.target))
          console.log(e.target.className)
          this.show = 456
        }
      })
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
  background-color: blue
}
</style>
