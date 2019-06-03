<template>
  <div class="pagination">
    <ul id="pagination-ul">
    </ul>
  </div>
</template>

<script>
  // <!--接收两个参数 返回一个渲染数组-->
  import methods from '@/util/methods.js';
  let paginationByJS = methods.paginationByJS;
  export default {
    name: "pagination",
    props: ['pageList','pageCount'],
    data(){
      return {
        currentPage: 1,
        list: []
      }
    },
    computed: {

    },
    mounted(){

    },
    watch: {
      //监听变化 一变化给他打数据回去
      'list': function(val, old){
        this.$emit('getList', val);
      },
      'pageList': function (val) {
          paginationByJS(this, val, this.pageCount);
      }
    },
    beforeDestroy(){
    }
  }
</script>

<style lang="scss">
  .pagination{
    text-align: center;
    padding: 20px 0;

    ul#pagination-ul{
      padding: 0;
      right: 0;
      bottom: 0;
      position: relative;
      overflow: hidden;
      list-style: none;
      border: 1px solid #c1c1c1;
      display: inline-block;
      li{
        float: left;
        padding: 10px;
        color: #273346;
        font-size: 15px;
        cursor: pointer;
      }
      li:hover{
        font-weight: bold;
        background: #8a98ff;
      }
      #active{
        font-weight: bold;
        background: #8a98ff;
      }
    }

  }
</style>
