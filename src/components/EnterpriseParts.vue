<template>
  <div class="enterprise">
    <!--    超级企业管理列表-->
    <div class="curebox">
      <div class="enterpriselist">
        <div class="titlecontxt">
          <h3 class="one">超级企业列表 ({{ num }})</h3>
          <div class="searchbox">
            <input placeholder="请输入内容" v-model="input" class="search" @change="serchprise(input)">
            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true" class="btn" size="mini">
            </el-button>
            <el-dialog
                title="新增超级企业"
                :visible.sync="dialogVisible"
                width="42%"
            >
              <el-form ref="enterpriseForm" :model="enterprises" :rules="rules" label-width="160px">
                <el-form-item label="超级企业名称" prop="ename" style="width: 500px;margin:20px auto">
                  <el-input v-model="enterprises.ename"></el-input>
                </el-form-item>
                <el-form-item label="企业域名" prop="ipstr" style="width: 500px;margin:20px auto">
                  <el-input v-model="enterprises.ipstr">
                    <template slot="append">.emicloud.com</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="超级管理员账号" prop="adminname" style="width: 500px;margin:20px auto">
                  <el-input v-model="enterprises.adminname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="adminemil" style="width: 500px;margin:20px auto">
                  <el-input v-model="enterprises.adminemil"></el-input>
                </el-form-item>
                <el-form-item label="最大坐席数" style="width: 500px;margin:20px auto">
                  <el-input v-model="enterprises.maxnum"></el-input>
                </el-form-item>
                <el-form-item label="最大登录并发总数" style="width: 500px;margin:20px auto">
                  <el-input v-model="enterprises.maxconcurrency"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="submitForm('enterpriseForm')">保存</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </div>
        <div class="alllist">
          <ul>
            <li
                v-for="(item, index) in enterpriselist"
                :key="index"
                class="lists"
                :class="{ active: selectedEnterprise === item }"
                @click="handleItemClick(item)">
              <span :class="{ 'active-dot': item.status === 1, 'inactive-dot': item.status === 0 }">&#9679;</span>
              <span style="color: gray">{{ item.ename }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="enterprisecontent">
        <div class="contents">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>超级企业信息 <i class="el-icon-edit" style="font-size: 20px"></i></span>
              <div class="btns">
                当前超级企业为{{ enterpriseStatusText }}
                <el-button @click="toggleEnterpriseStatus" style="float: right; padding: 3px 0" type="text">
                  {{ toggleButtonText }}
                </el-button>
              </div>
            </div>
            <div>
              <el-descriptions :column="2">
                <el-descriptions-item label="超级企业名称">
                  <template slot="label">
                    <span class="required">*</span>超级企业名称
                  </template>
                  <strong class="black-text">{{ enterprise.ename }}</strong>
                </el-descriptions-item>
                <el-descriptions-item label="超级企业ID"><strong class="black-text">{{ enterprise.id }}</strong>
                </el-descriptions-item>
                <el-descriptions-item label="企业域名">
                  <template slot="label">
                    <span class="required">*</span>企业域名
                  </template>
                  <strong class="black-text">{{ enterprise.ipstr }}</strong>
                </el-descriptions-item>
                <el-descriptions-item label="最大坐席数"><strong class="black-text">{{ enterprise.maxnum }}</strong>
                </el-descriptions-item>
                <el-descriptions-item label="超级管理员账号">
                  <template slot="label">
                    <span class="required">*</span>超级管理员账号
                  </template>
                  <strong class="black-text">{{ enterprise.adminname }}</strong>
                </el-descriptions-item>
                <el-descriptions-item label="最大登录并发总数"><strong class="black-text">{{
                    enterprise.maxconcurrency
                  }}</strong></el-descriptions-item>
                <el-descriptions-item label="邮箱">
                  <template slot="label">
                    <span class="required">*</span>邮箱
                  </template>
                  <strong class="black-text">{{ enterprise.adminemil }}</strong>
                </el-descriptions-item>
                <el-descriptions-item label="创建时间"><strong class="black-text">{{ formattedCreateTime }}</strong>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getenterprise, getenterprisedata, editenterprisestatus, addenterprisedata,sercheeterpriseonly} from '../api/https'

export default {
  name: "EnterpriseParts",
  data() {
    return {
      num: '',
      enterpriselist: [],
      input: '',
      selectedEnterprise: null,
      enterprise: {
        status: '',
        ename: '',
        id: '',
        ipstr: '',
        maxnum: '',
        adminname: '',
        maxconcurrency: '',
        adminemil: '',
      },
      dialogVisible: false,
      enterprises: {
        ename: '',
        ipstr: '',
        adminname: '',
        adminemil: '',
        maxnum: '',
        maxconcurrency: '',
      },
      rules: {
        ename: [{required: true, message: '请输入超级企业名称', trigger: 'blur'}],
        ipstr: [{required: true, message: '请输入企业域名', trigger: 'blur'}],
        adminname: [{required: true, message: '请输入超级管理员账号', trigger: 'blur'}],
        adminemil: [{required: true, message: '请输入邮箱', trigger: 'blur'}]
      },
    }
  },
  mounted() {
    this.getEnterprise();
  },
  methods: {
    getEnterprise() {
      getenterprise().then(res => {
        this.num = res.data.data.length;
        this.enterpriselist = res.data.data;
      })
    },
    handleItemClick(item) {
      this.selectedEnterprise = item;
      let id = item.id;
      getenterprisedata(id).then(res => {
        this.enterprise = res.data;
      })
    },
    addenterprise() {
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 这里执行提交逻辑，比如调用API保存数据
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.dialogVisible = false;
          addenterprisedata(this.enterprises).then(res => {
            console.log(res)
            this.getEnterprise();
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    toggleEnterpriseStatus() {
      this.$alert('确认要停用或启用该企业吗？', '企业管理', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          this.$message({
            type: 'success',
            message: `action: ${action}`,
          })
          if (action === 'confirm') {
            const editstats = {
              id: this.enterprise.id,
              status: this.enterprise.status === 1 ? 0 : 1
            };
            editenterprisestatus(editstats).then(res => {
              console.log(res)
              this.getEnterprise();
            })
          }
        }
      });
    },
    serchprise(){
      sercheeterpriseonly(this.input).then(res=>{
        console.log(res)
        this.enterpriselist=res.data.data
      })
    }
  },
  computed: {
    formattedCreateTime() {
      const timestamp = this.enterprise.create_time;
      if (timestamp) {
        const date = new Date(timestamp * 1000);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      } else {
        return '';
      }
    },
    enterpriseStatusText() {
      return this.enterprise.status === 1 ? '启用状态' : '停用状态';
    },
    toggleButtonText() {
      return this.enterprise.status === 1 ? '停用超级企业' : '启用超级企业';
    },
  }
}
</script>

<style scoped>
.enterprise {
  width: 100%;
  height: 100vh;
}

.curebox {
  width: 100%;
  height: 100vh;
  display: flex;
}

.enterpriselist {
  width: 260px;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  border-top: 1px solid gainsboro;
  overflow-y: auto;
}

.enterprisecontent {
  width: 1192px;
  height: 100%;
  background-color: #DFDFDF;
  padding: 20px;
  box-sizing: border-box;
}

.contents {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-y: auto;
}

.titlecontxt {
  width: 100%;
  height: 120px;
  border-bottom: 1px solid gainsboro;
}

.one {
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 18px;
  text-indent: 2rem;
}

.alllist {
  width: 100%;
}

.lists {
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 13px;
  text-indent: 1rem;
  border-bottom: 1px solid gainsboro;
}

.active-dot {
  font-size: 16px;
  color: lime;
  margin-right: 1px;
}

.inactive-dot {
  font-size: 16px;
  color: red;
  margin-right: 1px;
}

.searchbox {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search {
  margin-left: 20px;
  width: 160px;
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  outline: 0;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

#dot {
  margin-left: 20px;
}

.lists:hover,
.lists.active {
  background-color: skyblue;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  display: flex;
  justify-content: space-between;
}

.box-card {
  width: 1000px;
  margin: 20px auto;
}

.required {
  color: red;
  margin-right: 4px;
}

.black-text {
  color: black;
}
</style>