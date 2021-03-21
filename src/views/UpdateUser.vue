<template> 
 <div class="loginWrap">
     <main>
         <div class="form">
             <div class="logoWrap">
                 <!-- <img src="" class="logo"> -->
                 <h3>Chỉnh sửa thông tin</h3>
             </div>
             <el-row>
                <el-col :span="12">
                    <div class="right">
                        <div class="formInputWrap">
                            <div class="input-wrap">
                              <span>Nhập tên</span>                   
                            <input type="text"  class="sui-input" v-model="name2">
                            </div>
                        </div>
                        <!-- <div class="formInputWrap">
                            <div class="input-wrap">                     
                            <input type="text"  class="sui-input"  :value="authUser.email" v-model="email">
                            
                            </div>
                        </div> -->

                        <!-- <h3>Cập nhật mật khẩu</h3>
                        <div class="formInputWrap">
                            <div class="input-wrap">                     
                            <input type="password" placeholder="Nhập mật khẩu" class="sui-input"  >
                            
                            </div>
                        </div>
                        <div class="formInputWrap">
                            <div class="input-wrap">                     
                            <input type="password" placeholder="Nhập lại mật khẩu" class="sui-input"  >
    
                            </div>
                        </div> -->
                        <button class="submitButton" @click="updateUser">          
                            <span>Lưu</span>             
                        </button>
                        <div class="backLogin" style="margin-top:25px">
                            <div class="previous">
                                <router-link to="/admin" style="text-decoration:none">
                                <span style="color:#0080dd;"> <i class="el-icon-back"></i> Trở về </span>
                                </router-link>
                                <span style="color:#0080dd;float:right;cursor: pointer;" @click="changePasswordVisible = true"> Đổi mật khẩu </span>
                            </div>
                        </div>
                         <el-dialog
                          title="Đổi mật khẩu"
                          :visible.sync="changePasswordVisible"
                          width="30%">
                          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                            <el-form-item label="Mật khẩu mới" prop="pass">
                              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="Nhập lại" prop="checkPass">
                              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                              <el-button type="primary" @click="submitForm('ruleForm')">Xác nhận</el-button>
                              <el-button @click="resetForm('ruleForm')">Hủy</el-button>
                            </el-form-item>
                          </el-form>
                        </el-dialog> 
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="upload">
                      <span style="margin-left: 33px;">Ảnh đại diện</span>
                      <label for="file" @mouseover="deleteOptionUp" @mouseleave="deleteOptionDown">
                        <div v-if="!this.img" class="image" ref="imageDefault">
                          <el-image>
                            <div slot="error" class="image-slot">
                              <i class="el-icon-picture-outline"></i>
                            </div>
                          </el-image>
                        </div>
                        <img v-else ref="imagePreview" :src="img" alt="" class="image" id="image-preview">
                        <div class="delete-option" ref="deleteBackground">
                          <button class="delete-button"><i class="el-icon-circle-close delete-icon" @click="deleteImage"></i></button>
                        </div>
                      </label>
                      <input ref="productImage" type="file" accept="image/*" id="file" @change="onChangeImage">
                    </div>
                </el-col>
            </el-row>
             
         </div>
     </main>
 </div>
</template>

<script> 
import {mapState, mapMutations} from 'vuex'
import api from '../api'
export default {

  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
      return {
       imageUrl: '',
       dialogImageUrl: '',
        dialogVisible: false,
        name2:'',
        image:'',
        img:'',
        user:[],
        baseUrl:'http://vuecourse.zent.edu.vn/storage/users/',
        changePasswordVisible:false,
        changePass:'',
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
  },
   computed: {
      ...mapState('login', ['authUser']),
  },
  methods: {
     ...mapMutations('login', ['updateAuthUser']),
    onChangeImage(e) {
      if (e.target.files.length) {
        this.image = e.target.files[0]
        this.img = true
        this.img = URL.createObjectURL(e.target.files[0])
        this.$emit('onChangeImage', this.image)
        console.log(this.img)
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              password:this.ruleForm.pass,
              password_confirmation:this.ruleForm.checkPass
            }
            api.updatePassword(data).then(() => {
              this.$message({message:'Success',type:'success'});
            }).catch(() => {
                this.$message({message: 'Error', type: 'error'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // updatePassword(){
    //   let data = {
    //     password:this.changePass
        
    //   }
    //   api.updatePassword(data).then(() => {
    //     this.$message({message:'Success',type:'success'});
    //     this.changePass='';
    //     this.changePasswordVisible = false
    //   }).catch(() => {
    //       this.$message({message: 'Error', type: 'error'});
    //   })
    // },
    deleteOptionUp() {
      if (this.image) {
        this.$refs.deleteBackground.style.display = 'block'
      }
    },
    deleteOptionDown() {
      if (this.img) {
        this.$refs.deleteBackground.style.display = 'none'
      }
    },
    deleteImage() {
      if (this.image) {
        this.image = ''
        this.img = ''
        this.$refs.deleteBackground.style.display = 'none'
      }
    },
    updateUser() {
      const data = new FormData();
      data.append('name',this.name2)
      if(this.image) {
        data.append('avatar',this.image)
      }
      // let data = {
      //   name:this.name2,
      //   // avatar:this.image
      // }
      api.updateUser(data).then(() => {
        this.$message({message:'Success',type:'success'});
        this.name2='';
        api.getAuthUser().then((response)=>{
          this.user= response.data
          this.img = this.baseUrl + response.data.avatar
        })
      }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
      })
    }
  },
  
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.loginWrap {
  height: 100vh;
  overflow: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  .form{
    //   border: 1px solid black;
      height: 447px;
      background-color: white;
      width: 688px;
      padding: 24px;
      border-radius: 10px;
      .logoWrap{
          display: flex;
            align-items: center;
            // justify-content: center;
            margin-bottom: 24px;
            .logo{
                 width: 200px;
            }
      }
  }
}
.right {
    // border: 1px solid black;
}
.left {
    // border: 1px solid blue;
    text-align: center;
    margin-top: -22px;
}
.formInputWrap{
    margin-bottom: 24px;
    .sui-input {
      border: 1px solid blue;
         border-radius: 4px;
            height: 14px;
            width: 92%;
            font-size: 14px;
            line-height: 18px;
            color: #253036;
            padding: 12px;
            border: 1px solid #d8e0ea;
            outline: unset;
            margin-top: 10px;
         }           
          
}
.submitButton{
    width: 100%;
    height: 37px;
    color: #fff;
    font-size: 14px;
    line-height: 18px;
    background: #5aac44;;
    border-radius: 4px;
    text-transform: none;
    letter-spacing: 0.02857em;
    cursor: pointer;
    outline: none;
    border: 1px solid white;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.upload {
    padding-top: 10px;
    position: relative;
    #file {
      display: none;
    }
    .image {
      margin-top: 24px;
      width: 312px;
      height: 263px;
      border: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 34px;
    }
    .delete-option {
      width: 360px;
      height: 263px;
      background: rgba(16 16 16 / 30%);
      position: absolute;
      display: none;
      top: 51px;
      left: 1px;
      .delete-button {
        width: auto;
        font-size: 25px;
        float: right;
        cursor: pointer;
        color: #d8c9c9;
        background: none;
        border: none;
        outline: none;
      }
    }
  }
</style>
