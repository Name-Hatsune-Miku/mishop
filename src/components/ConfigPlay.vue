<template>
  <div class="configplay">
    <div class="configtable">
      <div class="insideconfig">
        <div class="allset">
          <div style="display: flex;align-items: center;width: 550px;justify-content: space-between">
            <el-dropdown size="medium" split-button type="primary" @command="handleStatusSelect" @click="getconfiglist">
              角色状态
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">启用中</el-dropdown-item>
                <el-dropdown-item command="0">停用中</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div>
              <el-input placeholder="请输入系统角色名进行模糊查找" clearable v-model="getsearchroles" style="width: 400px">
                <el-button slot="append" icon="el-icon-search" @click="searchroles"></el-button>
              </el-input>
            </div>
          </div>
          <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">添加系统角色</el-button>
          <el-dialog
              title="添加系统角色"
              :visible.sync="dialogVisible"
              width="55%"
              @close="resetForm"
          >
            <el-form ref="addRoleForm" :model="newRole" label-width="120px" :rules="rules">
              <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="newRole.rolename"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="newRole.describe"></el-input>
              </el-form-item>
              <el-form-item label="角色权限" prop="powers">
                <el-select v-model="newRole.powers" multiple placeholder="请选择权限" style="width: 100%;">
                  <el-option
                      v-for="permission in permissionsData"
                      :key="permission.id"
                      :label="permission.name"
                      :value="permission.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否启用" prop="status">
                <el-radio-group v-model="newRole.status">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="0">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="submitForm('addRoleForm')">确定</el-button>
  </span>
          </el-dialog>


          <el-dialog
              title="编辑系统角色"
              :visible.sync="editdialogVisible"
              width="55%"
              @close="editresetForm"
          >
            <el-form ref="editRoleForm" :model="editRole" label-width="120px" :rules="rule">
              <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="editRole.rolename"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="editRole.describe"></el-input>
              </el-form-item>
              <el-form-item label="角色权限" prop="powers">
                <el-select v-model="editRole.powers" multiple placeholder="请选择权限" style="width: 100%;">
                  <el-option
                      v-for="permission in permissionsData"
                      :key="permission.id"
                      :label="permission.name"
                      :value="permission.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否启用" prop="status">
                <el-radio-group v-model="editRole.status">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="0">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取消</el-button>
    <el-button type="primary" @click="editsubmitForm('editRoleForm')">确定</el-button>
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
                width="280">
              <template slot-scope="scope">
                <div class="power-container">
                  <div v-for="(powerId, index) in scope.row.powers.split(',')" :key="index" class="power-item"
                       v-show="index < maxDisplayedPowers">
                    {{
                      powerMapping[powerId] || '未知权限'
                    }}{{ index < scope.row.powers.split(',').length - 1 && index < maxDisplayedPowers - 1 ? '、 ' : '' }}
                  </div>
                  <div v-if="scope.row.powers.split(',').length > maxDisplayedPowers" class="ellipsis">...</div>
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
                label="最后编辑时间"
                sortable
                width="240">
              <template slot-scope="scope">
                {{ formatTimestamp(scope.row.lasttime) }}
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="small" circle
                           @click.native.prevent="handleClick(scope.row.id)"></el-button>
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
                :pager-count="5"
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
import {
  configlist,
  configset,
  stopconfigstatus,
  deleterole,
  addroles,
  getrolesbyid,
  uproles,
  getsearchroles
} from "../api/https";

export default {
  name: "ConfigPlay",
  methods: {
    handleStatusSelect(status) {
      this.statusFilter = status;
      this.searchroles();
    },
    searchroles() {
      let searchCriteria = {
        rolename: this.getsearchroles,
      };
      if (this.statusFilter !== undefined) {
        searchCriteria.status = this.statusFilter;
      }
      getsearchroles(searchCriteria).then(res => {
        // console.log(res);
        this.rolenamelist = res.data.data
        this.total = res.data.pagecount;
      });
    },
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
    editresetForm() {
      this.$refs['editRoleForm'].resetFields();
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将选中的权限ID拼接成逗号分隔的字符串
          const powers = this.newRole.powers.join(',');
          const addroleslist = {
            rolename: this.newRole.rolename,
            describe: this.newRole.describe,
            powers: powers,
            status: this.newRole.status,
          }
          addroles(addroleslist).then(res => {
            console.log(res)
            this.getconfiglist();
          })
          console.log(this.newRole);
          this.$message.success('提交成功！');
          this.dialogVisible = false;
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const powers = this.editRole.powers.join(',');
          const editroleslist = {
            id: this.editRole.id,
            rolename: this.editRole.rolename,
            describe: this.editRole.describe,
            powers: powers,
            status: this.editRole.status,
          }
          uproles(editroleslist).then(res => {
            console.log(res)
            this.getconfiglist();
          })
          console.log(this.newRole);
          this.$message.success('更新成功！');
          this.editdialogVisible = false;
        } else {
          console.log('更新失败');
          return false;
        }
      });
    },
    handleClick(id) {
      this.editdialogVisible = true;
      // console.log(id);
      getrolesbyid(id).then(res => {
        // console.log(res);
        this.editRole = res.data;
        this.editRole.powers = res.data.powers.split(',').map(value => {
          // 尝试解析为数字
          const id = parseInt(value);
          if (!isNaN(id)) {
            // 如果是数字，则尝试在权限数据中找到对应的权限
            const permission = this.permissionsData.find(permission => permission.id === id);
            return permission ? id : null;
          } else {
            // 如果无法解析为数字，则不进行数据回显，返回 null
            return null;
          }
        }).filter(id => id !== null); // 过滤掉 null 值，即未知权限
      });
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
        // console.log(res)
        this.rolenamelist = res.data.data
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
          if (res.code === 2) {
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
    // console.log(permissionsData)
    this.permissionsData = permissionsData;
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
        powers: '',
        status: '',
      },
      highlightedRowIndex: null,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的数量
      total: 0, // 总记录数
      rules: {
        rolename: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        powers: [{required: true, message: '请输入角色权限', trigger: 'blur'}],
        status: [{required: true, message: '请输入角色状态', trigger: 'blur'}],
      },
      permissionsData: [],
      maxDisplayedPowers: 3,
      editdialogVisible: false,
      editRole: {
        id: '',
        rolename: '',
        describe: '',
        powers: '',
        status: '',
      },
      rule: {
        rolename: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        powers: [{required: true, message: '请输入角色权限', trigger: 'blur'}],
        status: [{required: true, message: '请输入角色状态', trigger: 'blur'}],
      },
      getsearchroles: '',
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
  justify-content: space-between;
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

.power-container {
  display: inline-block;
}

.power-item {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ellipsis {
  display: inline-block;
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

.el-dropdown {
  vertical-align: top;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>