<template>
  <div class="about">
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from '../components/AsideParts.vue'
import Header from '../components/HeaderParts.vue'

export default {
  name: 'AboutView',
  components: {
    Aside,
    Header
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.el-container{
  height: 100vh;
}
.el-header, .el-footer {
  background-color: white;
  color: #333;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  height: 100%;
  overflow: clip;
  overflow-y: auto;
}

.el-main {
  background-color: whitesmoke;
  color: #333;
  overflow: clip;
  overflow-y: auto;
  height: 100%;
}
</style>