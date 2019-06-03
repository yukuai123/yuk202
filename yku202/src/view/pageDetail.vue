<template>
    <div class="pageDetail">
      <div class="pageDetail-top">
        <h1 class="title">{{ page.title }}</h1>
        <h1  class="clear page-info">
          <span class="left">{{page.create_time | getTime}}</span>
          <span class="left">{{page.tag_name}}</span>
          <span class="iconfont right">&#xe619; &nbsp;{{list.length}}条评论</span>
        </h1>
      </div>
      <div v-html="page.content" class="mt-20 pageDetail-content">
        {{ page.content }}
      </div>

      <div class=" p-20 clear">
        <span  @click="$router.push('/index/pageDetail?id='+(beforePage.length? beforePage[0].id: $route.query.id))" class="previous left">上一篇： {{ beforePage.length? beforePage[0].title: '无' }}</span>
        <span  @click="$router.push('/index/pageDetail?id='+(afterPage.length? afterPage[0].id: $route.query.id))" class="next right">下一篇： {{ afterPage.length? afterPage[0].title: '无' }}</span>
      </div>
      <messageBox :page_id="$route.query.id" :size="list.length" :list="list"></messageBox>
      <confirm ref="confirm"></confirm>

    </div>
</template>

<script>
  import messageBox from '@/components/messageBox';
  import filter from '@/util/filter';
  import confirm from '@/components/confirm';
  import {getMessage, getPageById} from "@/util/apiMethods";


  let getTime = filter.getTime;
  export default {
    name: "pageDetail",
    inject: ['reload'],
    data(){
      return {
        page: [],
        list: [],
        afterPage: [],
        beforePage: []
      }
    },
    filters: {
      getTime
    },
    components: {
      messageBox, confirm
    },
    methods:{
      getPageData(){
        getPageById(this, { id: parseInt(this.$route.query.id)}, (res, err)=>{
          this.page = res.data[0];
          getMessage(this, { page_id: res.data[0].id }, (res, err)=>{
            this.list = res.data;
          });
        });
      },
      getBeforePage(){
        getPageById(this, { id: parseInt(this.$route.query.id) - 1}, (res, err)=>{
          this.beforePage = res.data;
        });
      },
      getAfterPage(){
        getPageById(this, { id: parseInt(this.$route.query.id) + 1}, (res, err)=>{
          this.afterPage = res.data;
        });
      }
    },
    watch: {
      //根据路由不同来重载内容
      '$route': function (val, old) {
        if (val.query.id !== old.query.id){
          this.reload();
        }
      },
      //vuex中保存的留言状态改变 重载页面 （留言板没办法自己重载）
      '$store.getters.getStatus' : function(val, old) {
        if (val !== old){
          this.$store.commit('clearSubmit');
          this.$refs.confirm.showConfirm('留言等待审核', 'success');

          setTimeout(()=>{
            this.reload();
          }, 2000)


        }
      }
    },
    created(){
      this.getPageData();
      this.getBeforePage();
      this.getAfterPage();
    },
  }
</script>

<style lang="scss">

  @media screen and (max-width: 480px){
    .pageDetail-content{
      min-height: 30rem !important;
    }
    .page-info{
      .right{
        margin-top: 0.8rem;
      }
    }

    .p-20{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .left{
        margin-bottom: 2rem;
      }
    }
  }
  .pageDetail{
  .pageDetail-top{
    .title{
      font-size: 2.5rem;
      color: $theme-title-color;
      font-weight: bold;
    }
    .page-info{
      padding: 1rem 0 0 0;
      font-size: 1.3rem;
      color: $theme-title-color;

      font-weight: bold;
      span:nth-child(1)::after{
        content: '';
        width: 3px;
        height: 1rem;
        margin: 0 0.5rem;
        display: inline-block;
        background: $theme-text-color;
      }
      .right{
        vertical-align: middle;

      }
    }
  }
  .pageDetail-content{
    min-height: 30rem;
    font-size: 1.8rem;
    line-height: 1.5;
  }
  .p-20{
    margin-top: 2rem;
    .next,.previous{
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      border: 1px solid $theme-line-color;
      padding: 1rem;
      border-radius: 0.8rem;
    }
    .next:hover,.previous:hover{
      background: #ccc;
    }
  }
  .tips{
     opacity: 0;
     transition: opacity 0.5s;
  }

  }
</style>
