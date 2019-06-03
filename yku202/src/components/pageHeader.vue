<template>
  <div class="header">
    <h1 class="blob-name">
      {{ user? user.blobname : '' }}
    </h1>
    <nav class="nav">
      <ul>
        <router-link tag="li" :to="'/index/list'"><span v-bind:class="isActive === 'list'|| isActive === 'pageDetail'? 'active':''">首页</span></router-link>
        <router-link tag="li" :to="'/index/arrange'"><span v-bind:class="isActive === 'arrange'? 'active':''">归档</span></router-link>
        <router-link tag="li" :to="'/index/about'"><span v-bind:class="isActive === 'about'? 'active':''">关于</span></router-link>
        <!--<router-link tag="li" :to="'/index/history/'"><span v-bind:class="isActive === 'history'? 'active':''">历史</span></router-link>-->
        <router-link tag="li" :to="'/index/messageBoard'"><span v-bind:class="isActive === 'messageBoard'? 'active':''">留言</span></router-link>
      </ul>
      <div class="some-word">
        <span class="transition-influence" v-bind:class="isActive === 'about'? 'redColor': ''">{{ getFontPart }}</span> <span v-typist class="blueColor" v-if="isActive === 'about'">{{getLastPart}}</span>
      </div>
    </nav>
  </div>
</template>

<script>


  //搞一个打字机效果 direction 自定义指令
  import {getUserInfo} from "@/util/apiMethods";

  export default {
    name: "pageHeader",
    data(){
      return {
        user: null
      }
    },
    mounted(){

    },

    computed: {
      isActive(){
        return this.$route.path.split('/')[2];
      },
      getUser(){
        return this.user || {};
      },
      getFontPart(){
        if (this.user!==null){
          return this.user.sign.split(' ')[0];
        }
      },
      getLastPart(){
        if (this.user!==null){
          return this.user.sign.split(' ')[1];
        }
      }
    },
    methods: {
      getUserInfo(){
        getUserInfo(this, null ,(res,  err)=>{
          if (err) return console.log(err);
          this.user = res.data[0];
        })
      }
    },
    created(){
      this.getUserInfo();
    },

  }
</script>

<style lang="scss">
  @media screen and(max-width: 768px){
    .blob-name{
      display: block;
      width: 100%;
    }
  }
  @media screen and(max-width: 475px){
    .nav{
      ul{
        display: block !important;
        margin: auto;
      }
    }
    .blob-name{
      padding: 0 !important;
      text-align: center;
      margin: 0;
    }
    .some-word{
      margin: 1rem;
      span:nth-child(2){
        display: block;
      }
    }
  }

  .header{
    overflow: hidden;
    padding: 2rem;
    .blob-name{
      font-size: 3rem;
      white-space: nowrap;
      float: left;
      font-weight: bold;
    }
    .nav{
      float: left;
      width: 100%;
      ul{
        overflow: hidden;
        display: inline-block;
        text-align: center;
        li{
          display: inline-block;
          border-bottom: 1px solid transparent;
          span{
            display: inline-block;
            padding: 2rem 2.5rem 1rem 2rem;
            font-size: 1.6rem;
            cursor: pointer;
          }
          span:hover{
            font-weight: bold;
          }
        }
        li:first-child{
          margin-left: -2rem;
        }
        li:after{
          content: '';
          border-right: 1px solid  $theme-line-color;
          width: 0;
        }
        li:last-child{
          margin-right: -1px;
        }
      }
      .some-word{
        padding: 0.5rem 1.5rem;
        font-size: 3.5rem;
        text-align: center;
        border-bottom: 3px solid #0D1740;
      }
    }
  }
</style>
