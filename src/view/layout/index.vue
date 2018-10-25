<template>
  <div class="wrapper">
    <div class="head-wraper">
      <my-head background-color="red"></my-head>
    </div>

    <div class="body-wrapper">
      <main-app class="canvas-wrapper"/>
      <!-- <sidebar class="pane-wraper"/> -->
    </div>
  </div>
</template>
<script>
import MyHead from "./components/head"
import MainApp from "./components/main"
import Sidebar from "./components/siderbar"
export default {
  components: {
    MyHead,
    MainApp,
    Sidebar
  }
}
</script>
<style lang="scss" scoped>
  .wrapper{
    display: flex;
    flex-direction: column;
    position: fixed;
    .head-wrapper {
      display: flex;
      
    }
    .body-wrapper {
      display: flex;
      flex-direction: row;
      flex: 1;
      .canvas-wrapper {
        display: flex;
        flex-direction: row;
        flex: 1;
        background-color:blueviolet
      }
    }
  }
</style>
