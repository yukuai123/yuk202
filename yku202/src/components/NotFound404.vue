<template>
    <div class="NotFound404">
      <span>NOT</span><span> FUND</span><span> 404</span>
    </div>
</template>

<script>
  export default {
    name: "NotFound404"
  }
</script>

<style lang="scss" scoped>
  .NotFound404{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) rotate(15deg);
    text-align: center;
    font-weight: bold;
    font-size: 6rem;
    word-spacing: 2rem;
    span:nth-child(1){
      color: #B00404;
    }
    span:nth-child(2){
      color: #555;
    }
    span:nth-child(3){
      color: #003CBD;
    }

  }
</style>
