<template>
  <div class="adminSlide left">
    <el-col>
      <el-menu
        :router="true"
        :default-active="$store.getters.getPath"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        :unique-opened="true"
        active-text-color="#ffd04b">
        <el-submenu  v-for="(i,index) in nav" :key="index" :index="i.path">
          <template  slot="title">
            <i class="el-icon-location"></i>
            <span v-bind:class="$store.getters.getPath.indexOf(i.path.split('/')[1]) >= 0? 'active': ''">{{ i.title }}</span>
          </template>
          <el-menu-item-group>
            <template slot="title">{{ i.child[0].sub }}</template>
            <el-menu-item v-for="(item,  idx) in i.child[0].menu" :key="idx" :index="`/${index}/${item.path}`">{{ item.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-col>
  </div>
</template>

<script>
  import nav from '@/util/nav';
  export default {
    name: "adminHeader",
    data(){
      return{
        nav,
      }
    },
    methods: {
    },
    watch: {
      '$route': function (val, old) {
        this.$store.commit('setPath', val.path);
      }

    }
  }
</script>

<style lang="scss">

  .adminSlide{
    height: 100%;
    .el-col{
      height: 100%;
      width: 25rem !important;
      .el-menu{
        height: 100%;
        .el-submenu{
          padding: 2rem;
          .el-submenu__title{
            font-size: 2rem;
          }
          .el-menu--inline{
            .el-menu-item-group{
              .el-menu-item-group__title{
                font-size: 1.5rem;
                }
              ul{
                .el-menu-item{
                  font-size: 1.5rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
