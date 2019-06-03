<template>
  <div class="arrange">

    <div v-if="$route.query.classifyId || $route.query.tagId" class="title-top">
      {{ $route.query.classifyId? '分类': '标签' }}
    </div>
    <div v-if="!!list.length" class="arrange-item" v-for="i in list">
      <h1 class="arrange-time">{{i.year}}</h1>
      <ul class="arrange-title">
        <li v-for="item in i.list"><span>{{ item.create_time | getDay}}</span>
          <router-link :to="'/index/pageDetail?id='+ item.id" tag="span" class="title" style="margin-left: 2rem">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="!list.length" class="showTip">
      {{ $route.query.classifyId? '暂无该分类下的文章': $route.query.tagId? '暂无拥有该标签的文章': '暂无文章' }}
    </div>

  </div>
</template>

<script>


  import methods from '@/util/methods';
  import filter from '@/util/filter';
  import {getPageByClassify, getPageByTag, getPage} from "@/util/apiMethods";

  let sortByTime = methods.sortByTime,
    getDay = filter.getDay;
  export default {
    name: "arrange",
    data() {
      return {
        list: [], //归档文章列表 （已做数据处理）
      }
    },
    filters: {
      getDay
    },
    methods: {
      setList() {
        let callback = (res, err) => {
          if (err) return console.log(err);
          if (!res.data.length) {
            this.list = [];
            return;
          }
          this.list = sortByTime(res.data, 'create_time');
        };
        if (this.$route.query.classifyId) {
          getPageByClassify(this, {classify_id: parseInt(this.$route.query.classifyId)}, callback);
        } else if (this.$route.query.tagId) {
          getPageByTag(this, {tag_id: parseInt(this.$route.query.tagId)}, callback);
        } else {
          getPage(this, null, callback)
        }
      },
    },
    created() {
      this.setList();
    },
    watch: {
      '$route': function (val, old) {
        if (val.fullPath !== old.fullPath) {
          this.setList();
        }
      }
    }
  }
</script>

<style lang="scss">
  .arrange {
    .title-top {
      font-size: 2.5rem;
      padding: 0 3rem 5rem 0;

    }
    .showTip {
      font-size: 2rem;
      font-weight: bold;
      color: #0D1740;
    }
    .arrange-item {
      font-size: 2.5rem;
      font-weight: bold;
      text-align: left;
    }
    .arrange-title {
      padding: 2rem 0 2rem 8rem;
      list-style: disc;
      font-size: 2rem;
      color: $theme-title-color;
      line-height: 1.5;


      li {
        padding: 0.5rem 0;
        font-weight: normal;
        .title {
           color: #495A80;
           cursor: pointer;
        }
        @media screen and (max-width: 560px){
              .title {
                color: #495A80;
                cursor: pointer;
                display: block;
                text-align: left;
                margin-left: 0!important;
              }
        }

        .title:hover {
          color: #B00404;
        }
      }

    }

  }

</style>
