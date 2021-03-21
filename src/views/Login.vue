<template> 
 <div class="loginWrap">
     <main>
         <div class="form">
             <div class="logoWrap">
                 <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" class="logo">
                 <!-- <h3>Đăng Nhập</h3> -->
             </div>
             <div class="formInputWrap">
                 <div class="input-wrap">                     
                    <input type="text" placeholder="Email" class="sui-input"  v-model="email">
                    <!-- <span class="textRed">{{emailErrorMsg}}</span> -->
                 </div>
             </div>
             <div class="formInputWrap">
                 <div class="inpur-wrap">
                     <input type="password" placeholder="Password" class="sui-input" v-model="password">
                     <!-- <span class="textRed">{{passErrorMsg}}</span> -->
                 </div>               
                <div class="forgot" @click="register()">
                    <span class="forgotPwd">Đăng ký</span>
                    
                </div>
             </div>
              <button class="submitButton" @click="handleLogin()">          
                 <span>ĐĂNG NHẬP</span>             
             </button>
         </div>
     </main>
 </div>
</template>

<script> 
import {mapState, mapMutations} from 'vuex'
  import axios from 'axios'

export default {
   
  data() {
      return {
       email: '',
        password: '',
        changePasswordVisible:false
      }
  },
  computed: {
      ...mapState('auth', ['isAuthenticated']),
  },
  methods: {
      ...mapMutations('auth', ['changeLoginStatus']),
    //  submit() {
    //      this.$router.push({path: '/admin/main'})
    //  },
    //  register() {
    //      this.$router.push({path: '/register'})
    //  }
    // handleLogin () {
    //     let data = {
    //       email: this.email,
    //       password: this.password,
    //     }
    //     api.login(data).then((response) => {
    //       this.$message({message: 'Success', type: 'success'});
    //       localStorage.setItem('access_token', response.data.access_token)
    //       this.updateLoginStatus({isAuthenticated: true})
    //       if (this.$router.currentRoute.name !== 'Admin') {
    //         this.$router.push({ path: '/admin/main' })
    //       }
    //     }).catch(() => {
    //       this.$message({message: 'Error', type: 'error'});
    //     })
    //   }
    handleLogin () {
        axios({
          method: 'post',
          url: 'http://vuecourse.zent.edu.vn/api/auth/login',
          data: {
            email: this.email,
            password: this.password,
          },
        }).then((response) => {
          this.$message({
            message: 'Welcome back',
            type: 'success'
          });
          localStorage.setItem('access_token', response.data.access_token)
          this.changeLoginStatus({isAuthenticated: true})
          if (this.$router.currentRoute.name !== 'Main') {
            this.$router.push({ name: 'Admin' })
          }
        }).catch(() => {
          this.$message({
            message: 'Error',
            type: 'error'
          });
        })
    },
    register() {
      this.$router.push({ path: '/register' })
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
//   background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
    background-image: url("https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=en-US");
    background-repeat: no-repeat;
    background-size: cover;
    // background-position: center;
    // background-attachment: fixed;
    // background-position: center;
    //  background-position: 50%;
  .form{
    //   border: 1px solid black;
      height: 363px;
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
            cursor: pointer;
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
        border: 1px solid white;
      }
  }
  .textRed{
      color: red;
  }
}
</style>
