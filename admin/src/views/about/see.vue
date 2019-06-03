<template>
  <div class="see">
    <div>

      <div class="add-box">
        <div class="title left">
          关于列表
        </div>


        <el-button
          size="large"
          type="primary"
          @click="dialogVisible = true">新增

        </el-button>

      </div>
      <el-table
        :data="renderList"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="id"
          width="380">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="内容"
          align="center"
          width="480">
          <template slot-scope="scope">
            <span>{{ scope.row.word }}</span>
          </template>
        </el-table-column>


        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id, 'removeAbout')">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog title="来了老弟" :visible.sync="dialogVisible">

      <el-input placeholder="请输入需要添加的内容" v-model="word" type="primary"></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAbout">添 加</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import pagination from '@/components/pagination';
  import mixin from '@/util/mixin';
  import { addAbout, getAbout} from '@/util/apiMethods';

  export default {
    name: "see",
    mixins: [mixin],
    data(){
      return {
        word: '',
        dialogVisible: false,
      }
    },
    components: {
      pagination,
    },
    methods: {
      addAbout(){
        if (!this.word.length) return  this.$msgErr('老哥 写点东西好吧');
        this.dialogVisible = false;
        addAbout(this, { word: this.word }, (res, err) => {
          if (err) return this.$msgErr('似乎出了什么问题');
          this.$msgSuc('关于 +1 HP');
          this.word = '';
          this.getTabList();
        })
      },


      getTabList() {
        getAbout(this, null, (res, err) => {
          if (err) return this.$msgErr('似乎出了什么问题');
          this.list = res.data;
          this.renderList = this.getRenderList;
        })
      },
    },

    created(){
      this.getTabList();
    }
  }
</script>

<style lang="scss">
  .see{

    .add-box{
      .title{
        font-size: 2rem;
        vertical-align: bottom;
        font-weight: bold;
        margin-top: 7px;
      }
      padding: 2rem 0;

      text-align: end;
    }
  }

</style>
