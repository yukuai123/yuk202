<template>
  <div class="list">
    <div class="list-box">

      <el-table
        :data="renderList"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="标题"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.title }}</span>
              </div>
              <span v-html="scope.row.content">{{ scope.row.content }}</span>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="日期"
          align="center"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.create_time | timeFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="分类"
          align="center"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.classify_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="标签"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-tag size="medium" style="margin-left: 10px">{{ scope.row.tag_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="是否通过审核"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-switch  active-color="#13ce66"
                        inactive-color="#ff4949"
                        :inactive-value="0"
                        :active-value="1"
                        @change="switchStatus(scope.row.id, scope.row.status)"
                        v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="$router.push('addPage?id='+scope.row.id)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id, 'removePage')">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div>
      <pagination @changeCurrent="changeCurrent" :pageSize="pageSize" :list="list" :currentPage="currentPage"></pagination>
    </div>
  </div>
</template>

<script>
  import filter from '@/util/filter';
  import pagination from '@/components/pagination';
  import mixin from '@/util/mixin';
  let timeFilter = filter.getTime;
  import { switchPageStatus, getAllPage} from "@/util/apiMethods";

  export default {
    name: "list",
    mixins: [mixin],
    data() {
      return {
        search: '',
      }
    },

    beforeRouteEnter(to, from, next){
      if (from.name === 'addPage'){
        next(vm=> {
          setTimeout(vm.getTabList.bind(vm), 300)
        })
      } else{
        next(vm =>{
          vm.getTabList();
        })
      }
    },
    components: {
      pagination
    },
    filters: {
      timeFilter
    },
    methods: {
      getTabList() {
        getAllPage(this, null, (res, err) => {
          if (err) return this.$msgErr('似乎出了什么问题');
          this.list = res.data;
          this.renderList = this.getRenderList;
        })
      },
      switchStatus(id, status){
        switchPageStatus(this, {id, status}, (res, err)=>{
          if (err) return this.$msgErr('修改错误');
          this.$msgSuc('发布成功');
        })
      }
    },
  }
</script>

<style lang="scss">
  .list {
    padding-bottom: 8rem;
  }

</style>
