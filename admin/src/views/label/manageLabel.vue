<template>
  <div class="classify">
    <div class="classify-box" >
      <h1>分类管理 &nbsp;&nbsp;<span>{{ classify.length + '条分类'}}</span></h1>
        <el-tag
          :key="index"
          v-for="(i, index) in classify"
          closable
          size="medium"
          :disable-transitions="false"
          @click.native="showPageByClassify(i.id)"
          @close="handleClassifyClose(i.id)">
          {{i.name}}
        </el-tag>
         <span class="tips" v-if="!classify.length">暂时没有分类数据呢 添加一个吧</span>
        <!--这边 inputVisible 用来判断是否填充新的标签-->
        <el-input
          class="input-new-tag"
          v-if="inputClassifyVisible"
          v-model="inputClassifyValue"
          ref="saveClassifyInput"
          size="small"
          @keyup.enter.native="handleClassifyConfirm"
          @blur="handleClassifyConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showClassifyInput">+</el-button>

    </div>




    <span class="line"></span>

    <div class="tag-box">
      <h1>标签管理 &nbsp;&nbsp; <span>{{ tag.length + '个标签'}}</span></h1>

      <el-tag
        :key="index"
        v-for="(i, index) in tag"
        closable
        size="medium"
        :disable-transitions="false"
        @click.native="showPageByTag(i.id)"
        @close="handleTagClose(i.id)">
        {{i.name}}
      </el-tag>
      <span class="tips" v-if="!tag.length">暂时没有标签数据呢 添加一个吧</span>
      <!--这边 inputVisible 用来判断是否填充新的标签-->
      <el-input
        class="input-new-tag"
        v-if="inputTagVisible"
        v-model="inputTagValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleTagConfirm"
        @blur="handleTagConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+</el-button>

    </div>


  </div>
</template>


<script>
  import {getClassify,
    getTag, getPageByTag,
    addTag, removeTag,
    getPageByClassify, addClassify, removeClassify } from '@/util/apiMethods';
  export default {
    name: "manageLabel",
    data() {
      return {
        classify: [],
        inputClassifyVisible: false,
        inputClassifyValue: '',

        tag: [],
        inputTagVisible: false,
        inputTagValue: ''
      };
    },
    methods: {

      //分类
      handleClassifyClose(id) {
        //这里做成 点击判断是否要进行删除
        this.$confirm('确认删除啊 兄弟').then(res =>{
          removeClassify(this, { id: id}, (res, err)=>{
            if (err) return this.$msgErr('删除失败');
            this.$msgSuc('分类 -1 QAQ');
            this.getClassify();
          })
        }).catch(err =>{
          this.$msgErr('已取消')
        })
      },

      showClassifyInput() {
        this.inputClassifyVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveClassifyInput.$refs.input.focus();
        });
      },

      handleClassifyConfirm() {
        let inputValue = this.inputClassifyValue;
        if (inputValue) {
          addClassify(this, {name: inputValue}, (res, err)=>{
            if (err) return this.$msgErr(err);
            this.$msgSuc('添加分类成功');
            this.getClassify();
          })
          //这里去数据库添加一下数据 刷新页面获取数据
          // （好像不太友好.. 数据库添加成功就添加到数组 不然就不添加到数组即可）
          //搞定
        }
        this.inputClassifyVisible = false;
        this.inputClassifyValue = '';
      },

      showPageByClassify(id){
        getPageByClassify(this, {classify_id : id}, (res, err)=>{
          if (err)  return this.$msgErr('未查询到相关分类下的文章');

          console.log(res.data);

        })
      },


      //标签
      handleTagClose(id) {
        //这里做成 点击判断是否要进行删除
        this.$confirm('确认删除啊 兄弟').then(res =>{
          removeTag(this, { id: id}, (res, err)=>{
            if (err) return this.$msgErr('删除失败');
            this.$msgSuc('标签 -1 QAQ');
            this.getTag();
          })
        }).catch(err =>{
          this.$msgErr('已取消')
        })
      },

      showTagInput() {
        this.inputTagVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleTagConfirm() {
        let inputValue = this.inputTagValue;
        console.log(inputValue)
        if (inputValue) {
          addTag(this, {name: inputValue}, (res, err)=>{
            if (err) return this.$msgErr(err);
            this.$msgSuc('添加标签成功');
            this.getTag();
          })
          //这里去数据库添加一下数据 刷新页面获取数据
          // （好像不太友好.. 数据库添加成功就添加到数组 不然就不添加到数组即可）
          //搞定
        }
        this.inputTagVisible = false;
        this.inputTagValue = '';
      },

      showPageByTag(id){
        getPageByTag(this, {tag_id : id}, (res, err)=>{
          if (err)  return this.$msgErr('未查询到相关标签下的文章');

          console.log(res.data);

        })
      },

      getTag(){
        getTag(this, null, (res,err)=> {
          if (err) return console.log(err);
          this.tag = res.data;
        })
      },
      getClassify(){
        getClassify(this, null, (res,err)=> {
          if (err) return console.log(err);
          this.classify = res.data;
        })
      },
    },
    created(){
      this.getTag();
      this.getClassify();
    },
    mounted(){

    }
  }
</script>

<style lang="scss" >
  .classify{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;


    .line{
      height: 0;
      line-height: 0;
      border: 2px solid  #555;
    }
    .tag-box,.classify-box{
        flex: 1;
        box-sizing: border-box;
        padding: 1rem 0;
        .el-tag + .el-tag {
          margin-left: 10px;
        }
        .button-new-tag {
          margin-left: 1rem;
          height: 5rem;
          line-height: 5rem;
          font-size: 2rem;
          padding-top: 0;
          padding-bottom: 0;
        }
        .input-new-tag {
          width: 9rem;
          height: 5rem;
          line-height: 5rem;
          margin-left: 10px;
          vertical-align: bottom;
        }
      .el-tag--medium {
        height: 5rem;
        line-height: 5rem;
        font-weight: bold;
      }

      .el-tag--medium:nth-child(odd){
        color: floralwhite;
        background: #555;
      }
      .el-tag--medium:nth-child(even){
        color: #E74C3C;
        background: #1ABC9C;
      }
      .el-tag{
        font-size: 2rem;
        cursor: pointer;
      }
        h1{
          color: #555;
          font-size: 2rem;
          font-weight: bold;
          padding:  0 0 1.5rem 0;
          span{
            font-size: 1.3rem;
            color: brown;
          }
        }
      }
      .tips{
        padding: 0 0.5rem;
        color: #0D1740;
        font-size: 1.3rem;
        font-weight: bold;
      }
  }
</style>
