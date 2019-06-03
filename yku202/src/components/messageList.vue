<template>
  <div>
    <div v-for="(i,index) in list" v-bind:class="marginLeft? ['messageList', 'item', 'ml-20']: ['messageList', 'item']" class="messageList item">
      <h1 class="info-box">
        <span>{{ i.nickname }}<span v-if="father">&nbsp;回复了&nbsp;{{father}}</span> </span>
        <span>{{ i.create_time | getTime  }}</span>
      </h1>
      <p class="text">{{ i.content }}</p>
      <span class="back" @click="showWriteBox(index)">回复</span>
      <div :ref="index" class=" write-box">
        <messageWrite :page_id="page_id" :parent_id="i.id"></messageWrite>
      </div>

      <div v-if="i.children && i.children.length">
        <messageList :page_id="page_id" :marginLeft="'2rem'" :father="i.nickname" :list="i.children"></messageList>
      </div>
    </div>
  </div>
</template>

<script>



  import messageWrite from '@/components/messageWrite';
  import filter from '@/util/filter';
  let getTime = filter.getTime;

  export default {
    name: "messageList",
    props: ['list','marginLeft','father', 'page_id'],
    data(){
      return{
        flag: false,
        index: null,
      }
    },
    filters: {
      getTime
    },
    components: {
      messageWrite
    },
    methods: {
      showWriteBox(index){
        this.index = index;
        this.flag = !this.flag;
        this.$refs[index][0].style.height = this.flag? '100%': '0';
      }
    },
    mounted(){
    },
  }
</script>

<style lang="scss">
  .messageList.item{
    padding: 1rem 0;
      .info-box{
        padding: 1rem 0 0 0;
        line-height: 1.5;
        span:nth-child(1){
           color: $theme-title-color;
           font-size: 1.3rem;
        }
        span:nth-child(2){
          color: $theme-text-color;
          font-size: 1rem;
          padding-left: 0.5rem;
        }
      }

      .back{
        color: #42B983;
        cursor: pointer;
        font-size: 1rem;
      }
      .write-box{
        height: 0;
        overflow: hidden;
        margin-top: 0.5rem;
      }
    p.text{
        font-size: 1.6rem;
        padding: 1rem 0;
    }
  }

</style>
