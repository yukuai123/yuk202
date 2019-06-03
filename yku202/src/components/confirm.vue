<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div v-if="show" class="confirm">
      <div class="mask">
        <div :class="getColor">
          {{ content }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  // 弹窗组件 接收一个
  export default {
    name: "confirm",
    data(){
      return{
        content: '',
        type: '',
        show: false
      }
    },
    methods: {
      showConfirm(content, type){
        this.show = true;
        this.content = content;
        this.type = type;
        setTimeout(()=>{
          this.show = false;
          this.content = '';
          this.type = '';
        }, 1500)
      }
    },
    computed: {
      getColor(){
        switch(this.type){
          case 'success':{
            return 'success confirm-box';
          }
          case 'error': {
            return 'error confirm-box';
          }
          case 'waring': {
            return 'waring confirm-box';
          }
          default:{
            return 'confirm-box';
          }
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .confirm{
    height: 100%;
      .confirm-box{
        position: fixed;
        top: 3.5rem;
        padding: 2rem;
        left: 50%;
        border-radius: 1rem;
        transform: translateX(-50%);
        z-index: 999;
        font-size: 1.5rem;
        font-weight: bold;
        width: 25rem;
        text-align: center;
        border: 1px solid rgba(1,1,1,0.2);
      }
    .success{
      color: #2ECC71;
    }
    .error{
      color: #E74C3C;
    }
    .waring{
      color: #34495E;
    }
  }

</style>
