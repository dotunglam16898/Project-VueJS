<template> 
 <div class="loginWrap">
     <main>
         <div class="form">
             <div class="logoWrap">
                 <!-- <img src="" class="logo"> -->
                 <h3>Đăng Nhập</h3>
             </div>
             <div class="formInputWrap">
                 <div class="input-wrap">                     
                    <input type="text" placeholder="Email" class="sui-input" @input="onChangeEmail($event.target.value)" >
                    <span class="textRed">{{emailErrorMsg}}</span>
                 </div>
             </div>
             <div class="formInputWrap">
                 <div class="inpur-wrap">
                     <input type="password" placeholder="Password" class="sui-input" @input="onChangePass($event.target.value)">
                     <span class="textRed">{{passErrorMsg}}</span>
                 </div>               
                <div class="forgot" @click="register()">
                    <span class="forgotPwd">Đăng ký</span>
                </div>               
             </div>
              <button class="submitButton" @click="submit()">          
                 <span>ĐĂNG NHẬP</span>             
             </button>
         </div>
     </main>
 </div>
</template>

<script> 

export default {
   
  data() {
      return {
       
      }
  },
  methods: {
     submit() {
         this.$router.push({path: '/admin/main'})
     },
     register() {
         this.$router.push({path: '/register'})
     }
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
      }
  }
  .textRed{
      color: red;
  }
}
</style>
