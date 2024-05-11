<template>
  <div class="index">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="demo-tabs">
      <el-tab-pane label="企业数据" name="first">
        <p style="background-color: whitesmoke;width: 100%;height: 100vh">
          <UserList></UserList>
        </p>
      </el-tab-pane>
      <el-tab-pane label="服务器数据" name="second">
        <p style="background-color: whitesmoke;width: 100%;height: 100vh">
          <ConfigForm></ConfigForm>
        </p>
      </el-tab-pane>
      <el-tab-pane label="省份数据" name="third">
        <p style="background-color: whitesmoke;width: 100%;height: 100vh">
          <RoleList></RoleList>
        </p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserList from "../components/UserList";
import ConfigForm from "../components/ConfigForm";
import RoleList from "../components/RoleList";

export default {
  name: "IndexPage",
  components: {
    RoleList,
    ConfigForm,
    UserList
  },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
}
</script>

<style scoped>
.demo-tabs {
  box-sizing: border-box;
  margin-top: 1px;
  padding: 10px;
  background-color: white;
}
</style>