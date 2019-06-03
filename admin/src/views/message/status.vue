<template>
  <div class="status">
      <div class="list-box">

        <el-table
          :data="renderList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            label="用户昵称"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="评论日期"
            align="center"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.create_time | timeFilter }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="邮箱"
            align="center"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.e_mail }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="是否文章评论"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.page_id? '是': '否' }}</span>

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
                @click="showMegTree(scope.row)">查看详情
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id, 'removeMessage')">删除该评论
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="currentMsg.page_id? `文章 ${ currentMsg.pageName||'' }中的评论`: '留言板的留言'" :visible.sync="dialogVisible">

          <h1 class="creator">{{ parentNode.length? `这是一条 ${currentMsg.nickname} 回复 ${parentNode[0].nickname}的评论`: `这是一条 ${currentMsg.nickname} 根评论` }}</h1>
          <h1 class="parent" v-if="parentNode.length">
            <span>{{parentNode[0].nickname}}: </span>
            <span>{{parentNode[0].content}} (时间{{ parentNode[0].create_time | timeFilter }})</span>
          </h1>
          <h2 class="son">
            <span>{{currentMsg.nickname}}:</span>
            <span>{{' '+currentMsg.content}} (时间{{ currentMsg.create_time | timeFilter }})</span>
          </h2>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <pagination @changeCurrent="changeCurrent" :pageSize="pageSize" :list="list" :currentPage="currentPage"></pagination>
      </div>
  </div>
</template>

<script>
  import filter from '@/util/filter';
  let timeFilter = filter.getTime;
  import pagination from '@/components/pagination';
  import {switchMsgStatus, getMsgById, getAllMsg, getAllPageById} from "@/util/apiMethods";
  import mixin from '@/util/mixin';

  export default {
    name: "status",
    mixins: [mixin],
    data() {
      return {
        search: '',
        dialogVisible: false,
        parentNode: [],
        currentMsg: [],
        pageName: '',
      }
    },
    components: {
      pagination,
    },
    filters: {
      timeFilter
    },
    methods: {
      getTabList() {
        getAllMsg(this, null, (res, err) => {
          if (err) return this.$msgErr('似乎出了什么问题');
          this.list = res.data;
          this.renderList = this.getRenderList;
        })
      },
      showMegTree(item){

        this.dialogVisible = true;
        this.currentMsg = item;
        if (item.parent_id) {
          getMsgById(this, { id: item.parent_id }, (res, err)=>{
            if(err) return this.$msgErr('错误');
            this.parentNode = res.data;
          })
        }
        if (item.page_id){
          getAllPageById(this, { id: item.page_id }, (res, err)=>{
            if(err) return this.$msgErr('错误');
            this.currentMsg['pageName'] = res.data[0].title;
          })
        }

      },
      switchStatus(id, status){
        switchMsgStatus(THIS, {id, status}, (res, err)=>{
          if (err) return this.$msgErr('修改失败');
          this.$msgSuc('成功！！！！')
        })
      }
    },
    mounted() {
      this.getTabList();
    }

  }
</script>

<style lang="scss">
  .status{
    padding-bottom: 8rem;
    .list-box{
      .el-dialog__wrapper{
        .el-dialog{
          .el-dialog__body{
            .title{
              font-size: 1.8rem;
              color: navy;
              font-weight: bold;
              padding: 1rem 0;
            }
            .parent{
              margin-top: 2rem;
              color: #495A80;
            }
            .parent,.son,.creator{
              padding: 1rem 0;
              font-size: 1.8rem;
            }
            .son{
              color: blueviolet;
            }
          }
        }
      }
    }
  }
</style>
