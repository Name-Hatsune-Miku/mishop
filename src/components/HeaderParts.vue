<template>
  <div class="header">
    <a id="iconbtn" class="el-icon-s-fold" href="javascript:;"></a>
    <div style="width: 160px;height: 60px;">
      <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <div class="demo-type">
                        <div>
                            <el-avatar
                                src="https://tse4-mm.cn.bing.net/th/id/OIP-C.j7xx5Sw-S1bqRgpnEOZe_AHaHZ?w=213&h=212&c=7&r=0&o=5&dpr=1.5&pid=1.7"></el-avatar>
                        </div>
                    </div>
                </span>
        <el-dropdown-menu slot="dropdown" style="width: 180px;">
          <el-dropdown-item icon="el-icon-edit" command="个人信息">个人信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-operation" command="退出登录！"
                            @click.native="quitLogin()">退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>


export default {
  name: 'HeaderPage',
  methods: {
    handleCommand(command) {
      this.$message(`${command}`)
    },
    // 点击确定后返回登录页面
    quitLogin() {
      this.$alert('确认要退出登录吗？', '退出登录', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`,
          })
          if (action === 'confirm') {
            this.$router.push('/login')
          }
        }
      });
    }
  },
}
</script>
<style scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}

* {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

#iconbtn {
  font-size: 26px;
  width: 60px;
  height: 60px;
  border: 1px solid gainsboro;
  box-sizing: border-box;
  background-color: white;
  coursor: pointer;
}
</style>
