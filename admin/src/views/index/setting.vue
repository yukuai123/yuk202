<template>
  <div class="setting">
    <div class="setting-box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input disabled type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input disabled type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="博客名" prop="blobname">
          <el-input type="text" v-model="ruleForm.blobname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="签名" prop="sign">
          <el-input type="text" v-model="ruleForm.sign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { changeSetting, getUserInfo } from '@/util/apiMethods'
  export default {
    name: "setting",
    data() {
      return {
        ruleForm: {
          password: '',
          username: '',
          sign: '',
          blobname: '',
        },
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '请输入签名', trigger: 'blur' }
          ],
          blobname: [
            { required: true, message: '请输入博客名', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$confirm('请确认修改 ：）').then(()=>{
             this.ruleForm.id = 1;
             this.modifyInfo();
           }).catch(err =>{
              console.log(err);
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },

    modifyInfo(){
      changeSetting(this, this.ruleForm,  (res, err)=> {
        if (err) return console.log(err);
        this.$msgSuc('修改成功啦！！！')
      })
    },
    getUserInfo(){
      getUserInfo(this, null,  (res, err)=> {
        if (err) console.log(err);
        let data = res.data[0];
        this.$set(this.ruleForm,  'username', data.username);
        this.$set(this.ruleForm,  'password', data.password);
        this.$set(this.ruleForm,  'sign', data.sign);
        this.$set(this.ruleForm,  'blobname', data.blobname);
      })
    }
  },
    mounted(){
      this.getUserInfo();
    }
  }
</script>

<style lang="scss">
  .setting{
    .setting-box{
      width: 55%;
      padding: 1.5rem;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
      .el-form{
        .el-form-item{
          .el-form-item__label{
            font-size: 1.5rem;
            font-weight: bold;
          }
        }
        .el-form-item__content{
          text-align: center;
        }
      }
    }

  }

</style>
