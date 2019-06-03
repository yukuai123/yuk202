<template>
  <div class="index">
    <page-header></page-header>
    <main>
      <div class="container">
        <transition
          name="custom-classes-transition"
          enter-active-class="animated fadeIn"
        >
          <router-view></router-view>
        </transition>
      </div>
      <div class="slide">
        <slide></slide>
      </div>
    </main>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import pageHeader from '@/components/pageHeader.vue';
  import slide from '@/components/slide.vue';
  import pageFooter from '@/components/pageFooter.vue';


  export default {
    name: 'index',
    components: {
      pageHeader, slide, pageFooter
    }
  }
</script>

<style lang="scss">
  @media screen and(max-width: 768px){
    main{
      padding: 0;
      .slide{
        display: none;
      }
    }
  }
  @media screen and(max-width: 468px){
    main{
      .container{
        min-height: 25rem !important;
      }
    }
  }
  .index {
    font-family: "Palatino Linotype";

    height: 100%;
    main{
      margin-top: 3rem;
      display: flex;
      padding: 0 2rem;
      min-height: 60%;
      .container{
        min-height: 50rem;
        flex: 70%;
        width: 100%;
        padding-right: 2rem;
      }
      .slide{
        flex: 30%;
        border-left: 1px solid $theme-line-color;
      }

    }
  }
</style>
