<template>
    <div class="messageBox">

      <messageWrite :page_id="page_id" :parent_id="null"></messageWrite>
      <h1 class="message-num">{{size}}条{{ $route.query.id? '评论': '留言' }}</h1>

      <!--渲染数据的说-->
      <div class="pt-20 message-list" >
        <messageList :page_id="page_id" :list="list"></messageList>
      </div>
    </div>
</template>

<script>

  import messageList from '@/components/messageList';
  import messageWrite from '@/components/messageWrite';
  export default {
    name: "messageBox",
    inject: ['reload'],
    props: ['list','size', 'parent_id', 'page_id'],
    data(){
      return {
        flag: false
      }
    },
    components: {
      messageList,
      messageWrite
    },
    watch:{

      //保证每次文章切换我们的组件也要跟着做切换。
      '$route': function (val, old) {
        if (val.query.id !== old.query.id){
          this.reload();
        }
      }
    }
  }
</script>

<style lang="scss">
  .messageBox{
    margin-top: 6rem;
    .message-num{
      font-size: 1.8rem;
      color: #555;
      font-weight: bold;
    }
    .message-list{

  }
  .hidden{
    width: 0;
    height: 0;
    display: none;
  }
  }

</style>
