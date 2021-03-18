<template> 
 <div class="loginWrap">
     <main>
         <div class="form">
             <div class="logoWrap">
                 <!-- <img src="" class="logo"> -->
                 <h3>Đăng Ký</h3>
             </div>
             <div class="formInputWrap">
                 <div class="input-wrap">                     
                    <input type="text" placeholder="Nhập Tên" class="sui-input"  v-model="name">
                    <!-- <span class="textRed">{{emailErrorMsg}}</span> -->
                 </div>
             </div>
             <div class="formInputWrap">
                 <div class="input-wrap">                     
                    <input type="text" placeholder="Nhập email" class="sui-input"  v-model="email">
                    <!-- <span class="textRed">{{emailErrorMsg}}</span> -->
                 </div>
             </div>
             <div class="formInputWrap">
                 <div class="inpur-wrap">
                     <input type="password" placeholder="Nhập mật khẩu" class="sui-input"  v-model="password">
                     <!-- <span class="textRed">{{passErrorMsg}}</span> -->
                 </div>               
                <!-- <div class="forgot">
                    <span class="forgotPwd">Quên mật khẩu?</span>
                </div>                -->
             </div>
              <button class="submitButton" @click="submit()">    
                 <span>ĐĂNG KÝ</span>             
             </button>
             <div class="backLogin" style="margin-top:25px">
                <div class="previous">
                    <router-link to="/login" style="text-decoration:none">
                    <span style="color:#0080dd;"> <i class="el-icon-back"></i> Trở về trang đăng nhập</span>
                    </router-link>
                </div>
             </div>
         </div>
     </main>
 </div>
</template>

<script> 
import {mapState, mapMutations} from 'vuex'
import api from '../api'
export default {
computed: {
      ...mapState('login', ['isAuthenticated']),
    },
  data() {
      return {
       name:'',
       email:'',
       password:''
      }
  },
  methods: {
     ...mapMutations('login', ['updateLoginStatus']),
     submit () {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
        }
        api.register(data).then(() => {
          this.$message({message: 'Success', type: 'success'});
          this.name='';
          this.email='';
          this.password=''
        }).catch(() => {
          this.$message({message: 'Error', type: 'error'});
        })
      },
  }
  
  
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
      height: 380px;
      background-color: white;
      width: 385px;
      padding: 24px;
      border-radius: 10px;
      .logoWrap{
          display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            .logo{
                 width: 200px;
            }
      }
      .formInputWrap{
          margin-bottom: 24px;
         .sui-input {
             border: 1px solid blue;
             border-radius: 4px;
            height: 25px;
            width: 94%;
            font-size: 14px;
            line-height: 18px;
            color: #253036;
            padding: 12px;
            border: 1px solid #d8e0ea;
            outline: unset;
         }
         .forgot{
             margin-top: 8px;
             display: flex;
            align-items: center;
            justify-content: flex-end;
            .forgotPwd{
                color: #0080dd;
                font-size: 14px;
                line-height: 18px;
            }
         }
          
      }
      .submitButton{
        width: 100%;
        height: 50px;
        color: #fff;
        font-size: 14px;
        line-height: 18px;
        background: #0080dd;
        border-radius: 4px;
        text-transform: none;
        letter-spacing: 0.02857em;
        cursor: pointer;
      }
  }
  .textRed{
      color: red;
  }
}
</style>
