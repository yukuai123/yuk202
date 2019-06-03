export default {

  data(){
   return{
     renderList: [], //每个分页的渲染数组
     list: [], //总数组
     pageSize: 10,
     currentPage: 1,
     isLoading: true
   }
  },

  methods: {

    //改变当前的页数
    changeCurrent(currentPage){
      this.currentPage = currentPage;
      this.renderList = this.getRenderList;
      console.log(this.renderList);
    },

    //做v-loading修改状态
    changeLoading(){
      this.isLoading = false;
    },

    //通过id删除
    handleDelete(id, apiName){
      this.$confirm('确认删除吗，骚年').then(()=>{
        this.$ajax('post', apiName,  { id: id}, ()=>{
          this.getTabList();
          this.$msgSuc('删除成功');
        })
      }).catch(err =>{
        console.log(err);
      })
    }
  },

  computed: {
    getRenderList(){
      let len = this.list.length || null;
      let total = this.getTotal;
      if (this.list && len){
        if (this.pageSize < len){
          let begin = (this.currentPage - 1 ) * this.pageSize, end = this.currentPage * this.pageSize;
          return this.currentPage !== total?
              this.list.slice(begin,  end):
              this.list.slice(begin);
        }else{
          return this.list.slice(0);
        }
      }
    },
    getTotal(){
      return Math.ceil(this.list.length / this.pageSize);
    },
  }

}
