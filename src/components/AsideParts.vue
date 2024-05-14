<template>
  <div class="aside">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
            default-active="/about/configplay"
            class="el-menu-vertical-demo menuaside"
            @open="handleOpen"
            @close="handleClose"
            background-color="#050A24"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
          <div class="asidetitle">
            <img src="../assets/img/logo.jpg" alt="" style="width: 36px;height: 56px">
            <h3>米话呼叫中心</h3>
          </div>
          <el-menu-item index="/about/index">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/about/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业管理</span>
          </el-menu-item>
          <el-menu-item index="/about/teacher">
            <i class="el-icon-s-order"></i>
            <span slot="title">讲师管理</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>通话统计</span>
            </template>
            <el-submenu index="2-1">
              <template slot="title">选项</template>
              <el-menu-item index="2-1-1">子选项</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-release"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/about/configplay">系统角色管理</el-menu-item>
              <el-menu-item index="/about/configuser">系统用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-set-up"></i>
              <span>系统配置</span>
            </template>
            <el-submenu index="4-1">
              <template slot="title">选项</template>
              <el-menu-item index="4-1-1">子选项</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-release"></i>
              <span>权限配置</span>
            </template>
            <el-submenu index="5-1">
              <template slot="title">选项</template>
              <el-menu-item index="5-1-1">子选项</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AsideParts",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.menuaside {
  height: 100vh;
}

.asidetitle {
  width: 100%;
  height: 80px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: white;
  font-size: 17px;
}
</style>