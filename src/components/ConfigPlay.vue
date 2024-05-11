<template>
  <div class="configplay">
    <div class="configtable">
      <div class="insideconfig">
        <div class="allset">
          <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">添加系统角色</el-button>
          <el-dialog
              title="添加系统角色"
              :visible.sync="dialogVisible"
              width="50%"
              @close="resetForm">
            <el-form ref="addRoleForm" :model="newRole" label-width="120px">
              <el-form-item label="角色名称">
                <el-input v-model="newRole.rolename"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="newRole.describe"></el-input>
              </el-form-item>
              <!-- 更多表单项可根据实际需要添加 -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                     <el-button type="primary" @click="submitForm('addRoleForm')">确定</el-button>
              </span>
          </el-dialog>
        </div>
        <div class="playlist">
          <el-table
              ref="multipleTable"
              :data="rolenamelist"
              tooltip-effect="dark"
              style="width: 100%;border: 1px solid #ebeef5;"
              @selection-change="handleSelectionChange"
              max-height="550">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="rolename"
                label="角色名称"
                width="200">
            </el-table-column>
            <el-table-column
                prop="describe"
                label="角色描述"
                width="200">
            </el-table-column>
            <el-table-column
                prop="powers"
                label="角色权限配置"
                width="240">
              <template slot-scope="scope">
                <div v-for="(powerId, index) in scope.row.powers.split(',')" :key="index" class="poweritems">
                  {{ powerMapping[powerId] || '未知权限' }}{{ index < scope.row.powers.split(',').length - 1 ? ', ' : '' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="角色启用状态"
                width="140">
              <template slot-scope="scope">
                <span :class="{ 'green-dot': scope.row.status === 1, 'gray-dot': scope.row.status === 0 }"></span>
                {{ scope.row.status === 1 ? '启用中' : '停用中' }}
              </template>
            </el-table-column>
            <el-table-column
                prop="lasttime"
                label="最后编辑时间"
                sortable
                width="240">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="small"
                    circle
                    @click.native.prevent="deleteRow(scope.$index, rolenamelist)">
                </el-button>
                <el-button
                    :type="scope.row.status === 0 ? 'success' : ''"
                    :icon="scope.row.status === 0 ? 'el-icon-video-play' : 'el-icon-switch-button'"
                    size="small"
                    circle
                    @click="toggleStatus(scope.row.id, scope.row.status)">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="mangerpage">
            <div class="batch-actions">
              <el-button type="primary" @click="batchEnable">批量启用</el-button>
              <el-button type="danger" @click="batchDisable">批量停用</el-button>
              <el-button type="danger" @click="batchDelete">批量删除</el-button>
              <span>已选中 {{ multipleSelection.length }} 条</span>
            </div>
            <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                :current-page="currentPage"
                :page-size="pageSize"
                :page-sizes="[5, 10, 15, 20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {configlist, configset, stopconfigstatus, deleterole} from "../api/https";

export default {
  name: "ConfigPlay",
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getconfiglist(val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getconfiglist(val);
    },
    async batchEnable() {
      const selectedIds = this.multipleSelection.map(item => item.id);
      if (selectedIds.length === 0) {
        this.$message.warning('请至少选择一个系统角色进行启用操作');
        return;
      }
      try {
        await this.$confirm('确认批量启用所选系统角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const response = await stopconfigstatus({ids: selectedIds, status: 1});
        if (response.success) {
          this.$message.success('批量启用成功');
          this.getconfiglist(); // 刷新列表
        } else {
          this.$message.error(response.message || '批量启用失败');
        }
      } catch (error) {
        this.$message.error('操作取消或出现错误');
      }
    },
// 批量停用
    async batchDisable() {
      const selectedIds = this.multipleSelection.map(item => item.id);
      if (selectedIds.length === 0) {
        this.$message.warning('请至少选择一个系统角色进行停用操作');
        return;
      }
      try {
        await this.$confirm('确认批量停用所选系统角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const response = await stopconfigstatus({ids: selectedIds, status: 0});
        if (response.success) {
          this.$message.success('批量停用成功');
          this.getconfiglist(); // 刷新列表
        } else {
          this.$message.error(response.message || '批量停用失败');
        }
      } catch (error) {
        this.$message.error('操作取消或出现错误');
      }
    },
    batchDelete() {
      // 实现批量删除逻辑
    },
    showAddDialog() {
      this.dialogVisible = true;
    },
    // 重置表单
    resetForm() {
      this.$refs['addRoleForm'].resetFields();
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 在这里处理提交逻辑，例如调用API保存新角色
          console.log(this.newRole);
          this.$message.success('提交成功！');
          this.dialogVisible = false;
          // 可以在这里调用getconfiglist()方法刷新列表
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
    handleClick(row) {
      console.log(row);
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour}:${minute}:${second}`;
    },
    getconfiglist() {
      const lists = {
        page: this.currentPage,
        pagelimit: this.pageSize,
      }
      configlist(lists).then(res => {
        console.log(res)
        this.rolenamelist = res.data.data.map(item => ({
          ...item,
          lasttime: this.formatTimestamp(item.lasttime),
        }));
        this.total = res.data.pagecount;
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteRow(index, dataList) {
      const roleId = dataList[index].id;
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleterole(roleId).then(res => {
          console.log(res)
          if (res.success) {
            this.$message.success('删除成功！');
            this.getconfiglist();
          } else {
            this.$message.error(res.message || '删除失败！');
          }
        }).catch(err => {
          this.$message.error(err.message || '删除失败！');
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    async toggleStatus(id, currentStatus) {
      const confirmMessage = currentStatus === 1
          ? '是否停用该系统角色？'
          : '是否启用该系统角色？';
      try {
        const confirmResult = await this.$confirm(confirmMessage, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        if (confirmResult) {
          const newStatus = currentStatus === 1 ? 0 : 1;
          const response = await stopconfigstatus({id, status: newStatus});
          console.log(response);
          this.$message.success(currentStatus === 1 ? '系统角色已停用！' : '系统角色已启用！');
          this.getconfiglist();
        }
      } catch (error) {
        if (error !== 'cancel') {
          console.error(error);
          this.$message.error('操作失败，请重试！');
        }
      }
    },
  },
  mounted() {
    this.getconfiglist();
  },
  async created() {
    // 获取权限配置数据
    const permissionsResponse = await configset();
    const permissionsData = permissionsResponse.data.data;
    // 构建权限映射
    const powerMapping = {};
    permissionsData.forEach(permission => {
      powerMapping[permission.id] = permission.name;
    });
    this.powerMapping = powerMapping;
    // 获取角色列表数据
    this.getconfiglist();
  },
  data() {
    return {
      multipleSelection: [],
      rolenamelist: [],
      powerMapping: {},
      dialogVisible: false, // 控制对话框显示隐藏
      newRole: { // 新角色表单数据模型
        rolename: '',
        describe: '',
        // 其他表单项...
      },
      highlightedRowIndex: null,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的数量
      total: 0, // 总记录数
    }
  }
}
</script>

<style scoped>
.configplay {
  width: 96%;
  height: 740px;
  margin: 1% 2% 1% 2%;
  background-color: white;
}

.configtable {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.insideconfig {
  width: 96%;
  height: 100%;
  margin: 1% 2% 1% 2%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.allset {
  width: 100%;
  height: 10%;
  position: absolute;
  top: 20px;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}

.playlist {
  width: 100%;
  height: 88%;
  position: absolute;
  top: 100px;
  left: 0;
}

.green-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: lime; /* 绿色 */
  margin-right: 5px;
  vertical-align: middle;
}

.gray-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #c0c4cc; /* 灰色 */
  margin-right: 5px;
  vertical-align: middle;
}

.poweritems {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mangerpage {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 0;
}
</style>