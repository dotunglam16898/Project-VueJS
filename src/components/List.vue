<template> 
<div class="main">     
        <div class="card">
          <h1>hello</h1>
          <div class="list-card u-fancy-scrollbar" id="style-3">
            <draggable v-model="myArray" ghost-class="ghost" @start="drag=true" @end="drag=false">
            <transition-group>
                <div class="sortable" v-for="element in myArray" :key="element.id" @click="centerDialogVisible = true">
                    {{element.name}}
                </div>
               
            </transition-group>
            </draggable>           
          </div>
           <div class="add-card" slot="footer">
                  <i class="el-icon-plus"></i>Thêm mới
            </div>          
        </div>

        <div class="card">
          <h1>hello2</h1>
          <div class="list-card u-fancy-scrollbar" id="style-3">
            <draggable v-model="myArray" ghost-class="ghost" @start="drag=true" @end="drag=false">
            <transition-group>
                <div class="sortable" v-for="element in myArray" :key="element.id">
                    {{element.name}}
                </div>
               
            </transition-group>
            </draggable>           
          </div>
           <div class="add-card" slot="footer">
                  <i class="el-icon-plus"></i>Thêm mới
            </div>          
        </div>

        <!-- <el-button type="text" @click="centerDialogVisible = true">Click to open the Dialog</el-button> -->
      <el-dialog
        title="test dialog"
        :visible.sync="centerDialogVisible"
        :modalAppendToBody="false"
        
        width="768px" class="bbb">
        <el-row>
          <el-col :span="16">
            <div class="right">
              <div>NHÃN</div>
              <div class="line-label button-right">
                <div class="label">nhãn 1</div>
                <div class="add-label"><i class="el-icon-plus"></i></div>
              </div>

              <div class="deadline">NGÀY HẾT HẠN</div>
              <div class="button-right">
                <el-checkbox v-model="checked">
                  <div class="block">
                    <el-date-picker
                      v-model="value1"
                      type="datetime"
                      placeholder="Select date and time">
                    </el-date-picker>
                  </div>
                </el-checkbox>
              </div>

              <div class="description"><i class="el-icon-s-unfold" style="margin-right:10px ; font-size: 21px;"></i>Mô tả</div>
              <div class="button-right">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="Thêm mô tả chi tiết hơn..."
                  v-model="textarea2">
                </el-input>
              </div>

              <div class="todo"><i class="el-icon-success" ></i>Việc cần làm
                <el-button style="margin-left:296px">Xóa</el-button>
              </div>
              <div class="percent-bar">
                <el-progress :percentage="50"></el-progress>
              </div>
              <div class="button-todo">
                 <el-button>Thêm một mục</el-button>
              </div>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="left">
              <div>
                THÊM VÀO THẺ
              </div>
              <div class="button-right">
                <el-button icon="el-icon-circle-plus-outline" >Nhãn</el-button>
              </div>
              <div class="button-right">
                <el-button icon="el-icon-circle-check" >Việc cần làm</el-button>
              </div>
              <div class="button-right">
                <el-button icon="el-icon-time" >Ngày bắt đầu</el-button>
              </div>
              <div class="button-right">
                <el-button icon="el-icon-time" >Ngày hết hạn</el-button>
              </div>
              <div class="button-right">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button icon="el-icon-paperclip" >Đính kèm</el-button>
                </el-upload>
              </div>
            </div>
            </el-col>
      </el-row>
        <!-- <span></span>
        <span slot="footer" class="dialog-footer">
          
        </span> -->
      </el-dialog>
     
</div>
 
</template>

<script> 
import draggable from 'vuedraggable'
export default {
  components: {
            draggable,
  },
  data () {
      return {
        myArray: [
          { name: "1" , id: 0},
          { name: "2" , id: 1},
          { name: "3" , id: 2},
          
        ],
        centerDialogVisible: false,
      }
  },
  methods: {
    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  display: flex;
  text-align: left;
  line-height: 17px;
  // height: 100%;
  // overflow-x: scroll;
 
}
.card {
  background-color: #ebecf0;
  width: 272px;
  // height: 200px;
  max-height: 100%;
  // border: 1px solid black;
  margin-left: 8px;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.title {
  height: 51px;
  border: 1px solid black  !important;
}
.body-card{
  border: 1px solid blue;
}
.sortable{
  background-color: white;
  cursor: pointer;
  margin: 0 4px;
  padding: 0 4px;
  margin-bottom: 10px;
  border-radius: 3px;
  height: 60px;
  
}
.add-card {
  background-color: #ebecf0;
  cursor: pointer;
  margin: 0 4px;
  padding: 0 4px;
  margin-bottom: 10px;
  height: 42px;
  color: #5e6c84 ;
  font-size: 14px;
  line-height: 52px;
  font-weight: 400;
  margin-left: 20px;
}
.main .sortable-drag {
  opacity: 1;
}
.list-card {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100%;
  // height: 500px;
}
.u-fancy-scrollbar::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}
.left{
  // text-align: center;
  // border: 1px solid blue;
  margin-left: 30px;
}
.right {
  // border: 1px solid red;
}
.dialog-test{
  // background-color: red;
}
.label {
  // border: 1px solid black;
  background-color: chartreuse;
  border-radius: 3px;
    box-sizing: border-box;
    display: block;
    float: left;
    font-weight: 600;
    height: 32px;
    line-height: 32px;
    margin: 0 4px 4px 0;
    min-width: 40px;
    padding: 0 12px;
    width: auto;
    color:  #fff;;
}
.add-label{
   float: left;
   border-radius: 3px;
    box-sizing: border-box;
    display: block;
    height: 32px;
    line-height: 32px;
    margin: 0 4px 4px 0;
    min-width: 40px;
    padding: 0 12px;
    width: auto;
    background-color: rgba(9,30,66,.04);
    cursor: pointer;
}
.description {
  margin-top: 33px;
  font-size: 17px;
  // margin-left: 10px;
}
.deadline {
  margin-top: 64px;
}
.el-date-editor.el-input{
  // margin-left: 10px;
}
.todo {
  margin-top: 64px;
  font-size: 17px;
}
.percent-bar{
  margin-top: 24px;
}
.button-todo{
  margin-top: 10px;
}
.button-right{
  margin-top: 10px
}

.bbb__body{
  background-color: red  !important;
}
</style>
