<template>
    <div class="about">
      <span class="about-content">
        <span class="left">
          <i>yuk</i><i>202</i>
        </span>
        <span class="right">关于</span>
      </span>

      <div class="detail">
        <p>你好 ：）</p>
        <p>yuk是平凡生活里的一粒尘埃</p>
        <p>yuk是一个二十多岁的小伙子</p>
        <p>一个正在路上的前端菜鸟，前路漫漫，学无止境，共勉。</p>
      </div>


      <div class="fragment">
        <div class="title">一些碎片</div>
        <div class="content">
          <p v-for="i in list">{{i.word}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  import {getAbout} from "@/util/apiMethods";

  export default {
    name: "about",
    data(){
      return {
        list: []
      }
    },

    methods: {
      getList(){

        getAbout(this, null, (res, err)=>{

          if (err) return console.log('error');
          this.list = res.data;
        });
      }
    },

    created(){
      this.getList();
    }
  }
</script>

<style lang="scss">
  .about{
    line-height: 1.5;
    .about-content{
      overflow: hidden;
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      display: inline-block;
      padding: 1rem 0.4rem;
      margin: 0 0 1.5rem 1.5rem;
      border: 1px solid $theme-text-color;
      vertical-align: middle;
      border-radius: 1rem;
      .left{
        margin: 0 0.5rem;
        i:nth-child(1){
          color: #B00404;
        }
        i:nth-child(2){
          color: #003CBD;
        }
        span{
          font-size: 1.3rem;
        }
      }

      .right{
        padding: 0 1rem;
      }
    }
    .about-content:first-child{
      margin-left: 0;
    }

    .detail{
      margin-top: 3rem;
      font-size: 1.8rem;
      background: #f5f5f5;
      border-radius: 2rem;
      p{
        padding: 2rem 1rem;
        color: #041b43;
        font-family: cursive;
      }
    }

    .fragment{
      margin-top: 3rem;
      padding: 2rem 0;
      .title{
        font-size: 2rem;
        font-weight: bold;
      }

      .content{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p{
          margin: 3rem 0;
          padding: 3rem 2rem;
          background: #121D30;
          font-size: 1.8rem;
          color: wheat;
          line-height: 1.5;
        }
      }
    }

  }

</style>
