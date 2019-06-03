<template>

  <div class="index-slide">
      <div class="search">
        <span class="iconfont">&#xe61e;</span>
        <input @input="searchResult" @blur="clearSearch"  placeholder="搜索文章" class="search-box" type="text">

        <transition
          name="custom-classes-transition"
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOut"
        >
          <ul v-show="show" class=" clear search-result">
            <li class="no-data" v-if="!searchArr||!searchArr.length">{{ '暂无该数据' }}</li>
            <li @click="switchRouter(i.id)" class="left"  v-else v-for="i in searchArr">{{ i.title }}</li>
          </ul>
        </transition>

      </div>
      <div class="assort">
        <div class="slide-box">
          <h1 class="iconfont">&#xe60a;&nbsp;分类</h1>
          <ul>
            <li @click="switchRouterByClassify(i.id)" v-for="i in classify">{{i.name}}</li>
          </ul>
        </div>
        <div class="slide-box">
          <h1 class="iconfont">&#xe61d;&nbsp;标签</h1>
          <ul>
            <li @click="switchRouterByTag(i.id)" v-for="i in tag"><span>{{i.name}}</span></li>
          </ul>
        </div>
        <div class="slide-box">
          <h1 class="iconfont">&#xe610;&nbsp;最近文章</h1>
          <ul>
            <li v-for="i in page"><router-link tag="span" :to="'/index/pageDetail?id='+i.id">{{i.title}}</router-link></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
  import { getTag, getClassify, getPage} from "@/util/apiMethods";
  export default {
    name: "slide",
    data(){
      return{
        show: false,
        tag: [], //标签数组
        classify: [], //分类数组
        page: [], //文章数组（最新五条）
        allPage: [], //所有文章
        searchArr: [], //搜索结果
      }
    },
    methods: {
      getTag(){
        getTag(this, null, (res, err)=>{
          if(err) return console.log(err);
          this.tag = res.data;
        })
      },

      getClassify(){
        getClassify(this, null, (res, err)=>{
          if(err) return console.log(err);
          this.classify = res.data;
        })
      },

      getPage(){
        getPage(this, null, (res, err)=>{
          if(err) return console.log(err);
          //展示最新的五个文章
          this.page = res.data.slice(0,5);
          this.allPage = res.data;
        });
      },

      //让我们input
      searchResult($event){
        let value = $event.target.value;
        if (this.allPage&&this.allPage.length&&value){
          this.searchArr = this.allPage.filter(i=> i.title.indexOf(value)>=0);
        }
        this.show = true;
      },
      clearSearch($event){
        $event.target.value = '';
        this.show = false;
      },

      switchRouter(id){
        this.$router.push('/index/pageDetail?id='+id);
      },

      switchRouterByClassify(id){
        if (this.allPage.length){
          this.$router.push('/index/arrange?classifyId=' + id);
        }
      },

      switchRouterByTag(id){
        if (this.allPage.length){
          this.$router.push('/index/arrange?tagId=' + id);
        }
      }
    },

    created(){
      this.getTag();
      this.getClassify();
      this.getPage();
    }
  }
</script>

<style lang="scss">
  .index-slide{
    box-sizing: border-box;
    display: inline-block;
    padding-left: 4rem;
    .search{
      border: 1px solid $theme-line-color;
      border-radius: 6px;
      height: 3.3rem;
      padding-left: 0.5rem;
      white-space: nowrap;
      position: relative;
      .search-result{
        position: absolute;
        width: 100%;
        background: #fff;
        z-index: 999;
        left: 0;
        margin-top: -0.1rem;
        border: 1px solid #A39F93;
        li{
          padding: 1rem 0;
          text-align: center;
          width: 100%;
        }
        li.no-data{
          font-weight: bold;
          font-size: 1.5rem;
        }
        li.left:hover{
          background: #ccc;
          font-weight: bold;
          color: #0D1740;
        }
      }
      .iconfont{
        vertical-align: middle;
      }
      .search-box{
        width: 80%;
        outline: none;
        border: none;
        display: inline-block;
        height: 100%;
        padding: 0 0 0 0.8rem;
        color: $theme-text-color;
      }
    }

    .slide-box{
      padding-top: 4.5rem;
      color: #555;
      h1{
        padding-bottom: 1.5rem;
        border-bottom: 1px solid $theme-line-color;
      }

      ul{
        padding-top: 2rem;
        font-size: 1.5rem;
        li{
          display: inline-block;
          margin: 1rem ;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 1rem;
          cursor: pointer;
          span{
            padding: 1px;
          }
        }

        li:hover{
          color: #8988fb;
          border-color: #8988fb;
        }
      }
    }

    .slide-box:nth-child(3){
      ul>li{
        /*border: none;*/
        float: none;
      }
    }
  }


</style>
