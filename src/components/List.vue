<template> 
<div class="main">   
  <draggable class="list-group" :list="directory" group="people" style="display:flex" >
    <div v-for="(element,index) in directory" :key="index" :id="element.id">
       <div class="card" >    
            <el-row>
            <el-col :span="20" >
              <div class="grid-content bg-purple"  >
                <h3 style="cursor:pointer;" ref="titleShow" @click="titleShowTime(element.id,index)" class="tieude" >{{ element.title }} </h3>
              </div>                   
            </el-col>
            <el-col :span="4" >
              <div class="grid-content bg-purple"  @click="deleteDirectory(element.id)" ref="deleteIndex">
                <i class="el-icon-close closeeee" ></i>
              </div>                   
            </el-col>
            </el-row>
            <input type="text" class="title-input1"  @keydown.enter="noChange(index)" ref="indexInputTitle" v-model="inputDirectory" style="display:none" @blur="nothingtoshow(index)">
            <div class="list-card u-fancy-scrollbar" id="style-3">
              <draggable :list="element.cards" item-key="id" :id="directory.id" :move="test2" group="todo">
                <div class="sortable" v-for="(card,indexCard) in element.cards" :key="indexCard" :id="card.id">
                    <div class="list-card-labels">
                      <el-row>
                        <el-col :span="20" >
                        <div v-for="(label,indexLabel) in card.labels" :key="indexLabel">
                           <span class="card-label" :style="{backgroundColor: label.color}"></span>
                        </div>
                        </el-col>
                        <el-col :span="4" style="height:19px;float: right;">
                        <div class="lable-color2" ><button class="delete-icon" @click="deleteCard(card.id)"><i class="el-icon-close edit" ></i></button></div> 
                        </el-col>
                      </el-row>   
                    </div>
                    <el-row>
                      <el-col :span="24">
                        <div class="card-name2" @click="cardDetail(card.id)">
                          {{card.title}}
                        </div>
                      </el-col>
                    </el-row>
                    
                    <div class="card-button-mini" v-if="card.deadline !== null">
                      <el-button icon="el-icon-time" size="mini" type="danger" v-if="card.status == 1 " style="color: #fff;background-color: #ec9488;border:none !important">{{formatDate(card.deadline)}}</el-button>
                      <el-button icon="el-icon-time" size="mini" type="danger" v-if="card.status == 3 " style="color: #fff;background-color: #61bd4f;border:none !important">{{formatDate(card.deadline)}}</el-button>
                    </div>
                </div>

            </draggable>
          </div>
          <div ref="hidden5" style="display:none">
            <center>
              <textarea  cols="40" rows="10" class="text-area-add" placeholder="Nhập tiêu đề cho thẻ này..." ref="textCard"></textarea>
            </center>
          </div>
           <div class="add-card" slot="footer">
              <el-row>
                <el-col :span="24" >
                  <div class="grid-content bg-purple"  @click="showtime(element.id,element.cards,index)"  ref="hidden3" style="display:block;margin-left: -7px;">
                    <i class="el-icon-plus" style="margin-right:6px"><span class="text-font">Thêm thẻ khác</span></i>
                  </div>
                  
                </el-col>
              </el-row>
              <el-row >
                <div  ref="hidden4" style="display:none">
                  <el-col :span="6" style="margin-left:-15px;" ><div class="grid-content bg-purple" ></div>
                  <el-button type="success" size="small" @click="saveCard(index)">Thêm</el-button>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light" @click="hiden(index)">
                    <i class="el-icon-close closee" ></i>
                  </div>                 
                </el-col>
                </div>
                
              </el-row>
            </div>          
        </div>
    </div>  
       
   </draggable>

        <div class="card-directory" ref="cardDirectory">
          <div ref="hiddenDirectory" style="display:none">
            <div >
            <input type="text" class="input-add-directory" placeholder="Nhập tiêu đề danh sách" v-model="title">
          </div>
         <div class="add-card" slot="footer">
           <el-row >
            <div  ref="hidden4">
              <el-col :span="6" style="margin-left:-15px;" ><div class="grid-content bg-purple" ></div>
              <el-button type="success" size="small" @click="handleAddirectory" style="background-color: #5aac44;">Thêm danh sách</el-button>
            </el-col>
            <el-col :span="18" >
              <div class="grid-content bg-purple-light" @click="hidenn" style="margin-left:28px">
                <i class="el-icon-close closeee" style="color: #42526e;font-size: 24px;"></i>
              </div>                 
            </el-col>
            </div>           
            </el-row>
         </div>
        </div>
         
         </div>
         <div ref="buttonDirectory" style="display:block">
             <el-button icon="el-icon-plus"  @click="showAddDirectory" style="width:100%;color: #172b4d;
    opacity: 0.5;">Thêm danh sách khác</el-button>
          </div>

       
<!-- dialog chi tiết thẻ  -->
      <el-dialog
        :visible.sync="centerDialogVisible"
        :modalAppendToBody="false"      
        width="768px" class="bbb" >
        <span slot="title" style="font-size: 20px;font-weight: 600; backgroud-color:red;display:block" ref="titleCardInDetail" @click="showInput">{{cards.title}}</span>
        <span slot="title" style="display:none" ref="inputInCardDetail"><input type="text" class="title-input2" v-model="cards.title" @keydown.enter="editTitleCard(cards.title,cards.id)" @blur="nothing"></span>
        <el-row>
          <el-col :span="16">
            <div class="right">
              <div class="label-name1">NHÃN</div>
              <div class="line-label button-right">
                <div  v-for="(label,index) in cards.labels" :key="index">
                  <div class="label" :style="{backgroundColor:label.color}">{{label.name}}</div>
                </div>
                
                <div class="add-label" @click="rightDialogVisible = true"><i class="el-icon-plus"></i></div>
              </div>
              
              <div class="deadline">NGÀY HẾT HẠN</div>
              <div class="button-right" >
                <el-checkbox v-model="checked2" @change="changeStatusCard(cards.id)">
                  <div class="block">
                    <el-date-picker
                      v-model="cards.deadline"
                      type="datetime" style="width: 299px;"
                      >
                    </el-date-picker>
                    <div class="inline" ref="statusDeadline" v-if="cards.status == 1 " style="color: #fff;background-color: #ec9488;">QUÁ HẠN</div>
                    <div class="inline" ref="statusDeadline" v-if="cards.status == 2 " >GẦN HẾT HẠN</div>
                    <div class="inline" ref="statusDeadline" v-if="cards.status == 3 " style="color: #fff;background-color: #61bd4f;">HOÀN TẤT</div>
                  </div>
                </el-checkbox>
              </div>

              <div class="description">
                <i class="el-icon-s-unfold" style="margin-right:10px ; font-size: 21px;"></i>Mô tả
                <!-- <el-button size="small" class="edit-description"  ref="editButtonDes" @click="showFormEditDes">Chỉnh sửa</el-button> -->
                </div>
              <div class="button-right2" ref="cardDes" @click="showFormEditDes" @blur="closeForm">{{cards.description}}</div>
              <div class="button-right"  ref="editFormDes" v-if="cards.description == null">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="Thêm mô tả chi tiết hơn1..."
                  v-model="description"
                  @change="addDescription(cards.id)" style="background-color: rgba(9,30,66,.04);">
                </el-input>
              </div>
              <div class="button-right"  ref="editFormDes2" style="display:none">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="Thêm mô tả chi tiết hơn2..."
                  v-model="description"
                  @change="addDescription(cards.id)" style="background-color: rgba(9,30,66,.04);">
                </el-input>
              </div>

              <!-- Thêm mới 1 việc cần làm trong chi tiết thẻ -->
              <div class="loop-add-todo" v-for="(todo,index) in cards.check_lists" :key="index">
                <div class="todo"><i class="el-icon-success" ></i>{{todo.title}}
                <el-button style="float:right" size="small" @click="deleteCheckList(todo.id,cards.id)">Xóa </el-button>
              </div>
              <div class="percent-bar">
                <el-progress :percentage="50"></el-progress>
              </div>
              <div class="listChild" v-for="child in todo.check_list_childs" :key="child.id">
                <el-row>
                  <el-col :span="2" > 
                    <div ref="checkbox" style="display:block">
                      <el-checkbox v-model="checked3" @change="doneChild(child.id,cards.id)"></el-checkbox>
                    </div>
                  </el-col>
                  <el-col :span="22" >
                      <div ref="nameOfChild" style="display:block">
                          <span @click="showFormEditChild(index,child.id)">{{child.title}}</span>                  
                          <span style="float:right;cursor: pointer;" @click="deleteCheckListChild(child.id,cards.id)" ref="buttonDeleteChild"><i class="el-icon-delete"></i></span>
                      </div>
                      <input type="text" class="title-input1" style="display:none" ref="inputEditChild" @keydown.enter="saveEditCheckListChild(cards.id,index)" v-model="inputEditCheckListChild">
                  </el-col>
                </el-row>
              </div>

              <!-- form thêm công việc con -->
              <div class="add-new-todo" ref="hidden1" style="display:none">
                <div>
                  <el-input placeholder=" Thêm một mục" v-model="inputCheckListChild"></el-input>
                </div>
                <div class="button-todo-detail">
                  <el-button type="success" size="small" @click="saveCheckListChild(todo.id,cards.id)">Thêm</el-button>
                  <el-button  icon="el-icon-close" size="small" @click="hide"></el-button>
                </div>
              </div>
              <div class="button-todo" ref="hidden2" style="display:block">
                 <el-button @click="addNewTodo(index)" size="small">Thêm một mục</el-button>
              </div>
              </div>                   
            </div>
          </el-col>

          <el-col :span="8">
            <div class="left">
              <div>
                THÊM VÀO THẺ
              </div>
              <div class="button-right">
                <el-button  icon="el-icon-circle-plus-outline" size="small" @click="getLabel" class="color-button-gray" style="width: 140px;height: 32px;font-size: 14px;">Nhãn</el-button>
              </div>
              <div class="button-right">
                <el-button icon="el-icon-circle-check" @click="dialogTodoVisible = true" class="color-button-gray" style="width: 140px;height: 32px;font-size: 14px;" size="small">Việc cần làm</el-button>
              </div>
              
              <div class="button-right deline">
                <div class="input-deline">
                  <el-date-picker
                    v-model="value1"
                    type="datetime"
                     style="width:144px;cursor:pointer" @change="saveDeadline(cards.id)"
                    >
                  </el-date-picker>
                </div>
                <span class="el-icon-alarm-clock" style="margin-left: 18px;"></span>     
                <span style="line-height: 30px;margin-left: 3px;">Ngày hết hạn</span>
              </div>
              <div class="button-right">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="3"  
                  >
                  <el-button icon="el-icon-paperclip" class="color-button-gray" style="width: 140px;height: 32px;font-size: 14px;" size="small">Đính kèm</el-button>
                </el-upload>
              </div>
            </div>
          </el-col>
      </el-row>
      </el-dialog>

<!-- dialog button nhãn-->
      <el-dialog  
        :visible.sync="rightDialogVisible"
        :modalAppendToBody="false"
        :append-to-body="true"
        center
        width="359px" class="form-add-label" style="height:500px">
        <span slot="title" v-if="labelDialog == false">Nhãn</span>
        <span slot="title" v-if="labelDialog == true"><span style="float: left;cursor: pointer;" @click="closeEditLabel"><i class="el-icon-back"></i></span>Chỉnh sửa nhãn</span>
        <div class="input-search" style="display:block" ref="labelhidden1">
          <!-- <el-input placeholder="Tìm nhãn" v-model="searchLabel" @change="searchText"></el-input> -->
          <input type="text" placeholder="Tìm nhãn" v-model="searchLabel" @keydown.enter="searchText" class="title-input3">
           <div class="body-add-label">
             <div class="label-name1">NHÃN</div>
             <div v-for="(label,index) in labels" :key="index">
               <el-row class="row1">
                <el-col :span="21">
                 <div class="lable-color1" :style="{backgroundColor:label.color}">
                   <el-row>
                    <el-col :span="21">
                    <div class="lable-top-color" @click="attachLabel(label.id,cards.id)">{{label.name}}</div>        
                    </el-col>
                    <el-col :span="3">
                      <div class="lable-top-color2" ><i class="el-icon-check"></i></div>
                    </el-col>
                   </el-row>
                   </div>           
               </el-col>
                <el-col :span="3">
                  <div class="lable-color2"><button class="pencil-icon" @click="showFormEditLabel(label.id)"><i class="el-icon-edit edit"></i></button></div>
                </el-col>
               </el-row>                  
             </div>

           </div>

           <div class="add-new-lable" @click="showFormAddLabel" ref="buttonlabelhidden">
             <center style="line-height: 31px;">Tạo nhãn mới</center>
           </div>
        </div>
        <!-- Tạo mới nhãn -->
        <div style="height:250px;display:none" ref="labelhidden2">
          <form style="line-height: 40px">
             <label for="Tên">Tên</label>
             <el-input placeholder="" v-model="nameLabel"></el-input>
             <label for="">Chọn một màu</label>
             <div style="margin-top: 3px;">
               <span class="card-label-detail1" @click="color('#61bd4f')">
                 <center style="display:none" ref="fully1"><span style="display:block" class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
              <span class="card-label-detail2" @click="color('#f2d600')">
                 <center style="display:none" ref="fully2"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail3" @click="color('#ff9f1a')">
                 <center style="display:none" ref="fully3"><span style="display:block" class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail4" @click="color('#eb5a46')">
                 <center style="display:none" ref="fully4"><span style="display:block" class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail5" @click="color('#c377e0')">
                 <center style="display:none" ref="fully5"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail6" @click="color('#0079bf')">
                 <center style="display:none" ref="fully6"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail7" @click="color('#00c2e0')">
                 <center style="display:none" ref="fully7"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail8" @click="color('#51e898')">
                 <center style="display:none" ref="fully8"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail9" @click="color('#ff78cb')">
                 <center style="display:none" ref="fully9"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail10" @click="color('#344563')">
                 <center style="display:none" ref="fully10"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
             </div>
             <div>
               <el-button type="success" size="small" @click="saveLabel(cards.id)">Tạo mới</el-button>
             </div>
          </form>
          
        </div>
       <!-- Chỉnh sửa nhãn  -->
      <div style="height:250px;display:none" ref="labelhidden3">
          <form style="line-height: 40px">
             <label for="Tên">Tên</label>
             <el-input placeholder="" v-model="nameLabel2"></el-input>
             <label for="">Chọn một màu</label>
             <div style="margin-top: 3px;">
               <span class="card-label-detail1" @click="colorEdit('#61bd4f')">
                 <center style="display:none" ref="fully1"><span style="display:block" class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
              <span class="card-label-detail2" @click="colorEdit('#f2d600')">
                 <center style="display:none" ref="fully2"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail3" @click="colorEdit('#ff9f1a')">
                 <center style="display:none" ref="fully3"><span style="display:block" class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail4" @click="colorEdit('#eb5a46')">
                 <center style="display:none" ref="fully4"><span style="display:block" class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail5" @click="colorEdit('#c377e0')">
                 <center style="display:none" ref="fully5"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail6" @click="colorEdit('#0079bf')">
                 <center style="display:none" ref="fully6"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail7" @click="colorEdit('#00c2e0')">
                 <center style="display:none" ref="fully7"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail8" @click="colorEdit('#51e898')">
                 <center style="display:none" ref="fully8"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail9" @click="colorEdit('#ff78cb')">
                 <center style="display:none" ref="fully9"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
               <span class="card-label-detail10" @click="colorEdit('#344563')">
                 <center style="display:none" ref="fully10"><span  class="icon-done"><i class="el-icon-check"></i></span></center>
               </span>
             </div>
             <div>
               <el-button type="success" size="small" @click="editLabel(cards.id)">Lưu</el-button>
               <el-button type="danger" size="small" style="margin-left: 168px;" @click="deleteLabel(cards.id)">Xóa</el-button>
             </div>
          </form>
          
        </div>
      </el-dialog>
    
<!-- dialog button việc cần làm -->
      <el-dialog
        :visible.sync="dialogTodoVisible"
        width="30%"
        center
        style="font-size:15px"
        >
        <span slot="title" style="color: #5e6c84;font-size: 15px;" class="title-todo">Thêm danh sách công việc</span>
        <hr style="margin-top: -20px;">
        <div class="todo-body">
          <div>
            Tiêu đề
          </div>
        <div class="todo-input">
          <el-input placeholder="Việc cần làm" v-model="inputTodo"></el-input>
        </div>
        </div>       
         <el-button type="success" style="margin-top: 37px;" @click="addCheckList(cards.id)">Thêm</el-button>
        
      </el-dialog>
</div>
 
</template>

<script> 
import draggable from 'vuedraggable'
import api from '../api'
import moment from 'moment'
export default {
  components: {
    draggable,
  },
  data () {
      return {
        directory:[],
        centerDialogVisible: false,
        rightDialogVisible: false,
        dialogTodoVisible: false,
        links: [],
        state: '',
        input:'',
        timeout:  null,
        title:'',
        checked:'',
        titleCard:'',
        cards:[],
        showTitle:false,
        hideTitle:true,
        showTitleList:true,
        hideTitleList:false,
        indexCard:'',
        directoryId:'',
        inputDirectory:'',
        textCard:'',
        idCard:'',
        nameLabel:'',
        color1:'',
        labels:[],
        titleCardDetail:'',
        description:'',
        label: false,
        inputTodo:'',
        descriptionShow:false,
        value1:'',
        checked2:false,
        checked3:false,
        inputCheckListChild:'',
        labelDialog:false,
        nameLabel2:'',
        color2:'',
        labelId:'',
        inputEditCheckListChild:'',
        childId:'',
        searchLabel:''
      }
  },
  methods: {
    test2(event) {
      console.log(event)
      let a = event.to.parentElement
      let b = a.parentElement
      let id = event.draggedContext.element.id
      let data = {
        index:event.draggedContext.futureIndex,
        directory_id : b.parentElement.getAttribute('id')
      }
      api.changeIndexCard(data,id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.getData()
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    attachLabel(id,cardId){
      let data = {
        label_id:id
      }
      api.attachLabel(data,cardId).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
        this.rightDialogVisible = false
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    deleteCheckListChild(id,cardId){
      api.deleteCheckListChild(id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    doneChild(childId,cardId){
      let data = {
        status:1
      }
      api.changeStatusChild(data,childId).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
        this.checked3 == true
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    saveCheckListChild(id,cardId){
      let data = {
        title: this.inputCheckListChild,
        check_list_id: id
      }
      api.storeCheckListChild(data).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    saveEditCheckListChild(cardId,index){
      let data = {
        title: this.inputEditCheckListChild,
      }
      api.updateCheckListChild(data,this.childId).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
        this.$refs.inputEditChild[index].style.display = 'none';
        this.$refs.checkbox[index].style.display = 'block';
        this.$refs.nameOfChild[index].style.display = 'block';
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    saveDeadline(id) {
      let date = moment(this.value1).lang('vi').format('YYYY-MM-DD HH:mm:ss');
      let data = {
        deadline: date
      }
       api.storeDeadline(data,id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(id);
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    closeForm(){
      alert(1)
      this.$refs.editFormDes2.style.display = 'none';
      this.$refs.cardDes.style.display = 'block';
    },
    formatDate(dateString){
      return moment(dateString).format('DD/MM/YYYY')
    },
    changeStatusCard(id) {
      let data = {
        status: 3
      }
      api.changeStatusCard(data,id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(id);
        this.getData();
        this.checked2 == true
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    addNewTodo(index) {
      this.$refs.hidden1[index].style.display = 'block';
      this.$refs.hidden2[index].style.display = 'none';
    },
    showFormEditChild(index,id){
      this.$refs.inputEditChild[index].style.display = 'block';
      this.childId = id
      this.$refs.checkbox[index].style.display = 'none';
      this.$refs.nameOfChild[index].style.display = 'none';
    },
    hide() {
      this.$refs.hidden1.style.display = 'none';
      this.$refs.hidden2.style.display = 'block';
    },
    showtime(directoryId, indexCard,index){
      this.$refs.hidden3[index].style.display = 'none';
      this.$refs.hidden4[index].style.display = 'block';
      this.$refs.hidden5[index].style.display = 'block';
      this.directory_id = directoryId
      this.indexCard = indexCard
      
    },
    showFormEditDes(){
      this.$refs.editFormDes2.style.display = 'block';
      this.$refs.cardDes.style.display = 'none';
    },
    showInput() {
       this.$refs.titleCardInDetail.style.display = 'none';
       this.$refs.inputInCardDetail.style.display = 'block';
    },
    nothing() {
      this.$refs.titleCardInDetail.style.display = 'block';
      this.$refs.inputInCardDetail.style.display = 'none';
    },
    showFormAddLabel(){
       this.$refs.labelhidden2.style.display = 'block';
       this.$refs.labelhidden1.style.display = 'none';
       this.$refs.buttonlabelhidden.style.display = 'none';
    },
    showFormEditLabel(id){
      this.labelId = id
        this.labelDialog = true
       this.$refs.labelhidden3.style.display = 'block';
       this.$refs.labelhidden1.style.display = 'none';
       this.$refs.buttonlabelhidden.style.display = 'none';
    },
    closeEditLabel(){
       this.labelDialog = false
       this.$refs.labelhidden3.style.display = 'none';
       this.$refs.labelhidden1.style.display = 'block';
       this.$refs.buttonlabelhidden.style.display = 'block';
    },
    hiden(index){
      this.$refs.hidden3[index].style.display = 'block';
      this.$refs.hidden4[index].style.display = 'none';
      this.$refs.hidden5[index].style.display = 'none';
     
    },
    cardDetail(id) {
      this.centerDialogVisible = true
      api.detailCard(id).then((response) => {
        this.cards = response.data.data;
        // console.log(this.cards)
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    titleShowTime(directoryId,index){
      this.directory_id = directoryId;
      this.$refs.indexInputTitle[index].style.display = 'block';
      this.$refs.titleShow[index].style.display = 'none';
      this.$refs.deleteIndex[index].style.display = 'none';
    },
    nothingtoshow(index){
      this.$refs.indexInputTitle[index].style.display = 'none';
      this.$refs.titleShow[index].style.display = 'block';
      this.$refs.deleteIndex[index].style.display = 'block';
    },
    noChange(index){
       let data = {
        title: this.inputDirectory,
      }
      let id = this.directory_id
  
      api.updateDirectoryTitle(data,id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.getData()
        this.$refs.indexInputTitle[index].style.display = 'none';
        this.$refs.titleShow[index].style.display = 'block';
      this.$refs.deleteIndex[index].style.display = 'block';
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
      
    },
    showAddDirectory(){
      this.$refs.hiddenDirectory.style.display = 'block';
      this.$refs.buttonDirectory.style.display = 'none';
      this.$refs.cardDirectory.style.height = '100px';
      this.$refs.cardDirectory.style.width = '1000px';
    },
    hidenn(){
       this.$refs.hiddenDirectory.style.display = 'none';
      this.$refs.buttonDirectory.style.display = 'block';
    },
    handleAddirectory(){
      let data = {
        title: this.title,
        index: this.directory.length + 1
      }
      api.storeDirectory(data).then(() => {
        this.$message({message:'Success',type:'success'});
        this.getData()
        this.title=''
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    getData(){
      api.getDirectory().then((response) => {
        // console.log(response.data.data)
        this.directory = response.data.data
        // this.cards = response.data.data.card
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    saveCard(index){
      let data = {
        title: this.$refs.textCard[index].value,
        index: this.indexCard.length + 1,
        directory_id: this.directory_id
      }
       api.storeCard(data).then(() => {
        this.$message({message:'Success',type:'success'});
        this.getData();
        this.$refs.textCard[index].value = ""
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    deleteDirectory(id) {
       api.deleteDirectory(id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.getData();
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    deleteCard(id) {
       api.deleteCard(id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.getData();
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    color(colorLabel) {
      if(colorLabel == '#61bd4f') {
        this.$refs.fully1.style.display = 'block';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#f2d600'){
        this.$refs.fully2.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#ff9f1a'){
        this.$refs.fully3.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#eb5a46'){
        this.$refs.fully4.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#c377e0'){
        this.$refs.fully5.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#0079bf'){
        this.$refs.fully6.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#00c2e0'){
        this.$refs.fully7.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#51e898'){
        this.$refs.fully8.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
       if(colorLabel == '#ff78cb'){
        this.$refs.fully9.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
       if(colorLabel == '#344563'){
        this.$refs.fully10.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
      }
      this.color1 = colorLabel
    },
    colorEdit(colorLabel) {
      if(colorLabel == '#61bd4f') {
        this.$refs.fully1.style.display = 'block';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#f2d600'){
        this.$refs.fully2.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#ff9f1a'){
        this.$refs.fully3.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#eb5a46'){
        this.$refs.fully4.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#c377e0'){
        this.$refs.fully5.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#0079bf'){
        this.$refs.fully6.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#00c2e0'){
        this.$refs.fully7.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
      if(colorLabel == '#51e898'){
        this.$refs.fully8.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
       if(colorLabel == '#ff78cb'){
        this.$refs.fully9.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully10.style.display = 'none';
      }
       if(colorLabel == '#344563'){
        this.$refs.fully10.style.display = 'block';
        this.$refs.fully1.style.display = 'none';
        this.$refs.fully2.style.display = 'none';
        this.$refs.fully3.style.display = 'none';
        this.$refs.fully4.style.display = 'none';
        this.$refs.fully5.style.display = 'none';
        this.$refs.fully6.style.display = 'none';
        this.$refs.fully7.style.display = 'none';
        this.$refs.fully8.style.display = 'none';
        this.$refs.fully9.style.display = 'none';
      }
      this.color2 = colorLabel
    },
    saveLabel(cardId){
      let data = {
        name:this.nameLabel,
        color: this.color1,       
      }
      api.storeLabel(data,cardId).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
        this.nameLabel='';
        this.rightDialogVisible = false;
        this.getData();
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    editLabel(cardId){
      let data = {
        name:this.nameLabel2,
        color: this.color2,       
      }
      api.editLabel(data,this.labelId).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
        this.nameLabel2='';
        this.rightDialogVisible = false;
        this.getData();
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    addCheckList(cardId){
      let data = {
        title:this.inputTodo,
        card_id: cardId,       
      }
       api.storeCheckList(data).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
        this.nameLabel='';
        this.dialogTodoVisible = false;
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    getLabel(){
      api.getLabel().then((response) => {
        this.labels = response.data.data
        this.rightDialogVisible = true
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    editTitleCard(title,id){
      let data = {
        title: title,
      }
      api.updateCard(data,id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.getData();
        this.cardDetail(id);
        this.$refs.inputInCardDetail.style.display = 'none';

      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    addDescription(id){
      let data = {
        description: this.description
      }
      api.updateCard(data,id).then(() => {
        this.$message({message:'Success',type:'success'});
        this.$refs.editFormDes.style.display = 'none';
        this.$refs.editFormDes2.style.display = 'none';
        this.cardDetail(id);
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    deleteCheckList(checklistId,id){
      api.deleteCheckList(checklistId).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(id);
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    deleteLabel(cardId){
      api.deleteLabel(this.labelId).then(() => {
        this.$message({message:'Success',type:'success'});
        this.cardDetail(cardId);
        this.rightDialogVisible = false;
        this.getData();
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    },
    searchText() {
       let params = {
          q:this.searchLabel
       }
        api.searchLabel(params).then((response) => {
        this.labels = response.data.data
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    }
  },
  mounted() {
    this.getData();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "src/assets/scss/style";


</style>
