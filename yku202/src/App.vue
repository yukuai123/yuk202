<template>
  <div id="app">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  }
}
</script>

<style lang="scss">
#app {
  margin: auto;
  max-width: 115rem;
  padding: 0 6rem;

  @media screen and (max-width: 45rem){
    padding: 0 10px;
  }
}
</style>
