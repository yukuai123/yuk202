<template>
  <div class="index">
    <div class="flex container">
      <adminSlide></adminSlide>

      <main>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated fadeIn"
        >
          <router-view></router-view>
        </transition>

      </main>
    </div>
  </div>
</template>

<script>

  import adminSlide from '../components/adminSlide';

  export default {
    name: "index",
    components: {
      adminSlide
    }
  }
</script>

<style lang="scss" scoped>

  .index{
    height: 100%;
    .container{
      height: 100%;
      main{
        flex: 100%;
        min-width: 500px;
        padding: 2rem 2rem 0 2rem;
        background: #ccc;
      }
    }
  }
</style>
