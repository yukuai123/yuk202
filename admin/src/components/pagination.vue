<template>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :pageSize="pageSize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :total="list.length">
      </el-pagination>
    </div>
</template>


<script>
  /*
  * 需要使用者提供 页面数据量，总数据，当前页码
  * 绑定一个监听子组件页数变化的方法
  * 父组件依靠页码的改变去渲染不同的数据
  * */
  export default {
    name: "pagination",
    props: ['pageSize', 'list', 'currentPage'],
    methods: {
      handleCurrentChange(val){
        this.$emit('changeCurrent', val);
      }
    },
    computed: {
      getTotal(){
        if (this.list&&this.list.length) return Math.ceil(this.list.length / this.pageSize);
      }
    },

  }
</script>

<style lang="scss" scoped>
  .pagination{
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

</style>
