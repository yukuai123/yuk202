<template>
    <div class="index-list">
      <div v-for="(item, index) in renderList" class="list-item">
        <div class="title-info">
          <h1><span @click="$router.push('/index/pageDetail?id='+item.id)">{{item.title}}</span></h1>
          <h2 class="iconfont">&#xe61a;&nbsp;{{item.create_time | getTime }}</h2>
        </div>
        <p  class="part-content">
          {{item.content | getContent}}
        </p>
        <h3><router-link tag="span" :to="'/index/pageDetail?id='+item.id" class="read-more">阅读全文</router-link></h3>
      </div>
      <pagination @getList="getList" :pageList="list" :pageCount="pageSize"></pagination>
    </div>
</template>

<script>
  import pagination from '@/components/pagination';
  import {getPage} from "@/util/apiMethods";
  import filter from '@/util/filter';
  let getTime = filter.getTime;
  let getContent = filter.getContent;
  export default {
    name: "indexList",
    data(){
      return {
        list: [],
        pageSize: 5,
        renderList: []
      }
    },
    filters: {
      getTime,
      getContent
    },
    components: {
      pagination
    },
    methods: {
      getList(list){
        this.renderList = list;
      },
      getPageList(){
        getPage(this, null, (res, err)=>{
          if (err) {
            return console.log(err);
          }
          this.list = res.data;
        });
      },
    },
    created(){
      this.getPageList()
    },
  }
</script>

<style lang="scss">
  .index-list{
    .list-item{
      .title-info{
        h1{
          font-size: 2.5rem;
          color: $theme-title-color;
          font-weight: bold;
          padding: 2rem 0;
          span{
            cursor: pointer;
          }
        }
      }
      .part-content{
        margmin-top: 1.5rem;
        line-height: 1.75;
        font-size: 1.65rem;
        overflow: hidden;
        max-width: 30rem;
        max-height: 12rem;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      h3{
        text-align: right;
        .read-more{
          display: inline-block;
          padding: 1rem;
          border: 1px solid $theme-line-color;
          border-radius: 6px;
          font-size: 1.3rem;
          color: $theme-text-color;
          margin-right: 1rem;
          cursor: pointer;
        }
        .read-more:hover{
          background: #555;
          color: white;
        }
      }
    }
  }
</style>
