<template>
  <div onselect="return false;" class="login">
    <div  class="login-box">
      <h1 @mouseover="isShow = isShow || 'true'" class="title"><span>YUK</span> <span>202</span></h1>

      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeIn"
      >
        <el-form v-bind:class="isShow? 'show': ''" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>

      </transition>

    </div>
  </div>
</template>

<script>
  import { login } from '@/util/apiMethods';

  export default {
    name: "login",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      let validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '789456321',
          username: 'yuk202',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateName, trigger: 'blur' }
          ],
        },
        isShow: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            this.$msgErr('请输入正确的账号密码');
            return false;
          }
        });
      },
      login(){
        login(this, this.ruleForm, (res,err)=>{
          if (!res.data.length) return this.$msgErr('账号或者密码错误');
          console.log(this.$store)
          this.$store.commit('setUser', JSON.stringify(res.data[0]));
          this.$msgSuc('成功登陆');
          this.$router.push('/index');
        })
      }
    },
  }
</script>

<style lang="scss">
  @media screen and (max-height : 500px){
    .login{
      .login-box{
        .el-form{
          overflow-y: scroll !important;
        }
      }
    }
  }
  .login{
    height: 100%;
    background: url("../assets/img/bg.jpg") no-repeat center;
    .login-box{
      width:  30rem;
      border: 1px solid #ccc;
      padding: 2rem 1rem;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
      .title{
        text-align: center;
        font-size: 2.5rem;
        font-weight: bold;
        padding: 1rem 0;
        span:nth-child(1){
          color: #555;

        }
        span:nth-child(2){
          color: #3498DB;
        }
      }

      .el-form{
        max-height: 0;
        overflow: hidden;
        .el-form-item{
          display: flex;
          justify-content: center;
          .el-form-item__label{
            width: auto !important;
            color: #555 !important;
            font-weight: bold !important;
          }
          .el-form-item__content{
            margin-left: 0 !important;
            .el-button{
              background: #555;
              border: none;
            }
          }
        }
      }
    }
  }
</style>
