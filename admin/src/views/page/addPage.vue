<template>
  <div class="addPage">
    <h1>留下一些痕迹吧</h1>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>

    <div class="operate-box">
      <!--v-bind:disabled="!content.length"-->
      <el-button @click="outerVisible = true" type="primary">{{ !$route.query.id? '保存下来': '进入修改' }}</el-button>
    </div>

    <el-dialog title="保存内容" :visible.sync="outerVisible">
      <el-dialog
        height="100%"
        title="预览内容"
        :visible.sync="innerVisible"
        append-to-body>

        <div class="content-box" v-html="content">
          {{ content }}
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">关闭</el-button>
        </div>
      </el-dialog>

      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item prop="classify_id" label="分类">
          <el-select v-model="form.classify_id" placeholder="选择分类">
            <el-option v-for="i in classify" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="tag_id" label="标签">
          <el-select v-model="form.tag_id" placeholder="选择标签">
            <el-option v-for="i in tag" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item required label="创建时间">
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              type="date" placeholder="选择日期" v-model="date1" style="width: 100%;"></el-date-picker>
          </el-col>


          <el-col class="line" :span="2">-</el-col>

          <el-col :span="11">
            <el-time-picker
              value-format="HH:mm:ss"
              v-model="date2"
              placeholder="选择时间">
            </el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="是否发布">
          <el-switch active-color="#13ce66"
                     inactive-color="#ff4949"
                     inactive-text="不了8"
                     active-text="okk"
                     :inactive-value="0"
                     :active-value="1"
                     v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="success" plain @click="innerVisible = true">预览</el-button>
        <el-button type="primary" plain @click="savePage('form')">{{ hasId? '更新': '保存' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import filter from '@/util/filter';
  import {
    getTag, getClassify, getAllPage,
    getAllPageById, addPage, updatePage
  } from "@/util/apiMethods";

  export default {
    name: "addPage",
    data() {
      return {
        content: '',
        editorOption: {},  //插件配置对象
        outerVisible: false,
        innerVisible: false,
        hasId: false, //更新标志

        page_id: null,
        date1: '', //日期&时间
        date2: '',
        tag: [],  //标签列表
        classify: [], //分类列表
        form: {
          title: '',
          classify_id: '',
          tag_id: '',
          status: 0
        },

        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          classify_id: [
            {required: true, message: '请选择文章分类', trigger: 'change'}
          ],
          tag_id: [
            {required: true, message: '请选择标签', trigger: 'change'}
          ],

        }
      }
    },
    methods: {
      onEditorBlur(e) {

      },
      onEditorFocus(e) {

      },
      onEditorChange(e) {

      },
      savePage(formName) {
        this.$refs[formName].validate((valid) => {
          if (!this.content.length) return this.$msgWar('内容不能为空');
          if (valid) {
            this.form['content'] = this.content;
            this.form['create_time'] = this.date1 + ' ' + this.date2;
            if (this.hasId) {
              this.form['id'] = parseInt(this.page_id);
              updatePage(this, this.form, (res, err) => {
                if (err) {
                  this.$msgErr('好像失败了 ￣へ￣');
                } else {
                  this.$msgSuc('更新成功 (￣▽￣)~*');
                }
              })
            } else {
              addPage(this, this.form, (res, err) => {
                if (err) {
                  this.$msgErr('好像失败了 ￣へ￣');
                } else {
                  this.$msgSuc('文章+1 ︿(￣︶￣)︿');
                }
              })
            }

            getAllPage(this, null, (res, err) => {
              if (err) return this.$msgErr('似乎出了什么问题');
            });
              this.$router.push('/page/list');
          } else {
            console.log('error submit!!');
            return false;
          }
          this.outerVisible = false;
        });
      },


      getTag() {
        getTag(this, null, (res, err) => {
          if (err) return console.log(err);
          this.tag = res.data;
        })
      },
      getClassify() {
        getClassify(this, null, (res, err) => {
          if (err) return console.log(err);
          this.classify = res.data;
        })
      },
      changeHasId() {
        if (this.$route.query.id) {
          this.hasId = true;
          this.page_id = this.$route.query.id;
        }
      },
      getPageById() {
        if (this.hasId) {
          getAllPageById(this, {id: this.page_id}, (res, err) => {
            if (err) return this.$msgErr('不存在该文章');
            res = res.data[0];
            this.form['tag_id'] = parseInt(res.tag_id);
            this.form['classify_id'] = parseInt(res.classify_id);
            this.form['title'] = res.title;
            this.date1 = filter.getTime(res.create_time).split(' ')[0];
            this.date2 = filter.getTime(res.create_time).split(' ')[1];
            this.content = res.content;
            this.form['status'] = res.status;
          })
        }
      }
    },
    created() {
      this.changeHasId();
    },
    mounted() {
      this.getTag();
      this.getClassify();
      this.getPageById();
    }

  }
</script>

<style lang="scss">
  .addPage {
    h1 {
      padding: 2rem;
      text-align: center;
      font-weight: bold;
      font-size: 2.5rem;
      color: #555;
    }
    height: 100%;
    .quill-editor {
      border: 1px solid #555 !important;
      min-height: 80%;
      max-height: 80%;
      overflow-y: auto;
      .ql-toolbar {
        position: fixed;
        z-index: 999;
        background: #ccc;
      }
      .ql-container {
        margin-top: 3rem;
        .ql-editor {
          min-height: 50rem;
        }
      }
    }
    .operate-box {
      padding: 1rem;
      text-align: right;
    }
  }

  .el-dialog__wrapper {
    .el-dialog {
      .el-dialog__body {
        .content-box {
          line-height: 1.5;
        }
      }
    }
  }

</style>
