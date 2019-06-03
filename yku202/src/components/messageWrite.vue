<template>
    <div class="messageWrite">
      <textarea name="" class="box" id="" cols="80" rows="6"></textarea>
      <div class="submit-box">
        <span @click="showInfoBox" class="iconfont">&#xe619;</span>
        <div :ref="`infoBox${parent_id||''}`" class="submit-content">
          <label class="nike-name" for="nikeName">
            昵称(显示)
            <input id="nikeName" type="text">
          </label>
          <label class="e-mail" for="eMail">
            邮箱(隐藏)
            <input  id="eMail" type="text">
          </label>
          <div class="submit" ><span @click="handleClickSubmit">留言</span></div>
        </div>
      </div>
      <confirm ref="confirm"></confirm>
    </div>
</template>

<script>
  import util from '@/util/filter';
  import confirm from '@/components/confirm';
  let getTime = util.getTime;
  import {addMsg} from '@/util/apiMethods';

  export default {
    name: "messageWrite",
    props: ['parent_id','page_id'],
    methods: {
      handleClickSubmit(){
        let parent_id = this.parent_id || '';
        //通过ref的方式拿到的添加参数
        let parent = this.$refs['infoBox'+parent_id],
          nickname = parent.children[0].lastElementChild.value,
          eMail = parent.children[1].lastElementChild.value,
          content = parent.parentNode.previousElementSibling.value;

        //验证数据
        if (!nickname.length) return this.$refs.confirm.showConfirm('请输入用户昵称', 'waring');
        if (!content.length) return this.$refs.confirm.showConfirm('请输入留言内容', 'waring');
        if (!eMail.length) return this.$refs.confirm.showConfirm('请输入Email, 方便交流', 'waring');
        const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (!re.test(eMail)) return this.$refs.confirm.showConfirm('请输入格式正确的e-mail, 方便交流', 'waring');


        let param = {
          content,
          create_time: getTime(new Date()),
          nickname,
          e_mail: eMail,
          status: 0,
          parent_id: this.parent_id,
          page_id: this.page_id
        };

        addMsg(this, param, (res, err)=>{
          if (err) return console.log(err);
          parent.children[0].lastElementChild.value = '';
          parent.children[1].lastElementChild.value = '';
          parent.parentNode.previousElementSibling.value = '';
          this.$store.commit('submit');
        });

      },
      showInfoBox(){
        let parent_id = this.parent_id || '';
        const box = this.$refs['infoBox'+parent_id];
        this.flag = !this.flag;
        if (!this.flag){
          box.style.height = 0;
        } else{
          box.style.height = '13rem';
        }
      },
    },
    components: {
      confirm
    }
  }
</script>

<style lang="scss">

  .messageWrite{
    .box{
      resize:none;
      display: block;
      width:95%;
      height:100%;
      background: rgb(248, 248, 248);
      outline: none;
      border: none;
      border-radius: 8px;
      padding: 2rem;
      font-size: 2rem;
      font-weight: bold;
      border-bottom: 1px solid #555;
    }
    .submit-box{
      box-sizing: border-box;
      padding: 1rem 2rem;
      text-align: right;
      font-size: 1.3rem;
      font-weight: bold;
      .iconfont{
        font-size: 2rem;
        display: inline-block;
        padding: 0.5rem 1.5rem;
        background: #003CBD;
        color: lightyellow;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.5s ease;
      }
      .iconfont:hover{
        background: #ffffff;
        color: crimson;
        transition: all 0.5s ease;
      }

      .submit-content{
        transition: all 0.8s ease;
        height: 0;
        overflow: hidden;
        .nike-name{
          display: block;
          padding: 1rem 0;
        }
        input{
          border-radius: 0.5rem;
          border: 1px solid $theme-line-color;
          padding: 0.5rem;
          outline: none;
        }
        .submit{
          font-weight: bold;
          padding-top: 1rem;
          span{
            background: #42B983;
            padding: 0.5rem;
            border-radius: 0.6rem;
            letter-spacing: 2px;
            cursor: pointer;
          }
        }

      }
    }
  }
</style>
