<template>
  <div class="messageBoard">
    <h1 class="hello">
      欢迎您，这里 yuk202
      <span class="title">欢迎大家一起交流哦~ ；）</span>
    </h1>

    <messageBox :page_id="null" :size="list.length" :list="list"></messageBox>

    <confirm ref="confirm"></confirm>

  </div>
</template>

<script>
  /*
  * 留言加载回来的数据应该是什么形式的
  * 接口返回的是一个留言开始和结束的完整消息链
  * 接口接收的数据是一个邮箱 一个用户名 用户名和邮箱绑定在一起
 */


  import messageBox from '@/components/messageBox';
  import confirm from '@/components/confirm';
  import {getMessage} from "@/util/apiMethods";

  export default {
    inject: ["reload"],
    name: "messageBoard",
    data() {
      return {
        list: []
      }
    },
    components: {
      messageBox, confirm
    },
    methods: {
      getSubmitStatus(flag) {
        if (flag) {
          this.getMsg();
        }
      },
      getMsg() {
        getMessage(this, null, (res, err) => {
          this.list = [...res.data];
        });
      }
    },
    created() {
      this.getMsg();
    },
    watch: {
      '$store.getters.getStatus': function (val, old) {
        if (val !== old) {
          this.$store.commit('clearSubmit');
          this.$refs.confirm.showConfirm('留言等待审核', 'success');
          setTimeout(() => {
            this.reload();
          }, 2000)
        }
      }
    }
  }
</script>

<style lang="scss">
  .messageBoard {
    .hello {
      font-size: 2.5rem;
      font-weight: bold;
      color: $theme-title-color;

      .title {
        font-size: 1.5rem;
        display: block;
        padding-top: 1.8rem;
      }
    }
  }

</style>
