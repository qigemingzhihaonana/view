<template>
  <div class="wrapper">
    <div class="head-wraper">
      <my-head background-color="red"></my-head>
    </div>

    <div class="body-wrapper">
			<sidebar class="pane-wraper"/>
      <main-app class="canvas-wrapper"/>
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
		width: 100%;
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
				flex: 1;
				position: relative;

      }
    }
  }
</style>
