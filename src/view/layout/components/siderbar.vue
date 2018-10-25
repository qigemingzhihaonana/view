<template>
  <div class="sidebar-container">
    <el-menu class="el-menu" 
            collapse-transition 
            :unique-opened="true" 
            router
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            :show-timeout="200"
            >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" centered>流程管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" route="">发布流程</el-menu-item>
          <el-menu-item index="1-2" route="">流程定义</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-55" route="">流程分类</el-menu-item>
          <el-menu-item index="1-254" route="">流程配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">流程历史</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-78" route="">流程实例</el-menu-item>
          <el-menu-item index="1-777" route="">流程节点</el-menu-item>
          <el-menu-item index="1-7845" route="">流程任务</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.sidebar-container {
    margin-top: 60px;
    transition: width 0.28s;
    width: 180px !important;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    //reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }
    .scrollbar-wrapper {
      overflow-x: hidden!important;
      .el-scrollbar__view {
        height: 60%;
      }
    }
    .el-scrollbar__bar.is-vertical{
      right: 0px;
    }
    .is-horizontal {
      display: none;
    }
    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }
    .svg-icon {
      margin-right: 16px;
    }
    .el-menu {
      border: none;
      height: 60%;
      width: 100% !important;
    }
  }
</style>
