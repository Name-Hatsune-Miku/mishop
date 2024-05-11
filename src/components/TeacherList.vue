<template>
  <div class="configplay">
    <el-breadcrumb separator="/" style="height: 50px;display: flex;align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
      <el-breadcrumb-item style="margin-left: 40px;font-weight: bolder">讲师管理</el-breadcrumb-item>
      <el-breadcrumb-item>讲师列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="configtable">
      <div class="insideconfig">
        <div class="allset">
          <div>
            <el-input placeholder="请输入姓名" v-model="searchname" clearable>
              <el-button slot="append" style="background-color: #67C23A;color: white" @click="forsearch">搜索</el-button>
            </el-input>
          </div>
          <el-button type="success" icon="el-icon-plus" @click="showAddDialog">添加讲师</el-button>
          <el-dialog
              title="添加讲师"
              :visible.sync="dialogVisible"
              width="50%"
              @close="resetForm">
            <el-form
                ref="addRoleForm"
                :model="newRole"
                :rules="roleRules"
                label-width="120px">
              <el-form-item prop="name" label="用户名">
                <el-input v-model="newRole.name"></el-input>
              </el-form-item>
              <el-form-item prop="nick" label="昵称">
                <el-input v-model="newRole.nick"></el-input>
              </el-form-item>
              <el-form-item prop="teachertype" label="讲师类别">
                <el-radio-group v-model="newRole.teachertype">
                  <el-radio label="1">讲师</el-radio>
                  <el-radio label="2">班主任</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="sex" label="性别">
                <el-radio-group v-model="newRole.sex">
                  <el-radio label="0">男</el-radio>
                  <el-radio label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="birthdata" label="出生日期">
                <el-date-picker
                    v-model="newRole.birthdata"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="iphone" label="手机号码">
                <el-input v-model.number="newRole.iphone"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                     <el-button type="primary" @click="submitForm('addRoleForm')">确定</el-button>
              </span>
          </el-dialog>
          <el-dialog
              title="编辑讲师"
              :visible.sync="editDialogVisible"
              width="50%"
              @close="resetEditForm">
            <el-form
                ref="editRoleForm"
                :model="editRole"
                :rules="roleRules"
                label-width="120px">
              <el-form-item prop="id" label="ID">
                <el-input v-model="editRoleId" disabled></el-input>
              </el-form-item>
              <el-form-item prop="name" label="用户名">
                <el-input v-model="editRole.name"></el-input>
              </el-form-item>
              <el-form-item prop="nick" label="昵称">
                <el-input v-model="editRole.nick" disabled></el-input>
              </el-form-item>
              <el-form-item prop="teachertype" label="讲师类别">
                <el-radio-group v-model="editRole.teachertype">
                  <el-radio label="1">讲师</el-radio>
                  <el-radio label="2">班主任</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="sex" label="性别">
                <el-radio-group v-model="editRole.sex">
                  <el-radio label="0">男</el-radio>
                  <el-radio label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="birthdata" label="出生日期">
                <el-date-picker
                    v-model="editRole.birthdata"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="iphone" label="手机号码" disabled>
                <el-input v-model.number="editRole.iphone"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="submitEditForm('editRoleForm')">保存</el-button>
  </span>
          </el-dialog>
        </div>
        <div class="playlist">
          <el-table
              ref="multipleTable"
              :data="rolenamelist"
              tooltip-effect="dark"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange">
            <el-table-column
                prop="id"
                label="编号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="nick"
                label="昵称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="teachertype"
                label="讲师类型"
                width="120">
              <template slot-scope="scope">
                {{ scope.row.teachertype === 1 ? '讲师' : '班主任' }}
              </template>
            </el-table-column>
            <el-table-column
                prop="birthdata"
                label="出生日期"
                width="240">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="100">
              <template slot-scope="scope">
                {{ scope.row.sex === 1 ? '女' : '男' }}
              </template>
            </el-table-column>
            <el-table-column
                prop="iphone"
                label="手机号码"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="deleteteachers(scope.row.id)">删除</el-button>
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="mangerpage">
            <el-pagination
                v-if="total > 10"
                layout="total, prev, pager, next, jumper"
                :total="total"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getteacherlist, addteacher, getsearch, deleteteacher, upteacher} from "../api/https";

export default {
  name: "TeacherList",
  methods: {
    handleEdit(row) {
      this.editRoleId = row.id;
      this.editRole = {...row};
      this.editDialogVisible = true;
    },
    resetEditForm() {
      this.$refs['editRoleForm'].resetFields();
      this.editDialogVisible = false;
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('编辑信息:', this.editRole)
          upteacher(this.editRole).then(res => {
            console.log(res)
            this.getconfiglist();
          })
          this.$message.success('编辑成功！');
          this.editDialogVisible = false;
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val)
      this.getconfiglist(val);
    },
    showAddDialog() {
      this.dialogVisible = true;
    },
    resetForm() {
      this.$refs['addRoleForm'].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.newRole);
          this.$message.success('提交成功！');
          this.dialogVisible = false;
          addteacher(this.newRole).then(res => {
            console.log(res)
            this.getconfiglist();
          })
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
    forsearch() {
      const search = {
        name: this.searchname,
      }
      console.log(search)
      getsearch(search).then(res => {
        console.log(res)
        this.rolenamelist = res.data.data;
        this.total = res.data.pagecount;
      })
    },
    deleteteachers(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteteacher(id).then(res => {
          console.log(res)
          if (res.code === 0) {
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
    handleClick(row) {
      console.log(row);
    },
    getconfiglist() {
      const page = {
        page: this.currentPage
      }
      console.log(page)
      getteacherlist(page).then(res => {
        console.log(res)
        this.rolenamelist = res.data.data;
        this.total = res.data.pagecount;
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  mounted() {
    this.getconfiglist();
  },
  data() {
    return {
      multipleSelection: [],
      rolenamelist: [],
      dialogVisible: false, // 控制对话框显示隐藏
      newRole: {
        name: '',
        nick: '',
        birthdata: '',
        sex: '',
        iphone: '',
        teachertype: '',
      },
      searchname: '',
      roleRules: {
        name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        nick: [{required: true, message: '请输入昵称', trigger: 'blur'}],
        teachertype: [{required: true, message: '请选择讲师类别', trigger: 'change'}],
        sex: [{required: true, message: '请选择性别', trigger: 'change'}],
        birthdata: [{required: true, message: '请选择出生日期', trigger: 'change'}],
        iphone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {required: true, message: '手机号格式不正确', trigger: 'blur'},
        ],
      },
      highlightedRowIndex: null,
      currentPage: 1, // 当前页码
      total: 0, // 总记录数
      editDialogVisible: false, // 控制编辑对话框的显示隐藏
      editRoleId: '', // 当前正在编辑的讲师ID
      editRole: {}, // 编辑模式下讲师的表单数据
    }
  }
}
</script>

<style scoped>
.configplay {
  width: 96%;
  height: 900px;
  margin: 1% 2% 1% 2%;
  background-color: white;
}

.configtable {
  width: 100%;
  height: 93%;
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
  height: 80%;
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
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>